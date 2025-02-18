import {useRecoilValue} from 'recoil';
import {selectedInvoiceAccountAtom} from '../atoms';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {GmailMessageListFetchParamQueryDto} from '^models/InvoiceAccount/type/invoiceAccountGmailTextApi.type';
import {useQuery} from '@tanstack/react-query';
import {invoiceAccountGmailTestApi} from '^models/InvoiceAccount/api';

export const useDraftInboxController = () => {
    const selectedInvoiceAccount = useRecoilValue(selectedInvoiceAccountAtom);
    const invoiceAccountId = selectedInvoiceAccount?.id;
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
