import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TeacherChatModal.module.css';

const TeacherChatModal = ({ isOpen, onClose, teacher }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    {
      type: 'teacher',
      text: t('parent.teacherChatModal.sampleMessages.teacher1'),
      time: `${t('parent.teacherChatModal.times.yesterday')}, 14:30`
    },
    {
      type: 'parent',
      text: t('parent.teacherChatModal.sampleMessages.parent1'),
      time: `${t('parent.teacherChatModal.times.yesterday')}, 15:20`
    },
    {
      type: 'teacher',
      text: t('parent.teacherChatModal.sampleMessages.teacher2'),
      time: `${t('parent.teacherChatModal.times.today')}, 10:15`
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessage = {
      type: 'parent',
      text: inputValue,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate teacher response
    setTimeout(() => {
      const teacherResponse = {
        type: 'teacher',
        text: t('parent.teacherChatModal.sampleMessages.teacherResponse'),
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, teacherResponse]);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen || !teacher) return null;

  return (
    <div className={styles.teacherChatModal} onClick={onClose}>
      <div className={styles.teacherChatContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.teacherChatHeader}>
          <div className={styles.teacherChatHeaderInfo}>
            <div className={styles.teacherAvatar}>{teacher.avatar}</div>
            <div className={styles.teacherChatHeaderText}>
              <h3>{teacher.name}</h3>
              <p>{teacher.subject}</p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.teacherChatMessages}>
          {messages.map((message, index) => (
            <div key={index} className={`${styles.message} ${styles[message.type]}`}>
              <div className={styles.messageAvatar}>
                {message.type === 'teacher' ? teacher.avatar : t('parent.teacherChatModal.you')}
              </div>
              <div className={styles.messageContent}>
                <div>{message.text}</div>
                <div className={styles.messageTime}>{message.time}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.teacherChatInput}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('parent.teacherChatModal.placeholder')}
            />
            <button className={styles.sendBtn} onClick={handleSendMessage}>
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherChatModal;