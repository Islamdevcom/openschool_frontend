import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './TeacherProfileModal.module.css';

const TeacherProfileModal = ({ isOpen, onClose, teacherData, onSave }) => {
  const [formData, setFormData] = useState({
    name: teacherData?.name || 'Анна Петровна Смирнова',
    avatar: teacherData?.avatar || '👩‍🏫',
    email: teacherData?.email || 'i.testov@school1.edu',
    school: teacherData?.school || 'МАОУ "Гимназия №125"',
    subject: teacherData?.subject || 'Математика',
    experience: teacherData?.experience || '10 лет'
  });

  const avatarOptions = ['👨‍🏫', '👩‍🏫', '🧑‍🎓', '👨‍💼', '👩‍💼', '🤓', '😊', '🎯', '📚', '✨'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave && onSave(formData);
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Заголовок с аватаром */}
        <div className={styles.profileHeader}>
          <div className={styles.avatarLarge}>
            {formData.avatar}
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>{formData.name}</h2>
          <p className={styles.subtitle}>Учитель {formData.subject.toLowerCase()} • {formData.school}</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Имя */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <span className={styles.labelText}>👤 Имя</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={styles.input}
                  required
                />
              </label>
            </div>

            {/* Выбор аватара */}
            <div className={styles.inputGroup}>
              <span className={styles.labelText}>🎭 Аватар</span>
              <div className={styles.avatarSelector}>
                {avatarOptions.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className={`${styles.avatarBtn} ${formData.avatar === emoji ? styles.avatarSelected : ''}`}
                    onClick={() => handleChange('avatar', emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Мои дисциплины */}
            <div className={styles.disciplinesSection}>
              <span className={styles.labelText}>📖 Мои дисциплины</span>
              <div className={styles.disciplinesList}>
                <div className={styles.disciplineItem}>
                  <span className={styles.disciplineIcon}>📐</span>
                  <div className={styles.disciplineInfo}>
                    <span className={styles.disciplineName}>Математика</span>
                    <span className={styles.disciplineClasses}>7 класс, 8 класс, 9 класс</span>
                  </div>
                </div>
                <div className={styles.disciplineItem}>
                  <span className={styles.disciplineIcon}>⚗️</span>
                  <div className={styles.disciplineInfo}>
                    <span className={styles.disciplineName}>Физика</span>
                    <span className={styles.disciplineClasses}>10 класс, 11 класс</span>
                  </div>
                </div>
                <div className={styles.disciplineItem}>
                  <span className={styles.disciplineIcon}>🧬</span>
                  <div className={styles.disciplineInfo}>
                    <span className={styles.disciplineName}>Химия</span>
                    <span className={styles.disciplineClasses}>8 класс</span>
                  </div>
                </div>
              </div>
              <p className={styles.disciplinesNote}>
                💡 Дисциплины назначаются администратором школы
              </p>
            </div>

            {/* Email */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <span className={styles.labelText}>📧 Email</span>
                <input
                  type="email"
                  value={formData.email}
                  className={`${styles.input} ${styles.inputDisabled}`}
                  disabled
                />
                <span className={styles.helpText}>Email изменяется только администратором</span>
              </label>
            </div>

            {/* Школа */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <span className={styles.labelText}>🏫 Школа</span>
                <input
                  type="text"
                  value={formData.school}
                  onChange={(e) => handleChange('school', e.target.value)}
                  className={styles.input}
                  placeholder="Название школы"
                />
              </label>
            </div>

            {/* Предмет */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <span className={styles.labelText}>📚 Предмет</span>
                <select
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  className={styles.select}
                >
                  <option value="Математика">Математика</option>
                  <option value="Русский язык">Русский язык</option>
                  <option value="Физика">Физика</option>
                  <option value="Химия">Химия</option>
                  <option value="Биология">Биология</option>
                  <option value="История">История</option>
                  <option value="География">География</option>
                  <option value="Английский язык">Английский язык</option>
                  <option value="Информатика">Информатика</option>
                </select>
              </label>
            </div>

            {/* Опыт работы */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <span className={styles.labelText}>⭐ Опыт работы</span>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => handleChange('experience', e.target.value)}
                  className={styles.input}
                  placeholder="например: 5 лет"
                />
              </label>
            </div>

            {/* Кнопки */}
            <div className={styles.actions}>
              <button 
                type="button" 
                className={styles.btnSecondary} 
                onClick={onClose}
              >
                Отмена
              </button>
              <button 
                type="submit" 
                className={styles.btnPrimary}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="17,21 17,13 7,13 7,21" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="7,3 7,8 15,8" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Сохранить изменения
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TeacherProfileModal;