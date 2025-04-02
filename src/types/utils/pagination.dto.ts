export const DEFAULT_ITEMS_PER_PAGE = 30;
export const MAX_ITEMS_PER_PAGE = 1000;

export class PaginationDto {
    page?: number = 1;
    itemsPerPage?: number = DEFAULT_ITEMS_PER_PAGE;
}
