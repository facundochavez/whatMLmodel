import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ViewButton from "./ViewButton/ViewButton";
import { useGlobalStore } from "@/store/globals.store"; // ✅ Cambio de `useGlobalContext` a Zustand
import { useTablesGroupStore } from "@/store/tablesGroup.store"; // ✅ Usamos Zustand en lugar de contexto

const DatasetSelector: React.FC = () => {
  const isMobile = useGlobalStore((state) => state.isMobile);
  const { similarDatasets, selectedDatasetIndex, setSelectedDatasetIndex } =
    useTablesGroupStore();

  return (
    <header
      className={`flex flex-col gap-x-3 gap-y-1 lg:flex-row lg:items-center ${
        isMobile ? "" : " pl-[370px]"
      }`}
    >
      <h2 className="min-w-max text-base">Similar dataset:</h2>
      <div className="flex gap-2 sm:gap-3 items-center w-full">
        <Select
          defaultValue="0"
          value={selectedDatasetIndex}
          onValueChange={setSelectedDatasetIndex}
        >
          <SelectTrigger className="w-full md:w-52 bg-muted/30 sm:bg-background text-sm sm:text-base">
            <SelectValue placeholder="Select a dataset" />
          </SelectTrigger>
          <SelectContent className="bg-primary-foreground sm:bg-background">
            <SelectGroup>
              {similarDatasets.map((dataset, index) => (
                <SelectItem
                  key={index}
                  value={`${index}`}
                  className="text-sm sm:text-base"
                >
                  {dataset.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <ViewButton />
      </div>
    </header>
  );
};

export default DatasetSelector;
