import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import styles from './LoginPage.module.css';
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'student',
        schoolCode: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showSchoolCode, setShowSchoolCode] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Создаем объект только с email и password для API
        const payload = {
            email: formData.email,
            password: formData.password
        };

        // DEBUG LOG: что отправляем в контекст
        console.log("LOGIN PAYLOAD:", payload);

        try {
            // Весь fetch происходит в login из AuthContext!
            const { role, school_id } = await login(payload);

            // Логика редиректа с учетом школьного входа
            if (showSchoolCode && formData.schoolCode && role === "student") {
                // Ученик с кодом школы -> школьная страница
                navigate("/school", { state: { schoolCode: formData.schoolCode } });
            } else {
                // Обычный вход
                if (role === "teacher") navigate("/teacher");
                else if (role === "student") navigate("/student");
            }
        } catch (err) {
            alert(err.message || t('login.loginError'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.headerSection}>
                <div className={styles.logo}>
                    <h1>🎓 OpenSchool AI</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.loginForm} autoComplete="off">
                <div className={styles.formGroup}>
                    <label>{t('login.roleLabel')}</label>
                    <div className={styles.roleSelector}>
                        <label className={`${styles.roleOption} ${formData.role === 'student' ? styles.active : ''}`}>
                            <input
                                type="radio"
                                name="role"
                                value="student"
                                checked={formData.role === 'student'}
                                onChange={handleInputChange}
                            />
                            <span className={styles.roleIcon}>👨‍🎓</span>
                            <span>{t('login.student')}</span>
                        </label>
                        <label className={`${styles.roleOption} ${formData.role === 'teacher' ? styles.active : ''}`}>
                            <input
                                type="radio"
                                name="role"
                                value="teacher"
                                checked={formData.role === 'teacher'}
                                onChange={handleInputChange}
                            />
                            <span className={styles.roleIcon}>👨‍🏫</span>
                            <span>{t('login.teacher')}</span>
                        </label>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>{t('login.emailLabel')}</label>
                    <div className={styles.inputWrapper}>
                        <input
                            type="text"
                            name="email"
                            className={styles.formInput}
                            placeholder={t('login.emailPlaceholder')}
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>{t('login.passwordLabel')}</label>
                    <div className={styles.inputWrapper}>
                        <input
                            type="password"
                            name="password"
                            className={styles.formInput}
                            placeholder={t('login.passwordPlaceholder')}
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className={styles.toggleSection}>
                    <div className={styles.toggleWrapper}>
                        <span className={styles.toggleLabel}>{t('login.schoolLogin')}</span>
                        <label className={styles.toggleSwitch}>
                            <input
                                type="checkbox"
                                name="showSchoolCode"
                                checked={showSchoolCode}
                                onChange={(e) => setShowSchoolCode(e.target.checked)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>

                    {showSchoolCode && (
                        <div className={styles.schoolCodeInput}>
                            <span className={styles.schoolIcon}>📌</span>
                            <input
                                type="text"
                                name="schoolCode"
                                placeholder={t('login.schoolCodePlaceholder')}
                                className={styles.codeInput}
                                value={formData.schoolCode}
                                onChange={handleInputChange}
                            />
                        </div>
                    )}
                </div>

                <button type="submit" className={`${styles.loginBtn} ${isLoading ? styles.loading : ''}`} disabled={isLoading}>
                    <span className={styles.btnIcon}>{isLoading ? '⏳' : '✅'}</span>
                    <span className={styles.btnText}>{isLoading ? t('login.loggingIn') : t('login.loginButton')}</span>
                </button>

                <div className={styles.selfRegister}>
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate("/self-register"); }}>
                        📝 {t('login.selfRegister')}
                    </a>
                </div>

                <div className={styles.additionalOptions}>
                    <button type="button" className={styles.gmailBtn} onClick={() => alert(t('login.gmailComing'))}>
                        <span>🔗</span> {t('login.loginGmail')}
                    </button>
                    <button type="button" className={styles.forgotBtn} onClick={() => alert(t('login.forgotComing'))}>
                        ❓ {t('login.forgotPassword')}
                    </button>
                </div>

                <div className={styles.formLinks}>
                    <button type="button" className={styles.registerBtn} onClick={() => navigate("/enter-code")}>
                        🏫 {t('login.registerSchoolCode')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;