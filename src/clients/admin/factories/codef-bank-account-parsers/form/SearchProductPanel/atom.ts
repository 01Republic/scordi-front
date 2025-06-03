import {FindAllProductQuery, ProductDto} from '^models/Product/type';
import {pagedResourceAtom} from '^hooks/usePagedResource';

export const searchProductResultsAtom = pagedResourceAtom<ProductDto, FindAllProductQuery>({
    key: 'codef-bank-account-parser/form/searchProductsAtom',
});
