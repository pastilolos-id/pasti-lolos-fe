type TableCoulmnType = {
  accessorKey: string;
  title: string;
  className?: string;
  textPosition?: "left" | "center" | "right";
};

type TableDataType = {
  [key: string]: string | number;
};

export type { TableCoulmnType, TableDataType };
