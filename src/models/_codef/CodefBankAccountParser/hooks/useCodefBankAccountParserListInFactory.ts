import {useQuery} from '@tanstack/react-query';
import {Paginated} from '^types/utils/paginated.dto';
import {CodefBankAccountParserDtoInFactory} from '^models/_codef/CodefBankAccountParser/type';
import {adminCodefBankAccountParserApi} from '^models/_codef/CodefBankAccountParser/api';

export const useCodefBankAccountParserListInFactory = () => {
    return useQuery({
        queryFn: () =>
            adminCodefBankAccountParserApi
                .index({
                    relations: ['product'],
                    order: {productId: 'DESC', id: 'DESC'},
                    itemsPerPage: 0,
                })
                .then((res) => {
                    return res.data as Paginated<CodefBankAccountParserDtoInFactory>;
                }),
        queryKey: ['CodefBankAccountParserListPage.parsers'],
        initialData: Paginated.init(),
    });
};
