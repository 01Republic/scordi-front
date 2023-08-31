import {ProductDto, FindAllProductQuery} from '^types/product.type';

export interface ColumnProps {
    product: ProductDto;
    fetchData?: (params: FindAllProductQuery) => any;
}
