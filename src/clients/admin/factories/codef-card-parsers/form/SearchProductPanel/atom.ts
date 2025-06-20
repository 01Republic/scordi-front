import {atom} from 'recoil';
import {FindAllProductQuery, ProductDto} from '^models/Product/type';
import {pagedResourceAtom, PagedResourceAtoms} from '^hooks/usePagedResource';

export const searchProductResultsAtom = pagedResourceAtom<ProductDto, FindAllProductQuery>({
    key: 'codef-card-parser/form/searchProductsAtom',
});
