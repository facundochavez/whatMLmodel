'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import modelsResponsesDataRaw from '@/prompts/modelsResponses.data.json';
import { Pipeline, View } from '@/types';
import { useRouter } from 'next/navigation';

interface AnalyzesContextProps {
  analyzesView: View[];
  recentsView: View[];
  favoritesView: View[];

  currentAnalysis: Pipeline;
  setCurrentAnalysis: React.Dispatch<React.SetStateAction<Pipeline>>;
  selectedAnalysisId: string;
  setSelectedAnalysisId: React.Dispatch<React.SetStateAction<string>>;
  auxiliarAnalysis: Pipeline;
  auxiliarAnalysisTwo: Pipeline;

  handleToggleFavorite: (id: string) => void;
  handleDeleteAnalysis: (id: string) => void;
  handleAddAnalysis: () => void;
  handleUpdateRecommendations: () => void;
  handleSelectAnalysis: (id: string) => void;
}

const AnalyzesContext = createContext<AnalyzesContextProps | undefined>(
  undefined
);

interface AnalyzesProviderProps {
  children: React.ReactNode;
}

export const AnalyzesProvider = ({ children }: AnalyzesProviderProps) => {
  const router = useRouter();
  // ESTE ARRAY SIMULA LA BASE DE DATOS
  const [analyzes, setAnalyzes] = useState<Pipeline[]>(
    modelsResponsesDataRaw as Pipeline[]
  );
  // ESTAS SON VARIABLES AUXILIARES PARA SIMULAR LA GENERACIÓN DE UN NUEVO ANÁLISIS MEDIANTE AI.
  const auxiliarAnalysis = modelsResponsesDataRaw[0] as Pipeline;
  const auxiliarAnalysisTwo = modelsResponsesDataRaw[1] as Pipeline;
  // ANALYZES, RECENTS Y FAVORITES SON DE TIPO PIPELINE[] PERO SOLO CONTIENE: ID, TITLE, ISFAVORITE
  const [analyzesView, setAnalyzesView] = useState<View[]>(
    analyzes.map(({ id, title, isFavorite }) => ({
      id,
      title,
      isFavorite,
    }))
  );
  const recentsView: View[] = analyzesView.filter(
    (analysisView) => !analysisView.isFavorite
  );
  const favoritesView: View[] = analyzesView.filter(
    (analysisView) => analysisView.isFavorite
  );
  // CURRENT ANÁLISIS ES DE TIPO PIPELINE[] Y PUEDE CONTENER TODO HASTA RECOMMENDATIONS -> SE SINCRONIZA CON EL BACKEND (modelsResponsesData EN ESTE CASO)
  const [currentAnalysis, setCurrentAnalysis] = useState<Pipeline>({});
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string>('');
  // CURRENT ANÁLISIS SE COMPLETA EN LOS COMPONENTES: STEP ONE (HANDLE GENERATE INFO) Y STEP TWO (HANLDE GET RECOMMENDATIONS) AMBAS FUNCIONES SON UNA SIMULACIÓN QUE LLAMAN A
  // auxiliarAnalysis, PERO TENER CUIDADO QUE AMBAS MANEJAN ESTADOS QUE PERMITE A LOS BOTONES REACCIONAR A "IS GENERATIN INFO" E "IS GETTING RECOMMENDATIONS" (AMBAS FUNCIONES
  // DEL GLOBAL CONTEXT) Y MOSTRAR ASÍ UN SPINNER DE CARGA

  //
  //
  //
  // LAS SIGUIENTES FUNCIONES TIENEN UN APROACH DE "OPTIMISTIC UI UPDATE"-> FRONTEND / BACKEND / FRONTEND
  // AQUÍ SE DEBE HACER LA ACTUALIZACIÓN DEL BACKEND Y SI DA ERROR, SE DEBE REVERTIR LAS SIGUIENTES FUNCIONES.
  // IMPORTANTE: EL ANÁLISIS MODIFICADO DEBE QUEDAR SIEMPRE EN LA PRIMERA POSICIÓN EN EL BACKEND -> ACTUALIZAR SU FECHA "UpdatedAt" Y SIEMPRE DEVOLVER LOS
  // RESULTADOS EN ORDEN CRONOLÓGICO SEGÚN SU "CreatedAt" Y SU "UpdatedAt", LO QUE SEA MÁS RECIENTE.
  // AL FRONTEND NO LE PREOCUPA ESTE CAMBIO PORQUE YA PONE EN PRIMERA POSICIÓN LO QUE SEA MODIFICADO

  const handleToggleFavorite = async (analysisId: string) => {
    console.log(
      analysisId,
      typeof analysisId,
      currentAnalysis.id,
      typeof currentAnalysis.id
    );
    // SE ACTUALIZA EL CURRENT ANALYSIS, CAMBIANDO EL VALOR DE "ISFAVORITE"
    if (currentAnalysis.id === analysisId) {
      setCurrentAnalysis((prevAnalysis) => ({
        ...prevAnalysis,
        isFavorite: !prevAnalysis.isFavorite,
      }));
    }
    // SE ACTUALIZA EL ARRAY ANALYZESVIEW, CAMBIANDO EL VALOR DE "ISFAVORITE" Y ENVIANDO A LA PRIMERA POSICIÓN
    const analysisViewIndex = analyzesView.findIndex(
      (analysisView) => analysisView.id === analysisId
    );
    if (analysisViewIndex === -1) return;
    const analysisViewToToggle = {
      ...analyzesView[analysisViewIndex],
      isFavorite: !analyzesView[analysisViewIndex].isFavorite,
    };
    const updatedAnalyzesView = [...analyzesView];
    updatedAnalyzesView.splice(analysisViewIndex, 1);
    setAnalyzesView([analysisViewToToggle, ...updatedAnalyzesView]);

    // SIMULACIÓN DE ACTUALIZACIÓN DEL BACKEND:
    const analysisIndex = analyzes.findIndex(
      (analysis) => analysis.id === analysisId
    );
    if (analysisIndex === -1) return;
    const analysisToToggle = {
      ...analyzes[analysisIndex],
      isFavorite: !analyzes[analysisIndex].isFavorite,
    };
    const updatedAnalyses = [...analyzes];
    updatedAnalyses.splice(analysisIndex, 1);
    setAnalyzes([analysisToToggle, ...updatedAnalyses]);

    // EJENMPLO DE CÓMO SE PUEDE ACTUALIZAR EL BACKEND Y REVERTIR:
    /* try {
      await updateFavoriteStatusOnBackend(analysisId); // Aquí llamas a tu API backend
    } catch (error) {
      // Si hay un error, revertir el cambio en el frontend
      // REVERTIR AQUÍ
      console.error("Error al actualizar favorito en el backend", error);
    } */
  };

  const handleDeleteAnalysis = async (analysisId: string) => {
    const updatedAnalyzesView = analyzesView.filter(
      (analysisView) => analysisView.id !== analysisId
    );
    setAnalyzesView(updatedAnalyzesView);

    const updatedAnalyses = analyzes.filter(
      (analysis) => analysis.id !== analysisId
    );
    setAnalyzes(updatedAnalyses);

    if (currentAnalysis?.id === analysisId) {
      setCurrentAnalysis({});
      router.push('/');
    }
  };

  const handleAddAnalysis = () => {
    if (currentAnalysis) {
      setAnalyzes((prevList) => [currentAnalysis, ...prevList]);
      setAnalyzesView((prevList) => [
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

    const analysisIndex = analyzes.findIndex(
      (analysis) => analysis.id === currentAnalysis.id
    );

    if (analysisIndex !== -1) {
      const updatedAnalysis = {
        ...analyzes[analysisIndex],
        recommendations: currentAnalysis.recommendations,
      };
      const updatedAnalyzes = [...analyzes];
      updatedAnalyzes.splice(analysisIndex, 1); // Elimina el análisis de su posición actual
      setAnalyzes([updatedAnalysis, ...updatedAnalyzes]); // Inserta el análisis al principio
    }

    const analysisViewIndex = analyzesView.findIndex(
      (analysisView) => analysisView.id === currentAnalysis.id
    );

    if (analysisViewIndex !== -1) {
      const updatedAnalysisView = {
        ...analyzesView[analysisViewIndex],
      };
      const updatedAnalyzesView = [...analyzesView];
      updatedAnalyzesView.splice(analysisViewIndex, 1); // Elimina el análisis de su posición actual
      setAnalyzesView([updatedAnalysisView, ...updatedAnalyzesView]); // Inserta el análisis al principio
    }
  };

  const handleSelectAnalysis = (analysisId: string) => {
    const analysis = analyzes.find((analysis) => analysis.id === analysisId);
    if (analysis) {
      setCurrentAnalysis({
        ...analysis,
      });
      router.push('/analysis');
    }
  };

  return (
    <AnalyzesContext.Provider
      value={{
        analyzesView,
        recentsView,
        favoritesView,

        currentAnalysis,
        setCurrentAnalysis,
        selectedAnalysisId,
        setSelectedAnalysisId,
        auxiliarAnalysis,
        auxiliarAnalysisTwo,

        handleToggleFavorite,
        handleDeleteAnalysis,
        handleAddAnalysis,
        handleUpdateRecommendations,
        handleSelectAnalysis
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
