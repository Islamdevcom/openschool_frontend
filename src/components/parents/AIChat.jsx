import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AIChat.module.css';
import QuickQuestions from './QuickQuestions';

const AIChat = ({ childName }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      text: `👋 ${t('parent.aiChat.greeting', { childName })}`,
      time: t('parent.aiChat.timeNow')
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
    'как дела': `${t('parent.aiChat.responses.status.title', { childName })} 📚

📈 **${t('parent.aiChat.responses.status.performance')}**: ${t('parent.aiChat.responses.status.performanceText', { grade: '4.3' })}
📅 **${t('parent.aiChat.responses.status.attendance')}**: ${t('parent.aiChat.responses.status.attendanceText', { percent: '95' })}
⚠️ **${t('parent.aiChat.responses.status.warnings')}**: ${t('parent.aiChat.responses.status.warningsText', { count: '2' })}
⭐ **${t('parent.aiChat.responses.status.behavior')}**: ${t('parent.aiChat.responses.status.behaviorText', { score: '8.5' })}

${t('parent.aiChat.responses.status.recommendation')}`,

    'оценки': `📊 **${t('parent.aiChat.responses.grades.title')}** ${childName}:

🟢 **Русский язык**: 5 (сочинение "Моя семья")
🟡 **Математика**: 4 (контрольная работа)
🟢 **История**: 5 (доклад о Петре I)
🔴 **Физика**: 3 (лабораторная работа)
🟢 **Английский**: 4 (устный ответ)

**${t('parent.aiChat.responses.grades.weeklyAverage')}**: 4.2
${t('parent.aiChat.responses.grades.activity')} 👏`,

    'замечания': `⚠️ **${t('parent.aiChat.responses.remarks.title')}** ${childName}:

📅 **30.08.2025** - ${t('parent.aiChat.responses.remarks.late')} (Петрова А.И.)
📅 **28.08.2025** - ${t('parent.aiChat.responses.remarks.talking')} (Козлов В.С.)

✅ **${t('parent.aiChat.responses.remarks.praise')}**:
📅 **29.08.2025** - ${t('parent.aiChat.responses.remarks.excellentReport')} (Федорова Н.А.)
📅 **27.08.2025** - ${t('parent.aiChat.responses.remarks.helpedClassmate')} (Сидорова М.П.)

${t('parent.aiChat.responses.remarks.summary')} 😊`,

    'домашнее задание': `📝 **${t('parent.aiChat.responses.homework.title')}** ${t('parent.aiChat.responses.homework.tomorrow')}:

📚 **Математика**: ${t('parent.aiChat.responses.homework.math')}
📝 **Русский язык**: ${t('parent.aiChat.responses.homework.russian')}
📖 **История**: ${t('parent.aiChat.responses.homework.history')}
🔬 **Физика**: ${t('parent.aiChat.responses.homework.physics')}
🇬🇧 **Английский**: ${t('parent.aiChat.responses.homework.english')}

⏰ **${t('parent.aiChat.responses.homework.timeEstimate')}**: ${t('parent.aiChat.responses.homework.timeValue')}
🎯 **${t('parent.aiChat.responses.homework.priority')}**: ${t('parent.aiChat.responses.homework.priorityValue')}`,

    'собрание': `📅 **${t('parent.aiChat.responses.meeting.title')}**:

🏫 **${t('parent.aiChat.responses.meeting.parentMeeting')}**: 15 сентября 2025, 18:00
📍 **${t('parent.aiChat.responses.meeting.place')}**: ${t('parent.aiChat.responses.meeting.placeValue')}
📋 **${t('parent.aiChat.responses.meeting.agenda')}**: ${t('parent.aiChat.responses.meeting.agendaValue')}

📧 **${t('parent.aiChat.responses.meeting.consultations')}**:
- ${t('parent.aiChat.responses.meeting.mathTeacher')}
- ${t('parent.aiChat.responses.meeting.classTeacher')}

${t('parent.aiChat.responses.meeting.reminder')} 🔔`,

    'помощь': `🎯 **${t('parent.aiChat.responses.help.title')}** для ${childName}:

📊 **${t('parent.aiChat.responses.help.needSupport')}**:
🔴 ${t('parent.aiChat.responses.help.physicsDifficulty')}
🟡 ${t('parent.aiChat.responses.help.mathImprovement')}

✅ **${t('parent.aiChat.responses.help.strengths')}**:
🟢 ${t('parent.aiChat.responses.help.historyExcellent')}
🟢 ${t('parent.aiChat.responses.help.russianGood')}

💡 **${t('parent.aiChat.responses.help.tips')}**:
- ${t('parent.aiChat.responses.help.physicsDaily')}
- ${t('parent.aiChat.responses.help.mathPractice')}
- ${t('parent.aiChat.responses.help.encourageHistory')}`,

    'расписание': `📅 **${t('parent.aiChat.responses.schedule.title')}** для ${childName}:

🕐 **08:00** - Математика (каб. 201, Петрова А.И.)
🕘 **08:55** - Русский язык (каб. 105, Сидорова М.П.)
🕘 **09:50** - Физика (каб. 301, Козлов В.С.)
🕚 **10:55** - История (каб. 208, Федорова Н.А.)
🕐 **11:50** - Английский язык (каб. 150, Smith J.)

📚 ${t('parent.aiChat.responses.schedule.reminder')} 🎒`
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
      return `${t('parent.aiChat.responses.unknown.understood', { message })} 🤖

${t('parent.aiChat.responses.unknown.noInfo', { childName })}

💡 ${t('parent.aiChat.responses.unknown.tryAsk')}
• ${t('parent.aiChat.responses.unknown.question1')}
• ${t('parent.aiChat.responses.unknown.question2')}
• ${t('parent.aiChat.responses.unknown.question3')}
• ${t('parent.aiChat.responses.unknown.question4')}

${t('parent.aiChat.responses.unknown.contact', { phone: '+7 (777) 123-45-67' })} 📞`;
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
    <div className={styles.aiChat} data-ai-chat>
      <div className={styles.chatHeader}>
        <h2>
          💬 {t('parent.aiChat.title')}
        </h2>
      </div>

      <div className={styles.chatMessages}>
        {messages.map((message, index) => (
          <div key={index} className={`${styles.message} ${styles[message.type]}`}>
            <div className={styles.messageAvatar}>
              {message.type === 'ai' ? 'AI' : t('parent.aiChat.you')}
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
            placeholder={t('parent.aiChat.placeholder')}
          />
          <button className={styles.sendBtn} onClick={handleSendMessage}>
            ➤
          </button>
        </div>
      </div>

      <div data-quick-questions>
        <QuickQuestions onQuestionClick={handleQuickQuestion} />
      </div>
    </div>
  );
};

export default AIChat;