export interface IColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

export interface IProps {
  columns: IColumn[];
  data: Record<string, unknown>[];
  selectable?: boolean;
  selectedRows?: string[] | number[];
  rowKey?: string;
  loading?: boolean;
  emptyText?: string;
}

export interface IPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage?: number;
  maxVisiblePages?: number;
}
