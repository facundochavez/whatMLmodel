'use client';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTablesGroupStore } from '@/store/tablesGroup.store';

const SimilarDatasetTable = <TData, TValue>() => {
  const { type, columnsPerformanceMetrics, performanceMetrics } = useTablesGroupStore();

  const columns = columnsPerformanceMetrics[type];

  const table = useReactTable({
    data: performanceMetrics as TData[],
    columns: columns as ColumnDef<TData, TValue>[],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='rounded-md border bg-background w-full overflow-auto'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className='h-16 bg-muted/30'>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className='text-center'>
                  {header.isPlaceholder ? null : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className='text-center py-0 h-16'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SimilarDatasetTable;
