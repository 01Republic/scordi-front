import {ProductDto, FindAllProductQuery} from '^types/product.type';

export interface ColumnProps {
    prototype: ProductDto;
    fetchData?: (params: FindAllProductQuery) => any;
}
