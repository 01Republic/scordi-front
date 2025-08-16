import {useQuery} from '@tanstack/react-query';
import {Paginated} from '^types/utils/paginated.dto';
import {EmailParserDtoInFactory} from '^models/EmailParser/types';
import {gmailInvoiceParsersAdminApi} from '^models/EmailParser/api';

export const useEmailParserVersionsInFactory = (productId?: number | null) => {
    return useQuery({
        queryKey: ['useEmailParserVersionsInFactory', productId],
        queryFn: () =>
            gmailInvoiceParsersAdminApi.index({}).then((res) => {
                return res.data as Paginated<EmailParserDtoInFactory>;
            }),
        initialData: Paginated.init(),
        enabled: !!productId,
    });
};
