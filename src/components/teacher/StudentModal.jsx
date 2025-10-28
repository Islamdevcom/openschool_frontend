import React, { useState } from 'react';
import styles from './StudentModal.module.css';
import StudentsTab from './StudentsTab';
import GroupsTab from './GroupsTab';

function StudentModal({ isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState('students');

    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const switchTab = (tabName) => {
        setActiveTab(tabName);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={handleModalClick}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>👥 Управление учениками</h2>
                    <button className={styles.closeModal} onClick={onClose}>&times;</button>
                </div>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tabBtn} ${activeTab === 'students' ? styles.active : ''}`}
                        onClick={() => switchTab('students')}
                    >
                        Ученики
                    </button>
                    <button
                        className={`${styles.tabBtn} ${activeTab === 'groups' ? styles.active : ''}`}
                        onClick={() => switchTab('groups')}
                    >
                        Группы
                    </button>
                </div>

                <div className={styles.tabContent}>
                    {activeTab === 'students' && <StudentsTab />}
                    {activeTab === 'groups' && <GroupsTab />}
                </div>
            </div>
        </div>
    );
}

export default StudentModal;
