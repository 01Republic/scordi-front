import {useQuery} from '@tanstack/react-query';
import {Paginated} from '^types/utils/paginated.dto';
import {adminCodefCardParserApi} from '^models/_codef/CodefCardParser/api';
import {CodefCardParserDtoInFactory} from '^models/_codef/CodefCardParser/type';

export const useCodefCardParserVersionsInFactory = (productId?: number | null) => {
    return useQuery({
        queryKey: ['useCodefCardParserVersionsInFactory', productId],
        queryFn: () =>
            adminCodefCardParserApi
                .index({
                    relations: ['product'],
                    where: productId ? {productId: productId} : {},
                    order: {productId: 'DESC', id: 'DESC'},
                    itemsPerPage: 0,
                })
                .then((res) => {
                    return res.data as Paginated<CodefCardParserDtoInFactory>;
                }),
        initialData: Paginated.init(),
        enabled: !!productId,
    });
};
