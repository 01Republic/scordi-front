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

    static init<DTO = never>() {
        return {
            items: [] as DTO[],
            pagination: {
                totalItemCount: 0,
                currentItemCount: 0,
                totalPage: 0,
                currentPage: 0,
                itemsPerPage: 0,
            },
        };
    }
}
