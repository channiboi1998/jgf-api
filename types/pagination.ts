export type Pagination = {
  page: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
};
