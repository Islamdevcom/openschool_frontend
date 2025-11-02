import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './StudentModal.module.css';

function StudentModal({ isOpen, onClose, teacherSubject = 'Математика' }) {
    const [prompts, setPrompts] = useState({
        lessonPlanning: '',
        taskGeneration: '',
        grading: '',
        feedback: '',
        explanation: ''
    });

    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handlePromptChange = (field, value) => {
        setPrompts(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        console.log('Сохранение промптов:', prompts);
        // TODO: отправить на сервер
        alert('Промпты успешно сохранены!');
        onClose();
    };

    if (!isOpen) return null;

    return createPortal(
        <div className={styles.overlay} onClick={handleModalClick}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>🤖 Управление AI промптами</h2>
                    <button className={styles.closeModal} onClick={onClose}>&times;</button>
                </div>

                <div className={styles.subjectBadge}>
                    <span className={styles.subjectIcon}>📚</span>
                    <span className={styles.subjectText}>Предмет: {teacherSubject}</span>
                </div>

                <div className={styles.promptsContainer}>
                    {/* Промпт для планирования уроков */}
                    <div className={styles.promptGroup}>
                        <label className={styles.promptLabel}>
                            <span className={styles.labelIcon}>📝</span>
                            <span className={styles.labelText}>Планирование уроков</span>
                        </label>
                        <textarea
                            className={styles.promptTextarea}
                            placeholder={`Напишите промпт для генерации планов уроков по предмету "${teacherSubject}". Например: "Создай детальный план урока по теме...""`}
                            value={prompts.lessonPlanning}
                            onChange={(e) => handlePromptChange('lessonPlanning', e.target.value)}
                            rows={4}
                        />
                        <span className={styles.helpText}>
                            AI будет использовать этот промпт для создания планов уроков
                        </span>
                    </div>

                    {/* Промпт для генерации заданий */}
                    <div className={styles.promptGroup}>
                        <label className={styles.promptLabel}>
                            <span className={styles.labelIcon}>✏️</span>
                            <span className={styles.labelText}>Генерация заданий</span>
                        </label>
                        <textarea
                            className={styles.promptTextarea}
                            placeholder={`Промпт для создания заданий по "${teacherSubject}". Например: "Создай 10 задач по теме...""`}
                            value={prompts.taskGeneration}
                            onChange={(e) => handlePromptChange('taskGeneration', e.target.value)}
                            rows={4}
                        />
                        <span className={styles.helpText}>
                            Используется для генерации домашних заданий и тестов
                        </span>
                    </div>

                    {/* Промпт для проверки работ */}
                    <div className={styles.promptGroup}>
                        <label className={styles.promptLabel}>
                            <span className={styles.labelIcon}>✅</span>
                            <span className={styles.labelText}>Проверка работ</span>
                        </label>
                        <textarea
                            className={styles.promptTextarea}
                            placeholder={`Промпт для проверки работ учеников по "${teacherSubject}". Например: "Проверь решение задачи и укажи ошибки...""`}
                            value={prompts.grading}
                            onChange={(e) => handlePromptChange('grading', e.target.value)}
                            rows={4}
                        />
                        <span className={styles.helpText}>
                            AI будет проверять работы учеников по этому шаблону
                        </span>
                    </div>

                    {/* Промпт для обратной связи */}
                    <div className={styles.promptGroup}>
                        <label className={styles.promptLabel}>
                            <span className={styles.labelIcon}>💬</span>
                            <span className={styles.labelText}>Обратная связь ученикам</span>
                        </label>
                        <textarea
                            className={styles.promptTextarea}
                            placeholder={`Промпт для формирования обратной связи ученикам по "${teacherSubject}"...`}
                            value={prompts.feedback}
                            onChange={(e) => handlePromptChange('feedback', e.target.value)}
                            rows={4}
                        />
                        <span className={styles.helpText}>
                            Шаблон для персонализированных комментариев к работам
                        </span>
                    </div>

                    {/* Промпт для объяснения материала */}
                    <div className={styles.promptGroup}>
                        <label className={styles.promptLabel}>
                            <span className={styles.labelIcon}>💡</span>
                            <span className={styles.labelText}>Объяснение материала</span>
                        </label>
                        <textarea
                            className={styles.promptTextarea}
                            placeholder={`Промпт для объяснения сложных тем по "${teacherSubject}"...`}
                            value={prompts.explanation}
                            onChange={(e) => handlePromptChange('explanation', e.target.value)}
                            rows={4}
                        />
                        <span className={styles.helpText}>
                            AI будет объяснять темы ученикам согласно этому промпту
                        </span>
                    </div>
                </div>

                <div className={styles.modalFooter}>
                    <button className={styles.btnCancel} onClick={onClose}>
                        Отмена
                    </button>
                    <button className={styles.btnSave} onClick={handleSave}>
                        💾 Сохранить промпты
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default StudentModal;
