import {useState} from 'react';
import {FindAllGmailItemQueryDto, GmailItemDto} from '^models/InvoiceAccount/type';
import {useQuery} from '@tanstack/react-query';
import {invoiceAccountEmailItemsForAdminApi} from '^models/InvoiceAccount/api';
import {Paginated} from '^types/utils/paginated.dto';

export const useEmailItemsForOCRStep = (filterQuery: string) => {
    const [params, setParams] = useState<FindAllGmailItemQueryDto>({
        relations: ['organization', 'invoiceAccount', 'invoiceAccount.googleTokenData'],
        page: 1,
        itemsPerPage: 200,
        order: {internalDate: 'DESC'},
        filterQuery,
    });

    const {data, refetch, isFetching} = useQuery({
        queryKey: ['ParsingOCRSettingStep', 'emailItems', params],
        queryFn: async () => invoiceAccountEmailItemsForAdminApi.index(params).then((res) => res.data),
        initialData: Paginated.init(),
        refetchOnMount: false,
        retryOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });

    return {
        params,
        setParams,
        data,
        refetch,
        isFetching,
    };
};

export const useFocusedEmailItem = (data: Paginated<GmailItemDto>) => {
    const [focusedIndex, setFocusedIndex] = useState(0);

    const email = data.items[focusedIndex];
    const currentContentUrl = email?.contentUrl;

    const {data: html = ''} = useQuery({
        queryKey: ['Fetch email content html', currentContentUrl],
        queryFn: () => GmailItemDto.loadContent(currentContentUrl).then((data) => data || ''),
        placeholderData: (prev) => prev,
        enabled: !!currentContentUrl,
    });

    return {
        focusedIndex,
        setFocusedIndex,
        email,
        html,
    };
};
