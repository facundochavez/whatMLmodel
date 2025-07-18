import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTablesGroupContext } from '../tablesGroup.context';
import allColumnsModels from './columnsModels';
import { Dialog } from '@/components/ui/dialog';
import PipelineDialogContent from '@/components/DialogContents/Pipeline.dialogContent';
import GenerateCodeDialogContent from '@/components/DialogContents/GenerateCode.dialogContent';
import { useGlobalStore } from '@/store/global.store';

const ModelsTable = <TData, TValue>() => {
  const { type, models, similarPipelines, selectedSimilarPipelineIndex, dialogType } = useTablesGroupContext();
  const setSelectedPipeline = useGlobalStore((state) => state.setSelectedPipeline);
  const onOpenChangePipelineDialog = useGlobalStore((state) => state.onOpenChangePipelineDialog);

  const columnsModels = allColumnsModels(type);

  const table = useReactTable({
    data: models as TData[],
    columns: columnsModels as ColumnDef<TData, TValue>[],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border bg-background" onMouseEnter={() => setSelectedPipeline(similarPipelines[Number(selectedSimilarPipelineIndex)])}>
      <Dialog onOpenChange={onOpenChangePipelineDialog}>
        <Table>
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="h-16 bg-muted/30">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center py-0 px-0 h-16">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columnsModels.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {dialogType === 'similarDataset' && <PipelineDialogContent />}
        {dialogType === 'generate' && <GenerateCodeDialogContent />}
      </Dialog>
    </div>
  );
};

export default ModelsTable;
