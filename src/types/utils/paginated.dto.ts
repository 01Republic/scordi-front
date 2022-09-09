export declare class PaginationMetaData {
  totalItemCount: number;
  currentItemCount: number;
  totalPage: number;
  currentPage: number;
  itemsPerPage: number;
}

export declare class Paginated<DTO> {
  items: DTO[];
  pagination: PaginationMetaData;
}
