import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useQuery} from '@tanstack/react-query';
import {invoiceAccountGmailTestApi} from '^models/InvoiceAccount/api';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {GmailMessageListFetchParamQueryDto} from '^models/InvoiceAccount/type/invoiceAccountGmailTextApi.type';

export const useDraftInboxController = (invoiceAccount?: InvoiceAccountDto) => {
    const invoiceAccountId = invoiceAccount?.id;
    const [pageTokens, setPageTokens] = useState<string[]>(['']);
    const form = useForm<GmailMessageListFetchParamQueryDto>({
        defaultValues: {
            maxResults: 20,
            readable: true,
            pageToken: '',
        },
    });
    const params = form.watch();

    const {data, isLoading, isFetching, refetch} = useQuery({
        queryKey: ['DraftInboxContent.index', invoiceAccountId, params],
        queryFn: () => invoiceAccountGmailTestApi.index(invoiceAccountId!, params),
        enabled: !!invoiceAccountId,
    });

    return {
        data,
        isLoading,
        isFetching,
        refetch,
        form,
        pageTokens,
        setPageTokens,
    };
};
