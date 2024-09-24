'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ModelResponse } from '@/types';
import modelsResponsesDataRaw from '@/prompts/modelsResponses.data.json';
import { useGlobalContext } from './global.context';

const infoResponsesData = modelsResponsesDataRaw as ModelResponse[];

interface AnalyzesContextProps {
  analyzes: ModelResponse[];
  recents: ModelResponse[];
  favorites: ModelResponse[];
  toggleFavorite: (id: string) => void;
  addAnalysis: () => void;
  deleteAnalysis: (id: string) => void;
}

const AnalyzesContext = createContext<AnalyzesContextProps | undefined>(
  undefined
);

interface AnalyzesProviderProps {
  children: React.ReactNode;
}

export const AnalyzesProvider = ({ children }: AnalyzesProviderProps) => {
  const { currentAnalysis } = useGlobalContext();
  const [analyzes, setAnalyzes] = useState<ModelResponse[]>(infoResponsesData);
  const [recents, setRecents] = useState<ModelResponse[]>([]);
  const [favorites, setFavorites] = useState<ModelResponse[]>([]);

  useEffect(() => {
    setRecents(analyzes.filter((item) => item.favorite === false));
    setFavorites(analyzes.filter((item) => item.favorite));
  }, [analyzes]);

  const toggleFavorite = (id: string) => {
    const item = analyzes.find((item) => item.id === id);
    if (item) {
      item.favorite = !item.favorite;
      setAnalyzes(analyzes.filter((item) => item.id !== id));
      setAnalyzes([item, ...analyzes]);
    }
  };

  const addAnalysis = () => {
    if (currentAnalysis) {
      setAnalyzes([currentAnalysis, ...analyzes]);
    }
  };

  const deleteAnalysis = (id: string) => {
    setAnalyzes(analyzes.filter((item) => item.id !== id));
  };


  return (
    <AnalyzesContext.Provider
      value={{
        analyzes,
        recents,
        favorites,
        toggleFavorite,
        addAnalysis,
        deleteAnalysis,
      }}
    >
      {children}
    </AnalyzesContext.Provider>
  );
};

export const useAnalyzesContext = () => {
  const context = useContext(AnalyzesContext);
  if (!context) {
    throw new Error(
      'useAnalyzesContext must be used within a AnalyzesProvider'
    );
  }
  return context;
};

export default AnalyzesProvider;
