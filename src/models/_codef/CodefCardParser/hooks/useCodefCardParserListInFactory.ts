import {useQuery} from '@tanstack/react-query';
import {Paginated} from '^types/utils/paginated.dto';
import {CodefCardParserDtoInFactory} from '^models/_codef/CodefCardParser/type/CodefCardParser.dto';
import {adminCodefCardParserApi} from '^models/_codef/CodefCardParser/api';

export const useCodefCardParserListInFactory = () => {
    return useQuery({
        queryFn: () =>
            adminCodefCardParserApi
                .index({
                    relations: ['product'],
                    order: {productId: 'DESC', id: 'DESC'},
                    itemsPerPage: 0,
                })
                .then((res) => {
                    return res.data as Paginated<CodefCardParserDtoInFactory>;
                }),
        queryKey: ['CodefCardParserListPage.parsers'],
        initialData: Paginated.init(),
    });
};
