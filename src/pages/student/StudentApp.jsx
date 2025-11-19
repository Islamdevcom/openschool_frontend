import React, { useState } from "react";
import Header from "../../components/student/Header";
import Dashboard from "../../components/student/Dashboard";
import Chat from "../../components/student/Chat";
import Schedule from "../../components/student/Schedule";
import Journal from "../../components/student/Journal";
import Planning from "../../components/student/Planning";
import Assignments from "../../components/student/Assignments";
import OnboardingTour from "../../components/onboarding/OnboardingTour";
import { useOnboarding } from "../../components/onboarding/hooks/useOnboarding";
import { studentTourSteps } from "../../components/onboarding/tours/studentTour.jsx";
import styles from "./StudentApp.module.css";

function StudentApp() {
    const [activeSection, setActiveSection] = useState('dashboard');
    const { runTour, handleTourCallback } = useOnboarding('student');

    const renderSection = () => {
        switch (activeSection) {
            case 'dashboard':
                return <Dashboard />;
            case 'chat':
                return <Chat />;
            case 'schedule':
                return <Schedule />;
            case 'journal':
                return <Journal />;
            case 'planning':
                return <Planning />;
            case 'assignments':
                return <Assignments />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className={styles.container}>
            <OnboardingTour
                steps={studentTourSteps}
                run={runTour}
                callback={handleTourCallback}
            />

            <Header
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            <main className={styles.content}>
                <div className={styles.section}>
                    {renderSection()}
                </div>
            </main>
        </div>
    );
}

export default StudentApp;