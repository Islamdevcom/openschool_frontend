import React from 'react';
import styles from './HeaderTeacher.module.css';
import LanguageSelector from './LanguageSelector';
import DisciplineSelector from './DisciplineSelector';
import ProfileIcon from './ProfileIcon';
import ProfileDropdown from './ProfileDropdown';
import AvatarSection from './AvatarSection';
import ChatPreview from './ChatPreview';
import Overlay from './Overlay';

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
    setMainTab
}) {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.headerTop}>
                        <div className={styles.headerInfo}>
                            <h1>OpenSchool AI</h1>
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
                    
                    {/* ChatPreview отображается всегда */}
                    <ChatPreview />
                </div>
            </div>

            {/* 🟣 Вне корневого .header, чтобы не перекрывало дропдаун */}
            {isProfileDropdownOpen && (
                <Overlay isActive={true} onClick={closeProfileDropdown} />
            )}
        </>
    );
}

export default Header;