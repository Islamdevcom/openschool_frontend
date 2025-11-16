import React, { useState } from 'react';
import styles from './HeaderTeacher.module.css';
import LanguageSelector from './LanguageSelector';
import DisciplineSelector from './DisciplineSelector';
import ProfileIcon from './ProfileIcon';
import ProfileDropdown from './ProfileDropdown';
import AvatarSection from './AvatarSection';
import ChatPreview from './ChatPreview';
import EnergyCircle from '../common/EnergyCircle';
import ProUpgradeModal from '../common/ProUpgradeModal';
import { useAuth } from '../../context/AuthContext';

function Header({
    selectedLanguage,
    setSelectedLanguage,
    selectedDiscipline,
    setSelectedDiscipline,
    isProfileDropdownOpen,
    toggleProfileDropdown,
    closeProfileDropdown,
    openProfileModal,
    openStudentModal,
    openSettingsModal,
    openAnalyticsModal,
    openHelpModal,
    // Новые пропсы для главных табов
    mainTab,
    setMainTab,
    // Пропсы для ChatPreview
    teacherSubject,
    disciplineId,
    chatSessions,
    onUpdateSessions,
    faqCache,
    onUpdateFAQCache
}) {
    const { energy } = useAuth();
    const [isProModalOpen, setIsProModalOpen] = useState(false);

    const handleEnergyClick = () => {
        if (energy === 0) {
            setIsProModalOpen(true);
        }
    };

    return (
        <div className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.headerTop}>
                    <div className={styles.headerInfo}>
                        <div className={styles.headerTitle}>
                            <img src="/logo.png" alt="OpenSchool" className={styles.logo} />
                            <h1>OpenSchool AI</h1>
                        </div>
                        <p>AI-инструменты, которые помогут вам преподавать эффективнее и сэкономят ваше время</p>
                    </div>

                    <div className={styles.profileSection}>
                        <LanguageSelector
                            selectedLanguage={selectedLanguage}
                            setSelectedLanguage={setSelectedLanguage}
                        />

                        <DisciplineSelector
                            selectedDiscipline={selectedDiscipline}
                            setSelectedDiscipline={setSelectedDiscipline}
                        />

                        <EnergyCircle
                            energy={energy}
                            maxEnergy={10}
                            onClick={handleEnergyClick}
                        />

                        <div className={styles.profileWrapper} style={{ position: 'relative' }}>
                            <ProfileIcon onClick={toggleProfileDropdown} />
                            <ProfileDropdown
                                isOpen={isProfileDropdownOpen}
                                onClose={closeProfileDropdown}
                                openProfileModal={openProfileModal}
                                openStudentModal={openStudentModal}
                                openSettingsModal={openSettingsModal}
                                openAnalyticsModal={openAnalyticsModal}
                                openHelpModal={openHelpModal}
                            />
                        </div>
                    </div>
                </div>

                {/* Передаем пропсы табов в AvatarSection */}
                <AvatarSection
                    activeTab={mainTab}
                    setActiveTab={setMainTab}
                />

                {/* ChatPreview отображается в Header */}
                <ChatPreview
                    teacherSubject={teacherSubject}
                    disciplineId={disciplineId}
                    chatSessions={chatSessions}
                    onUpdateSessions={onUpdateSessions}
                    faqCache={faqCache}
                    onUpdateFAQCache={onUpdateFAQCache}
                />

                <ProUpgradeModal
                    isOpen={isProModalOpen}
                    onClose={() => setIsProModalOpen(false)}
                />
            </div>
        </div>
    );
}

export default Header;