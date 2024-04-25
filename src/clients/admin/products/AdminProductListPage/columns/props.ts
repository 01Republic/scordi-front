import {ProductDto, FindAllProductQuery} from '^models/Product/type';

export interface ColumnProps {
    product: ProductDto;
    fetchData?: (params: FindAllProductQuery) => any;
}
