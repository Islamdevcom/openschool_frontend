import React, { useState, useRef, useEffect } from 'react';
import styles from './Chat.module.css';

function Chat() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'ai',
            text: 'Привет! Я твой учебный помощник. Могу помочь с домашним заданием, объяснить сложные темы или составить план подготовки к экзаменам. Чем могу помочь?'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const quickPrompts = [
        'Теорема Пифагора',
        'Домашнее задание',
        'Подготовка к КР',
        'Проверить эссе'
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = () => {
        if (inputValue.trim()) {
            const userMessage = {
                id: Date.now(),
                type: 'user',
                text: inputValue
            };

            setMessages(prev => [...prev, userMessage]);
            setInputValue('');
            setIsTyping(true);

            // Симуляция ответа ИИ
            setTimeout(() => {
                const aiMessage = {
                    id: Date.now() + 1,
                    type: 'ai',
                    text: `Я обрабатываю ваш запрос: "${inputValue}". Это демо-версия, но в реальной системе я бы предоставил подробный ответ и помощь по этой теме.`
                };
                setMessages(prev => [...prev, aiMessage]);
                setIsTyping(false);
            }, 1000);
        }
    };

    const handleQuickPrompt = (prompt) => {
        setInputValue(prompt);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
                <div className={styles.chatHeaderContent}>
                    <h2>🤖 Помощник ИИ</h2>
                    <p>Задавайте вопросы по учебе</p>
                </div>
                <div className={styles.chatStatus}>
                    <div className={styles.statusIndicator}></div>
                    <span>Онлайн</span>
                </div>
            </div>
            
            <div className={styles.chatMessages}>
                {messages.map((message) => (
                    <div key={message.id} className={`${styles.message} ${styles[message.type]}`}>
                        <div className={styles.messageBubble}>
                            {message.text}
                        </div>
                    </div>
                ))}
                
                {isTyping && (
                    <div className={`${styles.message} ${styles.ai}`}>
                        <div className={styles.messageBubble}>
                            <div className={styles.typingIndicator}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}
                
                <div ref={messagesEndRef} />
            </div>
            
            <div className={styles.chatInputContainer}>
                <div className={styles.chatInputWrapper}>
                    <input
                        type="text"
                        className={styles.chatInput}
                        placeholder="Введите ваш вопрос..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button 
                        className={styles.chatSendBtn}
                        onClick={sendMessage}
                        disabled={!inputValue.trim()}
                    >
                        <span>📤</span>
                    </button>
                </div>
                
                <div className={styles.quickPrompts}>
                    {quickPrompts.map((prompt, index) => (
                        <button
                            key={index}
                            className={styles.quickPrompt}
                            onClick={() => handleQuickPrompt(prompt)}
                        >
                            {prompt}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Chat;