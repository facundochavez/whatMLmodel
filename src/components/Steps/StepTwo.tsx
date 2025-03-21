"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  LoaderCircle,
  PenLine,
  RefreshCcw,
  Star,
} from "lucide-react";
import { DialogFooter } from "@/components/ui/dialog";
import { AiStarsIcon } from "@/icons/AiStarsIcon";
import useTextReveal from "@/hooks/useTextReveal";
import { TransitionLink } from "@/components/TransitionLink/TransitionLink";
import StepTwoForm from "@/components/Forms/StepTwo.form";
import { useEffect, useState } from "react";
import { useAnalysisStore } from "@/store/analysis.store";
import { useRouter } from "next/navigation";
import { getRecommendedModels } from "@/services/geminiService";
import { useRecommendationsStore } from "@/store/recommendations.store";
import { useTablesGroupStore } from "@/store/tablesGroup.store";
import SimilarDatasetTable from "../TablesGroup/SimilarDatasetsTable/SimilarDataset.table";

interface StepTwoProps extends React.PropsWithChildren {
  setIsAiThinking: React.Dispatch<React.SetStateAction<boolean>>;
}

const StepTwo: React.FC<StepTwoProps> = ({ setIsAiThinking }) => {
  const { analysis, setAnalysis, clearAnalysis } = useAnalysisStore();
  const { recommendations, setRecommendations } = useRecommendationsStore();
  const { initializeTables, setSelectedDatasetIndex, similarDatasets } = useTablesGroupStore();
  const router = useRouter();

  const [isUserEditingInfo, setIsUserEditingInfo] = useState<boolean>(false);
  const [isFormCollapsed, setIsFormCollapsed] = useState(true);
  const [isFormBlocked, setIsFormBlocked] = useState(false);
  const [isButtonGettingRecommendations, setIsButtonGettingRecommendations] =
    useState<boolean>(false);

  // ✅ Restaurar `analysis` desde sessionStorage si no existe
  useEffect(() => {
    if (!analysis) {
      const storedAnalysis = sessionStorage.getItem("analysis");
      if (storedAnalysis) {
        setAnalysis(JSON.parse(storedAnalysis));
      }
    }
  }, [analysis, setAnalysis]);

  // ✅ Validación mejorada para `recommendations`
  useEffect(() => {
    const hasValidRecommendations =
      recommendations &&
      Array.isArray(recommendations.recommendations) &&
      recommendations.recommendations.some((rec) => rec.tables?.modelsAliases?.length > 0);
    
    setIsUserEditingInfo(hasValidRecommendations!);
    setIsFormCollapsed(hasValidRecommendations!);
    setIsFormBlocked(hasValidRecommendations!);
  }, [recommendations]);
  

  const handleGetRecommendations = async () => {
    if (!analysis) {
      console.error(
        "❌ No hay datos de análisis. Asegúrate de completar Step 1 antes de continuar."
      );
      return;
    }

    setIsFormCollapsed(true);
    setIsButtonGettingRecommendations(true);
    setIsAiThinking(true);

    try {
      // 🔹 Llamamos al LLM para obtener los modelos recomendados
      const recommendedModels = await getRecommendedModels(analysis);

      if (!recommendedModels || recommendedModels.length === 0) {
        console.error("❌ No se recibieron recomendaciones del LLM.");
        setIsButtonGettingRecommendations(false);
        setIsAiThinking(false);
        return;
      }

      // 🔹 Guardamos las recomendaciones en Zustand
      setRecommendations(recommendedModels);

      initializeTables(recommendedModels, analysis);

      if (similarDatasets.length > 0) {
        setSelectedDatasetIndex("0"); 
      }

    } catch (error) {
      console.error("❌ Error al obtener recomendaciones:", error);
    } finally {
      setIsButtonGettingRecommendations(false);
      setIsAiThinking(false);
    }
  };

  return (
    <section className="w-full flex flex-col items-center gap-6">
      <header className="w-full flex items-center justify-center max-w-[1050px] relative pl-14 pr-8 md:pr-14">
        <TransitionLink
          href="/"
          className="absolute left-0 opacity-0 animate-fade-in [animation-fill-mode:forwards]"
        >
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </TransitionLink>
        {useTextReveal(analysis?.title || "No analysis data")}
      </header>

      <StepTwoForm
        isFormCollapsed={isFormCollapsed}
        isFormBlocked={isFormBlocked}
        isUserEditingInfo={isUserEditingInfo}
        onCollapseChange={(collapsed) => setIsFormCollapsed(collapsed)}
      >
        <DialogFooter className="mt-4 md:mt-0">
          {!isUserEditingInfo ? (
            <>
              {!isButtonGettingRecommendations ? (
                <>
                  <TransitionLink href="/">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => clearAnalysis()}
                    >
                      <RefreshCcw className="w-4 h-4 mr-2" />
                      Cancel and retry
                    </Button>
                  </TransitionLink>
                  <Button
                    type="submit"
                    onClick={handleGetRecommendations}
                    className="flex items-center"
                  >
                    <AiStarsIcon className="mr-1.5 h-[18px] w-[18px]" />
                    Get models
                  </Button>
                </>
              ) : (
                <Button type="button" disabled className="flex items-center">
                  <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
                  Getting models
                </Button>
              )}
            </>
          ) : (
            <>
              <Button variant="outline">
                <Star className="w-4 h-4 mr-2" />
                Favorite
              </Button>
              <Button
                onClick={() => {
                  setIsUserEditingInfo(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <PenLine className="w-4 h-4 mr-2" /> Edit info
              </Button>
            </>
          )}
        </DialogFooter>
      </StepTwoForm>
    </section>
  );
};

export default StepTwo;
function setTablesData(arg0: { selectedDatasetIndex: string; }) {
  throw new Error("Function not implemented.");
}

