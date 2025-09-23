import {useQuery} from '@tanstack/react-query';
import {gmailInvoiceParsersAdminApi} from '^models/EmailParser/api';
import {Paginated} from '^types/utils/paginated.dto';
import {EmailParserDtoInFactory} from '^models/EmailParser/types';

export const useEmailParserListInFactory = () => {
    return useQuery({
        queryFn: () =>
            gmailInvoiceParsersAdminApi
                .index({
                    relations: ['product'],
                    order: {productId: 'DESC', id: 'DESC'},
                    itemsPerPage: 0,
                })
                .then((res) => {
                    return res.data as Paginated<EmailParserDtoInFactory>;
                }),
        queryKey: ['EmailParserListPage.parsers'],
        initialData: Paginated.init(),
    });
};
