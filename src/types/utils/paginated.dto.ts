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

const DEFAULT_ITEMS_PER_PAGE = 30;
const MAX_ITEMS_PER_PAGE = 1000;

export class PaginationParams {
    page?: number = 1;
    itemsPerPage?: number = DEFAULT_ITEMS_PER_PAGE;
}

export class FindAllQuery<Entity> extends PaginationParams {
    /**
     * Swagger 에서 명세하지 않고 있으나,
     * Product 리포지토리의 findAndCount 에서 동작하는 where 구문을
     * client 에서 자유롭게 자유롭게 구성할 수 있습니다.
     *
     * advanced operator 구성은 parseOperator 함수를 참고하세요.
     *
     * @example
     *
     *  #1) 숨김 처리되지 않은 도서 상품 조회
     *  /products?where[type]=BOOK&where[isDisplayHidden]=false
     *
     *    where[type]=BOOK
     *    where[isDisplayHidden]=false
     *
     *  #2) 신규 도서상품 중 도서명이 '린 스타트업 바이블'인 것을 검색
     *  /products?where[name]=린 스타트업 바이블&where[type]=BOOK&where[isNew]=true
     *
     *    where[type]=BOOK
     *    where[isNew]=true
     *    where[name]=린 스타트업 바이블
     */
    where?: Partial<Entity>;

    /**
     * Swagger 에서 명세하지 않고 있으나,
     * Product 리포지토리의 findAndCount 에서 동작하는 order 구문을
     * client 에서 자유롭게 자유롭게 구성할 수 있습니다.
     *
     * @example
     *
     *  #1) 상품 전체를 등록일 기준 최신순 정렬
     *  * 참고로 최신순정렬은 id:desc 가 가장 응답이 빠릅니다.
     *  /products?order[createdAt]=DESC
     *
     *    order[createdAt]=DESC
     *
     *  #2) 도서상품을 판매상태별로 정렬 후, 결과 내에서 도서명 오름차순 정렬
     *  /products?where[type]=BOOK&order[createdAt]=DESC&order[name]=ASC
     *
     *    where[type]=BOOK
     *    order[status]=ASC
     *    order[name]=ASC
     *
     *  #3) 일반상품을 업체별로 정렬 후, 결과 내에서 상품의 등록일 최신순으로 재정렬
     *  /products?where[type]=GENERAL&order[companyId]=ASC&order[createdAt]=DESC
     *
     *    where[type]=GENERAL
     *    order[companyId]=ASC
     *    order[createdAt]=DESC
     */
    order?: {[P in keyof Entity]?: 'ASC' | 'DESC'};
}
