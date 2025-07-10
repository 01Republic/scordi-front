import {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {FindAllProductSimilarNameQuery, ProductSimilarNameDto} from '^models/ProductSimilarName/type';
import {productSimilarNameApi} from '^models/ProductSimilarName/api';
import {Paginated} from '^types/utils/paginated.dto';
import {usePaginateUtils} from '^hooks/usePagedResource';
import {ErrorResponse} from '^models/User/types';
import {UpdateProductSimilarNameRequestDto} from '^models/ProductSimilarName/type/UpdateProductSimilarName.request.dto';
import {CreateProductSimilarNameRequestDto} from '^models/ProductSimilarName/type/CreateProductSimilarName.request.dto';

export const useProductSimilarNameList = (params: FindAllProductSimilarNameQuery) => {
    const [query, setQuery] = useState(params);

    const queryResult = useQuery({
        queryKey: ['productSimilarName', query],
        queryFn: async () => {
            return productSimilarNameApi.index(query).then((res) => res.data);
        },
        initialData: Paginated.init(),
        refetchOnWindowFocus: false,
    });

    return usePaginateUtils({query, setQuery, queryResult});
};

export const useCreateProductSimilarName = () => {
    const queryClient = useQueryClient();
    return useMutation<ProductSimilarNameDto, ErrorResponse, CreateProductSimilarNameRequestDto>({
        mutationFn: (data) => productSimilarNameApi.create(data).then((response) => response.data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['productSimilarName']});
        },
    });
};

export const useUpdateProductSimilarName = () => {
    const queryClient = useQueryClient();
    return useMutation<ProductSimilarNameDto, ErrorResponse, {id: number; data: UpdateProductSimilarNameRequestDto}>({
        mutationFn: ({id, data}) => productSimilarNameApi.update(id, data).then((response) => response.data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['productSimilarName']});
        },
    });
};
