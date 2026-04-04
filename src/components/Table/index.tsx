import {
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

import type { TableCoulmnType, TableDataType } from "./types";

type TableProps = {
  columns: TableCoulmnType[];
  data: TableDataType[];
  caption?: string;
  withNumber?: boolean;
} & React.ComponentProps<"table">;

export default function Table({
  columns,
  data,
  caption,
  withNumber,
}: TableProps) {
  return (
    <TableContainer>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {withNumber && <TableHead className="w-1/12">No</TableHead>}
          {columns.map((column) => (
            <TableHead key={column.accessorKey} className={column.className}>
              {column.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: false positive
          <TableRow key={index}>
            {withNumber && (
              <TableCell className="font-medium">{index + 1}</TableCell>
            )}
            {columns.map((column) => (
              <TableCell
                key={column.accessorKey}
                textPosition={column.textPosition}
                className="font-medium"
              >
                {(row as TableDataType)[column.accessorKey]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
}
