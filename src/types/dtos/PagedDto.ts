export type PagedDto<T> = {
  totalPages: number;
  pageSize: number;
  totalCount: number;
  currentPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
  data: T[];
}