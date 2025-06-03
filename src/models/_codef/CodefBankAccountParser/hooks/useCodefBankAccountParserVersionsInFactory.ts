import {useQuery} from '@tanstack/react-query';
import {Paginated} from '^types/utils/paginated.dto';
import {adminCodefBankAccountParserApi} from '^models/_codef/CodefBankAccountParser/api';
import {CodefBankAccountParserDtoInFactory} from '^models/_codef/CodefBankAccountParser/type';

export const useCodefBankAccountParserVersionsInFactory = (productId?: number | null) => {
    return useQuery({
        queryKey: ['useCodefBankAccountParserVersionsInFactory', productId],
        queryFn: () =>
            adminCodefBankAccountParserApi
                .index({
                    relations: ['product'],
                    where: productId ? {productId: productId} : {},
                    order: {productId: 'DESC', id: 'DESC'},
                    itemsPerPage: 0,
                })
                .then((res) => {
                    return res.data as Paginated<CodefBankAccountParserDtoInFactory>;
                }),
        initialData: Paginated.init(),
        enabled: !!productId,
    });
};
