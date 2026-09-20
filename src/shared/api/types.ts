export type ListResponse<T> = {
  total: number;
  page: number;
  limit: number;
  data: T[];
};
