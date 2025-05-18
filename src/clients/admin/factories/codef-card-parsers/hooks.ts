import {useQuery, useQueryClient} from '@tanstack/react-query';
import {adminCodefCardParserApi} from '^models/_codef/CodefCardParser/api';
import {productApi} from '^models/Product/api';
import {FindAllProductQuery} from '^models/Product/type';
import {Paginated} from '^types/utils/paginated.dto';
import {CodefCardParserDto} from '^models/_codef/CodefCardParser/type/CodefCardParser.dto';
import {useIdParam} from '^atoms/common';
import {useRecoilState} from 'recoil';
import {codefCardParserAtom} from '^admin/factories/codef-card-parsers/atoms';
import {useState} from 'react';
import {useProductsV3} from '^models/Product/hook';
import {errorToast} from '^api/api';
import {usePagedResource} from '^hooks/usePagedResource';
import {searchProductResultsAtom} from '^admin/factories/codef-card-parsers/form/SearchProductPanel/atom';

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
    // const queryClient = useQueryClient();
    //
    // const search = (keyword: string = '', id?: number) => {
    //     const params: FindAllProductQuery = {
    //         where: {id},
    //         keyword: encodeURI(keyword),
    //         order: {id: 'DESC'},
    //         itemsPerPage: 0,
    //     };
    //
    //     return queryClient.fetchQuery({
    //         queryKey: ['codef-card-parser-product-search', params, id],
    //         queryFn: () => {
    //             return productApi.index(params).then((res) => res.data);
    //         },
    //         initialData: Paginated.init(),
    //     });
    // }

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

    // const [isLoading, setIsLoading] = useState(false);
    // const search = (keyword: string = '', id?: number) => {
    //     setIsLoading(true);
    //     return productApi.index(params)
    //         .then((res) => res.data)
    //         .catch(errorToast)
    //         .finally(() => setIsLoading(false));
    // };

    // return {search}
};

export const useSearchProduct = () =>
    usePagedResource(searchProductResultsAtom, {
        getId: 'id',
        endpoint: (params) => productApi.index(params),
        buildQuery: (params) => params,
    });
