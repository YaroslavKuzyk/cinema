export type SortDirection = 'asc' | 'desc' | null;

export interface IColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

export interface ISortState {
  key: string;
  direction: SortDirection;
}

export interface IProps {
  columns: IColumn[];
  data: Record<string, unknown>[];
  selectable?: boolean;
  selectedRows?: string[] | number[];
  rowKey?: string;
  loading?: boolean;
  emptyText?: string;
  sortBy?: ISortState | null;
}

export interface IPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage?: number;
  maxVisiblePages?: number;
}
