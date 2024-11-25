import {atom} from 'recoil';
import {useState} from 'react';
import {ProductDto} from '^models/Product/type';
import {productApi} from '^models/Product/api';
import {paginatedDtoOf} from '^types/utils/response-of';
import {errorToast} from '^api/api';
import {FindOptionsWhere} from '^types/utils/find-options';
import {debounce} from 'lodash';

export const isSubmitBlockedAtom = atom({
    key: 'ProductForm/isSubmitBlockedAtom',
    default: false,
});

export const useSearchDuplicatedProducts = () => {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<ProductDto[]>([]);

    const search = debounce((text: string, where: FindOptionsWhere<ProductDto>) => {
        setValue(text);
        if (!text.length) return setProducts([]);

        setIsLoading(true);
        productApi
            .index({
                where,
                itemsPerPage: 0,
            })
            .then(paginatedDtoOf(ProductDto))
            .then((res) => setProducts(res.data.items))
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    }, 500);

    return {
        value,
        search,
        isLoading,
        products,
    };
};
