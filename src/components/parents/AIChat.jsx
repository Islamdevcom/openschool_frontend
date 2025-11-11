import React, { useState, useRef, useEffect } from 'react';
import styles from './AIChat.module.css';
import QuickQuestions from '../QuickQuestions/QuickQuestions';

const AIChat = ({ childName }) => {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      text: `👋 Здравствуйте! Я ИИ-ассистент OpenSchool. Готов ответить на любые вопросы о вашем ребенке - ${childName}.`,
      time: 'Сейчас'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const aiResponses = {
    'как дела': `У ${childName} дела идут хорошо! 📚
    
📈 **Успеваемость**: Средний балл 4.3 - это отличный результат!
📅 **Посещаемость**: 95% - ребенок регулярно посещает занятия
⚠️ **Замечания**: 2 незначительных замечания за месяц
⭐ **Поведение**: 8.5/10 - хорошее поведение

Рекомендую обратить внимание на математику - там можно подтянуть успеваемость.`,
    
    'оценки': `📊 **Последние оценки** ${childName}:

🟢 **Русский язык**: 5 (сочинение "Моя семья")
🟡 **Математика**: 4 (контрольная работа)
🟢 **История**: 5 (доклад о Петре I)  
🔴 **Физика**: 3 (лабораторная работа)
🟢 **Английский**: 4 (устный ответ)

**Средний балл за неделю**: 4.2
Учителя отмечают активность на уроках истории и русского языка! 👏`,
    
    'замечания': `⚠️ **Замечания для** ${childName}:

📅 **30.08.2025** - Опоздание на урок математики (Петрова А.И.)
📅 **28.08.2025** - Разговоры на уроке физики (Козлов В.С.)

✅ **Похвалы**:
📅 **29.08.2025** - Отличный доклад по истории (Федорова Н.А.)
📅 **27.08.2025** - Помощь однокласснику (Сидорова М.П.)

В целом поведение хорошее, замечания незначительные! 😊`,
    
    'домашнее задание': `📝 **Домашние задания** на завтра:

📚 **Математика**: Задачи №45-50, учебник стр. 112
📝 **Русский язык**: Дописать сочинение "Моя семья" 
📖 **История**: Читать главу 5, подготовить пересказ
🔬 **Физика**: Оформить лабораторную работу №3
🇬🇧 **Английский**: Выучить новые слова (урок 8)

⏰ **Рекомендуемое время**: 2-3 часа
🎯 **Приоритет**: Математика и сочинение по русскому`,
    
    'собрание': `📅 **Ближайшие события**:

🏫 **Родительское собрание**: 15 сентября 2025, 18:00
📍 **Место**: Актовый зал школы
📋 **Повестка**: Итоги четверти, планы на учебный год

📧 **Индивидуальные консультации**:
- Математика: Петрова А.И. - по записи
- Классный руководитель: каждую пятницу 15:00-16:00

Напоминание придет за 2 дня! 🔔`,
    
    'помощь': `🎯 **Рекомендации по учебе** для ${childName}:

📊 **Нужна поддержка**:
🔴 **Физика** - сложности с формулами (рекомендую репетитора)
🟡 **Математика** - можно подтянуть до 5

✅ **Сильные стороны**:
🟢 **История** - отличные результаты!
🟢 **Русский язык** - хорошие творческие работы

💡 **Советы**:
- Заниматься физикой по 30 мин в день
- Больше практики по математике
- Поощрять интерес к истории`,

    'расписание': `📅 **Расписание на завтра** для ${childName}:

🕐 **08:00** - Математика (каб. 201, Петрова А.И.)
🕘 **08:55** - Русский язык (каб. 105, Сидорова М.П.)
🕘 **09:50** - Физика (каб. 301, Козлов В.С.)
🕚 **10:55** - История (каб. 208, Федорова Н.А.)
🕐 **11:50** - Английский язык (каб. 150, Smith J.)

📚 Не забудьте учебники по математике и физике! 🎒`
  };

  const generateAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('дела') || lowerMessage.includes('как') || lowerMessage.includes('общее')) {
      return aiResponses['как дела'];
    } else if (lowerMessage.includes('оценк') || lowerMessage.includes('балл') || lowerMessage.includes('успевае')) {
      return aiResponses['оценки'];
    } else if (lowerMessage.includes('замечан') || lowerMessage.includes('поведен') || lowerMessage.includes('учител')) {
      return aiResponses['замечания'];
    } else if (lowerMessage.includes('дом') || lowerMessage.includes('задан')) {
      return aiResponses['домашнее задание'];
    } else if (lowerMessage.includes('собран') || lowerMessage.includes('встреч') || lowerMessage.includes('родител')) {
      return aiResponses['собрание'];
    } else if (lowerMessage.includes('помощ') || lowerMessage.includes('репетит') || lowerMessage.includes('сложн')) {
      return aiResponses['помощь'];
    } else if (lowerMessage.includes('расписан') || lowerMessage.includes('завтра')) {
      return aiResponses['расписание'];
    } else {
      return `Понял ваш вопрос про "${message}". 🤖

К сожалению, у меня нет точной информации по этому вопросу для ${childName}. 

💡 Попробуйте спросить:
• "Как дела у моего ребенка?"
• "Какие оценки получил?"
• "Есть ли замечания?"
• "Что задали на дом?"

Или свяжитесь с классным руководителем по телефону: +7 (777) 123-45-67 📞`;
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage = {
      type: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        text: generateAIResponse(inputValue),
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question) => {
    setInputValue(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className={styles.aiChat}>
      <div className={styles.chatHeader}>
        <h2>
          💬 ИИ-Ассистент родителя
        </h2>
      </div>

      <div className={styles.chatMessages}>
        {messages.map((message, index) => (
          <div key={index} className={`${styles.message} ${styles[message.type]}`}>
            <div className={styles.messageAvatar}>
              {message.type === 'ai' ? 'AI' : 'Вы'}
            </div>
            <div className={styles.messageContent}>
              <div style={{ whiteSpace: 'pre-line' }}>{message.text}</div>
              <div className={styles.messageTime}>{message.time}</div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className={`${styles.message} ${styles.ai}`}>
            <div className={styles.messageAvatar}>AI</div>
            <div className={styles.messageContent}>
              <div className={styles.typingDots}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.chatInput}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Задайте вопрос о вашем ребенке..."
          />
          <button className={styles.sendBtn} onClick={handleSendMessage}>
            ➤
          </button>
        </div>
      </div>

      <QuickQuestions onQuestionClick={handleQuickQuestion} />
    </div>
  );
};

export default AIChat;