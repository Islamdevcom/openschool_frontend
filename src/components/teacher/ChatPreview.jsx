import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Plus, ChevronLeft, Trash2, Clock } from 'lucide-react';
import styles from './ChatPreview.module.css';
import { findSimilarQuestion, addToFAQCache, incrementHitCount } from '../../utils/faqCache';

// Генерация системного промпта на основе предмета учителя
const getSystemPrompt = (teacherSubject) => {
  return `Ты - строгий AI ассистент для учителя по предмету "${teacherSubject}" в системе OpenSchool.

ВАЖНО: Ты отвечаешь ТОЛЬКО на вопросы, связанные с:
- Планированием уроков по предмету "${teacherSubject}"
- Методикой преподавания этого предмета
- Проверкой и оценкой заданий
- Объяснением учебного материала
- Созданием учебных материалов и тестов
- Анализом успеваемости учеников

ЗАПРЕЩЕНО отвечать на вопросы о:
- Личной жизни, семье, отношениях
- Бытовых проблемах
- Политике, религии
- Любых темах, не связанных с образованием

Если вопрос не относится к учебе, вежливо откажись и напомни:
"Я могу помочь только с вопросами по предмету ${teacherSubject} и методике преподавания. Пожалуйста, задайте учебный вопрос."

Твой стиль: профессиональный, конкретный, строго по теме образования.`;
};

const ChatPreview = ({
  teacherSubject,
  disciplineId,
  chatSessions = {},
  onUpdateSessions,
  faqCache = [],
  onUpdateFAQCache
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [sessions, setSessions] = useState(chatSessions);
  
  const [inputText, setInputText] = useState('');
  const [modalInputText, setModalInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const messagesEndRef = useRef(null);
  const modalInputRef = useRef(null);

  // Живые placeholder'ы
  const placeholders = [
    "Спросите у OpenSchool AI, чем могу помочь",
    "Покажите аналитику успеваемости студентов...",
    "Какой прогресс у обучающихся по математике?",
    "Помогите составить план урока по производным...",
    "Проанализируйте результаты последнего теста...",
    "Создайте отчет по посещаемости класса..."
  ];

  // Смена placeholder'а каждые 3 секунды
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % placeholders.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [placeholders.length]);

  // Получаем текущие сообщения
  const currentMessages = currentSessionId && sessions[currentSessionId] 
    ? sessions[currentSessionId].messages 
    : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  // Синхронизация сессий при смене дисциплины
  useEffect(() => {
    setSessions(chatSessions);
    setCurrentSessionId(null);
    setShowHistory(false);
    console.log(`📚 Загружены сессии для дисциплины: ${disciplineId}`, chatSessions);
  }, [disciplineId, chatSessions]);

  // Сохраняем сессии через callback родителя
  useEffect(() => {
    if (onUpdateSessions && Object.keys(sessions).length > 0) {
      onUpdateSessions(sessions);
    }
  }, [sessions, onUpdateSessions]);

  // Фокус на input при открытии модалки
  useEffect(() => {
    if (isModalOpen && modalInputRef.current && !showHistory) {
      setTimeout(() => {
        modalInputRef.current.focus();
        setModalInputText(inputText);
      }, 100);
    }
  }, [isModalOpen, showHistory, inputText]);

  const createNewSession = (initialMessage = '') => {
    const sessionId = Date.now().toString();
    const messages = [{
      id: 1,
      text: "Привет! Чем могу помочь?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString()
    }];

    if (initialMessage.trim()) {
      messages.push({
        id: 2,
        text: initialMessage,
        isBot: false,
        timestamp: new Date().toLocaleTimeString()
      });
    }

    const newSession = {
      id: sessionId,
      title: `Беседа ${Object.keys(sessions).length + 1}`,
      createdAt: new Date().toLocaleString(),
      messages: messages
    };
    
    setSessions(prev => ({
      ...prev,
      [sessionId]: newSession
    }));
    
    setCurrentSessionId(sessionId);
    setShowHistory(false);

    if (initialMessage.trim()) {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          const responses = [
            "Отличный вопрос! Давайте разберем это пошагово.",
            "Я помогу вам разобраться с этой темой по математике.",
            "Это интересная задача. Вот мое объяснение:",
            "Хороший пример для изучения! Начнем с основ.",
            "Понимаю вашу задачу. Рассмотрим решение детально."
          ];
          
          const botResponse = {
            id: Date.now() + 1,
            text: responses[Math.floor(Math.random() * responses.length)],
            isBot: true,
            timestamp: new Date().toLocaleTimeString()
          };

          setSessions(prev => ({
            ...prev,
            [sessionId]: {
              ...prev[sessionId],
              messages: [...prev[sessionId].messages, botResponse]
            }
          }));
          
          setIsTyping(false);
        }, 1500);
      }, 500);
    }

    return sessionId;
  };

  const openModal = () => {
    setIsModalOpen(true);
    
    if (inputText.trim()) {
      // Если есть текст, создаем новую сессию с этим текстом
      createNewSession(inputText);
      setInputText('');
      setModalInputText('');
    } else {
      // Всегда создаем новую сессию при первом клике
      createNewSession();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowHistory(false);
    setInputText('');
    setModalInputText('');
  };

  const selectSession = (sessionId) => {
    setCurrentSessionId(sessionId);
    setShowHistory(false);
  };

  const deleteSession = (sessionId, e) => {
    e.stopPropagation();
    if (window.confirm('Удалить эту беседу?')) {
      setSessions(prev => {
        const newSessions = { ...prev };
        delete newSessions[sessionId];
        return newSessions;
      });
      
      if (currentSessionId === sessionId) {
        setCurrentSessionId(null);
        setShowHistory(true);
      }
    }
  };

  const handleMainInputChange = (e) => {
    setInputText(e.target.value);
    if (e.target.value.trim() && !isModalOpen) {
      openModal();
    }
  };

  const handleMainInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      openModal();
    }
  };

  const handleSendMessage = async () => {
    if (!modalInputText.trim() || !currentSessionId) return;

    const userMessage = modalInputText;
    const newMessage = {
      id: Date.now(),
      text: userMessage,
      isBot: false,
      timestamp: new Date().toLocaleTimeString()
    };

    setSessions(prev => ({
      ...prev,
      [currentSessionId]: {
        ...prev[currentSessionId],
        messages: [...prev[currentSessionId].messages, newMessage]
      }
    }));

    setModalInputText('');
    setIsTyping(true);

    try {
      // ✅ Шаг 1: Проверяем FAQ кэш на наличие похожих вопросов
      const cachedAnswer = findSimilarQuestion(userMessage, faqCache, 0.6);

      let botResponseText;
      let isCachedResponse = false;

      if (cachedAnswer) {
        // ✅ CACHE HIT - используем кэшированный ответ
        console.log('💾 FAQ Cache HIT! Используем кэшированный ответ');
        botResponseText = cachedAnswer.answer;
        isCachedResponse = true;

        // Обновляем счетчик использования
        const updatedCache = incrementHitCount(faqCache, cachedAnswer.question);
        if (onUpdateFAQCache) {
          onUpdateFAQCache(updatedCache);
        }

        // Имитируем небольшую задержку для UX (чтобы не выглядело слишком быстро)
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        // ❌ CACHE MISS - вызываем API/мок и сохраняем в кэш
        console.log('🔍 FAQ Cache MISS - запрашиваем ответ у AI');

        // TODO: Заменить на реальный API endpoint
        // const response = await fetch('/api/teacher/chat', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     systemPrompt: getSystemPrompt(teacherSubject),
        //     message: userMessage,
        //     disciplineId: disciplineId,
        //     sessionId: currentSessionId
        //   })
        // });
        // const data = await response.json();
        // botResponseText = data.answer;

        // Временно используем мок-ответы
        await new Promise(resolve => setTimeout(resolve, 1500));

        const mockResponses = [
          `Отличный вопрос по предмету "${teacherSubject}"! Давайте разберем это пошагово.`,
          `Я помогу вам разобраться с этой темой из курса "${teacherSubject}".`,
          "Это интересная задача. Вот мое объяснение:",
          "Хороший пример для изучения! Начнем с основ.",
          "Понимаю вашу задачу. Рассмотрим решение детально."
        ];

        botResponseText = mockResponses[Math.floor(Math.random() * mockResponses.length)];

        // Сохраняем в FAQ кэш
        const updatedCache = addToFAQCache(userMessage, botResponseText, faqCache, 100);
        if (onUpdateFAQCache) {
          onUpdateFAQCache(updatedCache);
        }
        console.log('💾 Ответ сохранен в FAQ кэш');
      }

      const botResponse = {
        id: Date.now() + 1,
        text: botResponseText,
        isBot: true,
        timestamp: new Date().toLocaleTimeString(),
        isCached: isCachedResponse
      };

      setSessions(prev => ({
        ...prev,
        [currentSessionId]: {
          ...prev[currentSessionId],
          messages: [...prev[currentSessionId].messages, botResponse]
        }
      }));

    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Извините, произошла ошибка. Попробуйте еще раз.",
        isBot: true,
        timestamp: new Date().toLocaleTimeString()
      };

      setSessions(prev => ({
        ...prev,
        [currentSessionId]: {
          ...prev[currentSessionId],
          messages: [...prev[currentSessionId].messages, errorMessage]
        }
      }));
    } finally {
      setIsTyping(false);
    }
  };

  const handleModalKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const sessionsList = Object.values(sessions).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      {/* Основной интерфейс */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '120px',
        padding: '30px',
        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
      }}>
        <div style={{
          width: 'calc(100% - 60px)',
          background: '#f4f4f4',
          border: '1px solid #e0e0e0',
          borderRadius: '12px',
          padding: '4px'
        }}>
          <input
            type="text"
            value={inputText}
            onChange={handleMainInputChange}
            onKeyPress={handleMainInputKeyPress}
            placeholder={placeholders[placeholderIndex]}
            style={{
              width: '100%',
              padding: '14px 18px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '10px',
              outline: 'none',
              background: '#f4f4f4',
              color: '#333',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div 
          className={styles.modalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className={styles.modalContainer}>
            {/* Боковая панель истории */}
            {showHistory && (
              <div className={styles.sidebar}>
                {/* Заголовок истории */}
                <div className={styles.sidebarHeader}>
                  <div className={styles.sidebarHeaderTop}>
                    <h3 className={styles.sidebarTitle}>
                      🕐 История бесед
                    </h3>
                    <button
                      onClick={() => createNewSession()}
                      className={styles.newSessionButton}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className={styles.sidebarSubtitle}>
                    {sessionsList.length} бесед сохранено
                  </p>
                </div>

                {/* Список сессий */}
                <div className={styles.sessionsList}>
                  {sessionsList.map((session) => (
                    <div
                      key={session.id}
                      onClick={() => selectSession(session.id)}
                      className={styles.sessionItem}
                    >
                      <div className={styles.sessionContent}>
                        <div className={styles.sessionInfo}>
                          <h4 className={styles.sessionTitle}>
                            {session.title}
                          </h4>
                          <p className={styles.sessionMeta}>
                            {session.messages.length} сообщений
                          </p>
                          <p className={styles.sessionDate}>
                            {session.createdAt}
                          </p>
                        </div>
                        <button
                          onClick={(e) => deleteSession(session.id, e)}
                          className={styles.deleteButton}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {sessionsList.length === 0 && (
                    <div className={styles.emptyState}>
                      <Clock size={32} className={styles.emptyStateIcon} />
                      <p className={styles.emptyStateText}>
                        Нет сохраненных бесед
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Основная область чата */}
            <div className={styles.chatArea}>
              {/* Header */}
              <div className={`${styles.chatHeader} ${showHistory ? styles.withSidebar : styles.withoutSidebar}`}>
                <div className={styles.headerLeft}>
                  {!showHistory && Object.keys(sessions).length > 0 && (
                    <button
                      onClick={() => setShowHistory(true)}
                      className={styles.backButton}
                    >
                      <ChevronLeft size={18} />
                    </button>
                  )}
                  <div className={styles.avatar}>
                    🤖
                  </div>
                  <div className={styles.headerInfo}>
                    <h2>
                      {showHistory ? 'История бесед' : 'OpenSchool AI'}
                    </h2>
                    {!showHistory && currentSessionId && (
                      <p>
                        {currentMessages.length} сообщений
                      </p>
                    )}
                  </div>
                </div>
                <div className={styles.headerRight}>
                  {!showHistory && (
                    <button
                      onClick={() => createNewSession()}
                      className={styles.headerButton}
                    >
                      ➕ Новая беседа
                    </button>
                  )}
                  <button
                    onClick={closeModal}
                    className={styles.closeButton}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Контент */}
              {showHistory ? (
                <div className={styles.selectSession}>
                  Выберите беседу из списка слева
                </div>
              ) : currentSessionId ? (
                <>
                  {/* Messages Area */}
                  <div className={styles.messagesArea}>
                    {currentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`${styles.message} ${message.isBot ? '' : styles.user}`}
                      >
                        {/* Avatar */}
                        <div className={styles.messageAvatar}>
                          {message.isBot ? '🤖' : '👤'}
                        </div>
                        
                        {/* Message Bubble */}
                        <div className={`${styles.messageBubble} ${message.isBot ? styles.bot : styles.user}`}>
                          <div className={styles.messageText}>
                            {message.text}
                          </div>
                          <div className={styles.messageTime}>
                            {message.timestamp}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className={styles.typingIndicator}>
                        <div className={styles.messageAvatar}>
                          🤖
                        </div>
                        <div className={styles.typingBubble}>
                          <div className={styles.typingDots}>
                            <span className={styles.typingDot}></span>
                            <span className={styles.typingDot}></span>
                            <span className={styles.typingDot}></span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className={styles.inputArea}>
                    <div className={styles.inputGroup}>
                      <input
                        ref={modalInputRef}
                        type="text"
                        value={modalInputText}
                        onChange={(e) => setModalInputText(e.target.value)}
                        onKeyPress={handleModalKeyPress}
                        placeholder="Напишите ваш вопрос..."
                        className={styles.modalInput}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!modalInputText.trim()}
                        className={`${styles.sendButton} ${modalInputText.trim() ? styles.active : styles.disabled}`}
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className={styles.emptyChat}>
                  <button
                    onClick={() => createNewSession()}
                    className={styles.startButton}
                  >
                    <Plus size={20} />
                    Начать новую беседу
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatPreview;