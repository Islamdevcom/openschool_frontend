import React, { useState } from 'react';
import './ToolsGrid.css';
import ToolCard from './ToolCard';
import CategoryModal from './tools/CategoryModal';
import HomeworkCheck from './tools/HomeworkCheck';
import LessonPlan from './tools/LessonPlan';
import KTPGenerator from './tools/KTPGenerator';
import ClassroomTeacherPlan from './tools/ClassroomTeacherPlan';
import LearningGoals from './tools/LearningGoals';
import CreatePresentation from './tools/CreatePresentation';
import Worksheets from './tools/Worksheets';
import CreateGame from './tools/CreateGame';
import CardGenerator from './tools/CardGenerator';
import VisualMaterials from './tools/VisualMaterials';
import SochSorGenerator from './tools/SochSorGenerator';
import AssessmentCriteria from './tools/AssessmentCriteria';
import ErrorAnalysis from './tools/ErrorAnalysis';
import ExitTicket from './tools/ExitTicket';
import ExplainTopic from './tools/ExplainTopic';
import HomeworkHelp from './tools/HomeworkHelp';
import Tutor from './tools/Tutor';
import CheckSolution from './tools/CheckSolution';
import PerformanceAnalytics from './tools/PerformanceAnalytics';
import { allTools } from './tools/toolsData';

function ToolsGrid({ activeTab }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHomeworkCheckOpen, setIsHomeworkCheckOpen] = useState(false);
    const [isLessonPlanOpen, setIsLessonPlanOpen] = useState(false);
    const [isKTPGeneratorOpen, setIsKTPGeneratorOpen] = useState(false);
    const [isClassroomTeacherPlanOpen, setIsClassroomTeacherPlanOpen] = useState(false);
    const [isLearningGoalsOpen, setIsLearningGoalsOpen] = useState(false);
    const [isCreatePresentationOpen, setIsCreatePresentationOpen] = useState(false);
    const [isWorksheetsOpen, setIsWorksheetsOpen] = useState(false);
    const [isCreateGameOpen, setIsCreateGameOpen] = useState(false);
    const [isCardGeneratorOpen, setIsCardGeneratorOpen] = useState(false);
    const [isVisualMaterialsOpen, setIsVisualMaterialsOpen] = useState(false);
    const [isSochSorGeneratorOpen, setIsSochSorGeneratorOpen] = useState(false);
    const [isAssessmentCriteriaOpen, setIsAssessmentCriteriaOpen] = useState(false);
    const [isErrorAnalysisOpen, setIsErrorAnalysisOpen] = useState(false);
    const [isExitTicketOpen, setIsExitTicketOpen] = useState(false);
    const [isExplainTopicOpen, setIsExplainTopicOpen] = useState(false);
    const [isHomeworkHelpOpen, setIsHomeworkHelpOpen] = useState(false);
    const [isTutorOpen, setIsTutorOpen] = useState(false);
    const [isCheckSolutionOpen, setIsCheckSolutionOpen] = useState(false);
    const [isPerformanceAnalyticsOpen, setIsPerformanceAnalyticsOpen] = useState(false);

    const tools = allTools;

    const filteredTools = tools.filter(tool => {
        const matchesTab = activeTab === 'Все' || tool.category === activeTab;
        return matchesTab;
    });

    const handleToolClick = (tool) => {
        if (tool.isCategory) {
            // Открываем модалку для категории
            setSelectedCategory(tool);
            setIsModalOpen(true);
        } else if (tool.id === 'homework-check') {
            // Открываем Проверку ДЗ
            setIsHomeworkCheckOpen(true);
        } else if (tool.id === 'analytics') {
            // Открываем Аналитику успеваемости
            setIsPerformanceAnalyticsOpen(true);
        } else {
            // Обычный инструмент - старая логика
            console.log(`Tool clicked: ${tool.title}`);
        }
    };

    // Обработчик клика на инструмент внутри категории
    const handleCategoryToolClick = (tool) => {
        // Закрываем модалку категории
        setIsModalOpen(false);

        // Открываем соответствующий инструмент
        if (tool.id === 'lesson-plan') {
            setIsLessonPlanOpen(true);
        } else if (tool.id === 'ktp-generator') {
            setIsKTPGeneratorOpen(true);
        } else if (tool.id === 'classroom-teacher-plan') {
            setIsClassroomTeacherPlanOpen(true);
        } else if (tool.id === 'learning-goals') {
            setIsLearningGoalsOpen(true);
        } else if (tool.id === 'create-presentation') {
            setIsCreatePresentationOpen(true);
        } else if (tool.id === 'worksheets') {
            setIsWorksheetsOpen(true);
        } else if (tool.id === 'create-game') {
            setIsCreateGameOpen(true);
        } else if (tool.id === 'card-generator') {
            setIsCardGeneratorOpen(true);
        } else if (tool.id === 'visual-materials') {
            setIsVisualMaterialsOpen(true);
        } else if (tool.id === 'soch-sor-generator') {
            setIsSochSorGeneratorOpen(true);
        } else if (tool.id === 'assessment-criteria') {
            setIsAssessmentCriteriaOpen(true);
        } else if (tool.id === 'error-analysis') {
            setIsErrorAnalysisOpen(true);
        } else if (tool.id === 'exit-ticket') {
            setIsExitTicketOpen(true);
        } else if (tool.id === 'explain-topic') {
            setIsExplainTopicOpen(true);
        } else if (tool.id === 'homework-help') {
            setIsHomeworkHelpOpen(true);
        } else if (tool.id === 'tutor') {
            setIsTutorOpen(true);
        } else if (tool.id === 'check-solution') {
            setIsCheckSolutionOpen(true);
        } else {
            console.log(`Category tool clicked: ${tool.title}`);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedCategory(null), 300);
    };

    return (
        <>
            <div className="tools-grid">
                {filteredTools.map((tool, index) => (
                    <ToolCard
                        key={tool.id}
                        icon={tool.icon}
                        title={tool.title}
                        description={tool.description}
                        index={index + 1}
                        onClick={() => handleToolClick(tool)}
                        isCategory={tool.isCategory}
                    />
                ))}
            </div>

            <CategoryModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                category={selectedCategory}
                onToolClick={handleCategoryToolClick}
            />

            <HomeworkCheck
                isOpen={isHomeworkCheckOpen}
                onClose={() => setIsHomeworkCheckOpen(false)}
            />

            <LessonPlan
                isOpen={isLessonPlanOpen}
                onClose={() => setIsLessonPlanOpen(false)}
            />

            <KTPGenerator
                isOpen={isKTPGeneratorOpen}
                onClose={() => setIsKTPGeneratorOpen(false)}
            />

            <ClassroomTeacherPlan
                isOpen={isClassroomTeacherPlanOpen}
                onClose={() => setIsClassroomTeacherPlanOpen(false)}
            />

            <LearningGoals
                isOpen={isLearningGoalsOpen}
                onClose={() => setIsLearningGoalsOpen(false)}
            />

            <CreatePresentation
                isOpen={isCreatePresentationOpen}
                onClose={() => setIsCreatePresentationOpen(false)}
            />

            <Worksheets
                isOpen={isWorksheetsOpen}
                onClose={() => setIsWorksheetsOpen(false)}
            />

            <CreateGame
                isOpen={isCreateGameOpen}
                onClose={() => setIsCreateGameOpen(false)}
            />

            <CardGenerator
                isOpen={isCardGeneratorOpen}
                onClose={() => setIsCardGeneratorOpen(false)}
            />

            <VisualMaterials
                isOpen={isVisualMaterialsOpen}
                onClose={() => setIsVisualMaterialsOpen(false)}
            />

            <SochSorGenerator
                isOpen={isSochSorGeneratorOpen}
                onClose={() => setIsSochSorGeneratorOpen(false)}
            />

            <AssessmentCriteria
                isOpen={isAssessmentCriteriaOpen}
                onClose={() => setIsAssessmentCriteriaOpen(false)}
            />

            <ErrorAnalysis
                isOpen={isErrorAnalysisOpen}
                onClose={() => setIsErrorAnalysisOpen(false)}
            />

            <ExitTicket
                isOpen={isExitTicketOpen}
                onClose={() => setIsExitTicketOpen(false)}
            />

            <ExplainTopic
                isOpen={isExplainTopicOpen}
                onClose={() => setIsExplainTopicOpen(false)}
            />

            <HomeworkHelp
                isOpen={isHomeworkHelpOpen}
                onClose={() => setIsHomeworkHelpOpen(false)}
            />

            <Tutor
                isOpen={isTutorOpen}
                onClose={() => setIsTutorOpen(false)}
            />

            <CheckSolution
                isOpen={isCheckSolutionOpen}
                onClose={() => setIsCheckSolutionOpen(false)}
            />

            <PerformanceAnalytics
                isOpen={isPerformanceAnalyticsOpen}
                onClose={() => setIsPerformanceAnalyticsOpen(false)}
            />
        </>
    );
}

export default ToolsGrid;