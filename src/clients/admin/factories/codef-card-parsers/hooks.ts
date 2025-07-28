import {useQuery} from '@tanstack/react-query';
import {adminCodefCardParserApi} from '^models/_codef/CodefCardParser/api';
import {productApi} from '^models/Product/api';
import {FindAllProductQuery} from '^models/Product/type';
import {Paginated} from '^types/utils/paginated.dto';
import {useRecoilState} from 'recoil';
import {codefCardParserAtom} from '^admin/factories/codef-card-parsers/atoms';

export const useCodefCardParser = (id: number) => {
    return useQuery({
        queryKey: ['codef-card-parser', id],
        queryFn: () => adminCodefCardParserApi.show(id).then((res) => res.data),
    });
};

export const useCurrentCardParser = () => {
    return useRecoilState(codefCardParserAtom);
};

export const useProductSearch = (keyword = '', id?: number) => {
    const params: FindAllProductQuery = {
        where: {id},
        keyword: encodeURI(keyword),
        order: {id: 'DESC'},
        itemsPerPage: 0,
    };

    return useQuery({
        queryKey: ['codef-card-parser-product-search', params],
        queryFn: () => {
            console.log('useProductSearch', params);
            return productApi.index(params).then((res) => res.data);
        },
        initialData: Paginated.init(),
        enabled: !!keyword,
    });
};
