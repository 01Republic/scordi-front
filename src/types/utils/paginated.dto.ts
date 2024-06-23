export class PaginationMetaData {
    totalItemCount: number;
    currentItemCount: number;
    totalPage: number;
    currentPage: number;
    itemsPerPage: number;
}

export class Paginated<DTO> {
    items: DTO[];
    pagination: PaginationMetaData;
}
