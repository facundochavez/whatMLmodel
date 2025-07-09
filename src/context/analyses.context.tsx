'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { analysesMock } from '@/mocks/analyses.mock';
import { View } from '@/types/common.types';
import { Analysis } from '@/types/analysis.types';
import { useRouter, usePathname } from 'next/navigation';
import sleep from '@/utils/sleep';

interface AnalysesContextProps {
  analysesView: View[];
  recentsView: View[];
  favoritesView: View[];

  currentAnalysis: Analysis | null;
  setCurrentAnalysis: React.Dispatch<React.SetStateAction<Analysis | null>>;
  selectedAnalysisId: string | null;
  setSelectedAnalysisId: React.Dispatch<React.SetStateAction<string>>;

  auxiliarAnalysis: Analysis;
  auxiliarAnalysisTwo: Analysis;
  setAuxiliarAnalysisIndex: React.Dispatch<React.SetStateAction<number>>;

  isPageTransitioning: boolean;

  handleToggleFavorite: (id: string) => void;
  handleDeleteAnalysis: (id: string) => void;
  handleAddAnalysis: () => void;
  handleUpdateRecommendations: () => void;
  handleSelectAnalysis: (id: string) => void;
}

const AnalysesContext = createContext<AnalysesContextProps | undefined>(undefined);

interface AnalysesProviderProps {
  children: React.ReactNode;
}

export const AnalysesProvider = ({ children }: AnalysesProviderProps) => {
  // ESTE ARRAY SIMULA LA BASE DE DATOS
  const [analyses, setAnalyses] = useState<Analysis[]>(analysesMock);

  // ESTAS SON VARIABLES AUXILIARES PARA SIMULAR LA GENERACIÓN DE UN NUEVO ANÁLISIS MEDIANTE AI.
  const [auxiliarAnalysisIndex, setAuxiliarAnalysisIndex] = useState<number>(0);
  const auxiliarAnalysis = analysesMock[auxiliarAnalysisIndex];
  const auxiliarAnalysisTwo = analysesMock[4];

  // ANALYSES, RECENTS Y FAVORITES SON DE TIPO ANALYSIS[] PERO SOLO CONTIENE: ID, TITLE, ISFAVORITE
  const [analysesView, setAnalysesView] = useState<View[]>(analyses.slice(3).map(({ id, title, isFavorite }) => ({ id, title, isFavorite })));

  const recentsView: View[] = analysesView.filter((analysisView) => !analysisView.isFavorite);
  const favoritesView: View[] = analysesView.filter((analysisView) => analysisView.isFavorite);

  // CURRENT ANÁLISIS ES DE TIPO ANALYSIS[] Y PUEDE CONTENER TODO HASTA RECOMMENDATIONS -> SE SINCRONIZA CON EL BACKEND (modelsResponsesData EN ESTE CASO)
  const [currentAnalysis, setCurrentAnalysis] = useState<Analysis | null>(null);
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string>('');

  // CURRENT ANÁLISIS SE COMPLETA EN LOS COMPONENTES: STEP ONE (HANDLE GENERATE INFO) Y STEP TWO (HANLDE GET RECOMMENDATIONS) AMBAS FUNCIONES SON UNA SIMULACIÓN QUE LLAMAN A
  // auxiliarAnalysis, PERO TENER CUIDADO QUE AMBAS MANEJAN ESTADOS QUE PERMITE A LOS BOTONES REACCIONAR A "IS GENERATIN INFO" E "IS GETTING RECOMMENDATIONS" (AMBAS FUNCIONES
  // DEL GLOBAL CONTEXT) Y MOSTRAR ASÍ UN SPINNER DE CARGA

  //
  // LAS SIGUIENTES FUNCIONES TIENEN UN APPROACH DE "OPTIMISTIC UI UPDATE"-> FRONTEND / BACKEND / FRONTEND
  // AQUÍ SE DEBE HACER LA ACTUALIZACIÓN DEL BACKEND Y SI DA ERROR, SE DEBE REVERTIR LAS SIGUIENTES FUNCIONES.
  // IMPORTANTE: EL ANÁLISIS MODIFICADO DEBE QUEDAR SIEMPRE EN LA PRIMERA POSICIÓN EN EL BACKEND -> ACTUALIZAR SU FECHA "UpdatedAt" Y SIEMPRE DEVOLVER LOS
  // RESULTADOS EN ORDEN CRONOLÓGICO SEGÚN SU "CreatedAt" Y SU "UpdatedAt", LO QUE SEA MÁS RECIENTE.
  // AL FRONTEND NO LE PREOCUPA ESTE CAMBIO PORQUE YA PONE EN PRIMERA POSICIÓN LO QUE SEA MODIFICADO

  const handleToggleFavorite = async (analysisId: string) => {
    // SE ACTUALIZA EL CURRENT ANALYSIS, CAMBIANDO EL VALOR DE "ISFAVORITE"
    if (currentAnalysis?.id === analysisId) {
      setCurrentAnalysis({ ...currentAnalysis, isFavorite: !currentAnalysis.isFavorite });
    }
    // SE ACTUALIZA EL ARRAY ANALYSESVIEW, CAMBIANDO EL VALOR DE "ISFAVORITE" Y ENVIANDO A LA PRIMERA POSICIÓN
    const analysisViewIndex = analysesView.findIndex((analysisView) => analysisView.id === analysisId);
    if (analysisViewIndex === -1) return;
    const analysisViewToToggle = {
      ...analysesView[analysisViewIndex],
      isFavorite: !analysesView[analysisViewIndex].isFavorite,
    };
    const updatedAnalysesView = [...analysesView];
    updatedAnalysesView.splice(analysisViewIndex, 1);
    setAnalysesView([analysisViewToToggle, ...updatedAnalysesView]);

    // SIMULACIÓN DE ACTUALIZACIÓN DEL BACKEND:
    const analysisIndex = analyses.findIndex((analysis) => analysis.id === analysisId);
    if (analysisIndex === -1) return;
    const analysisToToggle = {
      ...analyses[analysisIndex],
      isFavorite: !analyses[analysisIndex].isFavorite,
    };
    const updatedAnalyses = [...analyses];
    updatedAnalyses.splice(analysisIndex, 1);
    setAnalyses([analysisToToggle, ...updatedAnalyses]);
  };

  // HANDLE DELETE ANALYSIS
  const router = useRouter();
  const pathname = usePathname();

  const handleDeleteAnalysis = async (analysisId: string) => {
    const updatedAnalysesView = analysesView.filter((analysisView) => analysisView.id !== analysisId);
    setAnalysesView(updatedAnalysesView);

    const updatedAnalyses = analyses.filter((analysis) => analysis.id !== analysisId);
    setAnalyses(updatedAnalyses);

    if (currentAnalysis?.id === analysisId) {
      const main = document.querySelector('main');
      if (!main) return;
      main.classList.add('page-transition');
      await sleep(300);
      router.push('/');
      setCurrentAnalysis(null);
    }
  };

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;
    main.classList.remove('page-transition');
  }, [pathname]);

  const handleAddAnalysis = () => {
    if (currentAnalysis) {
      setAnalyses((prevList) => [currentAnalysis, ...prevList]);
      setAnalysesView((prevList) => [
        {
          id: currentAnalysis.id,
          title: currentAnalysis.title,
          isFavorite: currentAnalysis.isFavorite,
        },
        ...prevList,
      ]);
    }
  };

  const handleUpdateRecommendations = () => {
    if (!currentAnalysis || !currentAnalysis.id) return;

    const analysisIndex = analyses.findIndex((analysis) => analysis.id === currentAnalysis.id);

    if (analysisIndex !== -1) {
      const updatedAnalysis = {
        ...analyses[analysisIndex],
        recommendations: currentAnalysis.recommendations,
      };
      const updatedAnalyses = [...analyses];
      updatedAnalyses.splice(analysisIndex, 1);
      setAnalyses([updatedAnalysis, ...updatedAnalyses]);
    }

    const analysisViewIndex = analysesView.findIndex((analysisView) => analysisView.id === currentAnalysis.id);

    if (analysisViewIndex !== -1) {
      const updatedAnalysisView = {
        ...analysesView[analysisViewIndex],
      };
      const updatedAnalysesView = [...analysesView];
      updatedAnalysesView.splice(analysisViewIndex, 1);
      setAnalysesView([updatedAnalysisView, ...updatedAnalysesView]);
    }
  };

  // HANDLE SELECT ANALYSIS
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const handleSelectAnalysis = async (analysisId: string) => {
    if (currentAnalysis?.id === analysisId && pathname === '/analysis') return;
    const main = document.querySelector('main');
    if (!main) return;
    main.classList.add('page-transition');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const analysis = analyses.find((analysis) => analysis.id === analysisId);
    await sleep(200);

    if (analysis) {
      setCurrentAnalysis({ ...analysis });
    }

    if (pathname === '/analysis') {
      setIsPageTransitioning(true);
    } else {
      router.push('/analysis');
    }
  };

  useEffect(() => {
    if (isPageTransitioning) {
      const main = document.querySelector('main');
      if (!main) return;
      main.classList.remove('page-transition');
      setIsPageTransitioning(false);
    }
  }, [currentAnalysis]);

  return (
    <AnalysesContext.Provider
      value={{
        analysesView: analysesView,
        recentsView,
        favoritesView,

        currentAnalysis,
        setCurrentAnalysis,
        selectedAnalysisId,
        setSelectedAnalysisId,

        auxiliarAnalysis,
        auxiliarAnalysisTwo,
        setAuxiliarAnalysisIndex,

        isPageTransitioning,

        handleToggleFavorite,
        handleDeleteAnalysis,
        handleAddAnalysis,
        handleUpdateRecommendations,
        handleSelectAnalysis,
      }}
    >
      {children}
    </AnalysesContext.Provider>
  );
};

export const useAnalysesContext = () => {
  const context = useContext(AnalysesContext);
  if (!context) {
    throw new Error('useAnalysesContext must be used within a AnalysesProvider');
  }
  return context;
};

export default AnalysesProvider;
