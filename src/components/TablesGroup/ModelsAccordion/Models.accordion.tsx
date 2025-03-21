import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import DatasetSelector from "../DatasetSelector/DatasetSelector";
import { Button } from "@/components/ui/button";
import { CodeXml } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import GenerateCodeDialogContent from "@/components/DialogContents/GenerateCode.dialogContent";
import PipelineDialogContent from "@/components/DialogContents/Pipeline.dialogContent";
import camelToTitleCase from "@/utils/camelToTitleCase";
import { Separator } from "@/components/ui/separator";
import getModelIcon from "@/utils/getModelIcon";
import { AiStarsIcon } from "@/icons/AiStarsIcon";
import { useTablesGroupStore } from "@/store/tablesGroup.store"; // ✅ Usamos Zustand en lugar de contexto

const ModelsAccordion: React.FC = () => {
  const { models, type, performanceMetrics } = useTablesGroupStore();

  return (
    <Card>
      <Accordion type="single" collapsible>
        <header className="w-full h-14 p-4 flex items-center text-sm text-muted-foreground bg-muted/30 border-b">
          <h3 className="text-left ml-1">{camelToTitleCase(type)} Models</h3>
        </header>
        {models.map((model, index) => {
          const modelPerformanceMetrics = performanceMetrics.find(
            (metric: any) => metric.modelAlias === model.alias
          );
          const ModelIcon = getModelIcon({
            iconNumber: model.icon,
          }) as React.FC;
          return (
            <AccordionItem
              key={index}
              value={model.alias}
              className={`${index === models.length - 1 && "border-b-0"}`}
            >
              <AccordionTrigger className="flex items-center gap-5 overflow-hidden">
                <div>
                  <ModelIcon />
                </div>
                <h2 className="w-full text-left text-base truncate">
                  {model.name}
                </h2>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <DatasetSelector />
                <ul className="w-full p-4 bg-muted/30 rounded border">
                  {Object.entries(modelPerformanceMetrics ?? {}).map(
                    ([key, value], idx) => (
                      <li key={idx} className="flex justify-between">
                        <label className="text-muted-foreground">
                          {camelToTitleCase(key)}
                        </label>
                        <Separator className="hidden xs:flex flex-grow w-0"></Separator>
                        <span>
                          {typeof value === "string" ||
                          typeof value === "number"
                            ? value
                            : "-"}
                        </span>
                      </li>
                    )
                  )}
                </ul>
                <footer className="flex flex-col gap-2 mt-0.5">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="secondary" className="border">
                        <CodeXml className="mr-2 h-[18px] w-[18px]" />
                        <span>Similar dataset code</span>
                      </Button>
                    </DialogTrigger>
                    <PipelineDialogContent />
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <AiStarsIcon className="mr-1.5 h-[18px] w-[18px]" />
                        <span>Generate code</span>
                      </Button>
                    </DialogTrigger>
                    <GenerateCodeDialogContent />
                  </Dialog>
                </footer>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Card>
  );
};

export default ModelsAccordion;
