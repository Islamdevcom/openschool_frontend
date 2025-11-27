import { useState, useEffect, useCallback } from 'react';

/**
 * Хук для управления данными по дисциплинам
 * Каждая дисциплина имеет свои: группы, журнал, AI промпты, чат сессии
 */
const useDisciplineData = (disciplineId) => {
  const [disciplineData, setDisciplineData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Структура данных для каждой дисциплины
  const getEmptyDisciplineData = useCallback(() => ({
    disciplineId,
    groups: [],
    students: [],
    journal: {},
    aiPrompts: {
      lessonPlanning: '',
      taskGeneration: '',
      grading: '',
      feedback: '',
      explanation: ''
    },
    chatSessions: {},
    faqCache: [] // FAQ cache для экономии токенов
  }), [disciplineId]);

  // Загрузка данных дисциплины из localStorage
  const loadDisciplineData = useCallback(() => {
    try {
      setIsLoading(true);

      const storageKey = `openschool_discipline_${disciplineId}`;
      const savedData = localStorage.getItem(storageKey);

      if (savedData) {
        const parsedData = JSON.parse(savedData);
        console.log(`✅ Загружены данные для дисциплины: ${disciplineId}`, parsedData);
        setDisciplineData(parsedData);
      } else {
        // Если данных нет, создаем пустую структуру
        const emptyData = getEmptyDisciplineData();
        console.log(`📝 Создана новая структура для дисциплины: ${disciplineId}`);
        setDisciplineData(emptyData);
        saveDisciplineData(emptyData);
      }
    } catch (error) {
      console.error('Ошибка загрузки данных дисциплины:', error);
      setDisciplineData(getEmptyDisciplineData());
    } finally {
      setIsLoading(false);
    }
  }, [disciplineId, getEmptyDisciplineData]);

  // Сохранение данных дисциплины в localStorage
  const saveDisciplineData = useCallback((data) => {
    try {
      const storageKey = `openschool_discipline_${disciplineId}`;
      localStorage.setItem(storageKey, JSON.stringify(data));
      console.log(`💾 Сохранены данные для дисциплины: ${disciplineId}`);
    } catch (error) {
      console.error('Ошибка сохранения данных дисциплины:', error);
    }
  }, [disciplineId]);

  // Обновление AI промптов
  const updateAIPrompts = useCallback((newPrompts) => {
    setDisciplineData(prev => {
      const updated = {
        ...prev,
        aiPrompts: {
          ...prev.aiPrompts,
          ...newPrompts
        }
      };
      saveDisciplineData(updated);
      return updated;
    });
  }, [saveDisciplineData]);

  // Обновление чат сессий
  const updateChatSessions = useCallback((sessions) => {
    setDisciplineData(prev => {
      const updated = {
        ...prev,
        chatSessions: sessions
      };
      saveDisciplineData(updated);
      return updated;
    });
  }, [saveDisciplineData]);

  // Обновление групп
  const updateGroups = useCallback((groups) => {
    setDisciplineData(prev => {
      const updated = {
        ...prev,
        groups
      };
      saveDisciplineData(updated);
      return updated;
    });
  }, [saveDisciplineData]);

  // Обновление студентов
  const updateStudents = useCallback((students) => {
    setDisciplineData(prev => {
      const updated = {
        ...prev,
        students
      };
      saveDisciplineData(updated);
      return updated;
    });
  }, [saveDisciplineData]);

  // Обновление журнала
  const updateJournal = useCallback((journal) => {
    setDisciplineData(prev => {
      const updated = {
        ...prev,
        journal
      };
      saveDisciplineData(updated);
      return updated;
    });
  }, [saveDisciplineData]);

  // Очистка чата (опционально при смене дисциплины)
  const clearChatHistory = useCallback(() => {
    setDisciplineData(prev => {
      const updated = {
        ...prev,
        chatSessions: {}
      };
      saveDisciplineData(updated);
      return updated;
    });
    console.log(`🗑️ Очищена история чата для дисциплины: ${disciplineId}`);
  }, [disciplineId, saveDisciplineData]);

  // Обновление FAQ кэша
  const updateFAQCache = useCallback((newCache) => {
    setDisciplineData(prev => {
      const updated = {
        ...prev,
        faqCache: newCache
      };
      saveDisciplineData(updated);
      return updated;
    });
  }, [saveDisciplineData]);

  // Загружаем данные при монтировании или смене дисциплины
  useEffect(() => {
    loadDisciplineData();
  }, [loadDisciplineData]);

  return {
    disciplineData,
    isLoading,
    updateAIPrompts,
    updateChatSessions,
    updateGroups,
    updateStudents,
    updateJournal,
    clearChatHistory,
    updateFAQCache,
    reloadData: loadDisciplineData
  };
};

export default useDisciplineData;
