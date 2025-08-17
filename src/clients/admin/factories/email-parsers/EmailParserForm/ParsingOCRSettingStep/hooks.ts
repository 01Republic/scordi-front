import {useState} from 'react';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {fetchAttachmentFiles, FindAllGmailItemQueryDto, GmailItemDto} from '^models/InvoiceAccount/type';
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

    const infiniteQuery = useInfiniteQuery({
        queryKey: ['ParsingOCRSettingStep.useInfiniteQuery', 'emailItems', params],
        queryFn: async ({pageParam = 1}) =>
            invoiceAccountEmailItemsForAdminApi.index({...params, page: pageParam}).then((res) => res.data),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const totalPage = lastPage.pagination.totalPage;
            const nextPage = lastPage.pagination.currentPage + 1;
            return nextPage <= totalPage ? nextPage : undefined;
        },
        getPreviousPageParam: (firstPage) => {
            const prevPage = firstPage.pagination.currentPage - 1;
            return prevPage > 0 ? prevPage : undefined;
        },
        enabled: !!filterQuery,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    // const {data, refetch, isFetching} = useQuery({
    //     queryKey: ['ParsingOCRSettingStep', 'emailItems', params],
    //     queryFn: async () => invoiceAccountEmailItemsForAdminApi.index(params).then((res) => res.data),
    //     initialData: Paginated.init(),
    //     refetchOnMount: false,
    //     retryOnMount: false,
    //     refetchOnReconnect: false,
    //     refetchOnWindowFocus: false,
    // });
    const pages = infiniteQuery.data?.pages || [];
    const pagination = pages[pages.length - 1]?.pagination || Paginated.init().pagination;

    return {
        params,
        setParams,
        ...infiniteQuery,
        emails: pages.map((page) => page.items).flat(),
        pages,
        pagination,
    };
};

export const useFocusedEmailItem = (emails: GmailItemDto[]) => {
    const [focusedIndex, setFocusedIndex] = useState(0);

    const email = emails[focusedIndex];
    const {data: html = ''} = useEmailHtml(email?.contentUrl);
    const {data: attachments = []} = useEmailAttachments(email);

    return {
        focusedIndex,
        setFocusedIndex,
        email,
        html,
        attachments,
    };
};

export function useEmailHtml(contentUrl?: string) {
    return useQuery({
        queryKey: ['Fetch email content html', contentUrl],
        queryFn: () => GmailItemDto.loadContent(contentUrl).then((data) => data || ''),
        placeholderData: (prev) => prev,
        enabled: !!contentUrl,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}

export function useEmailAttachments(email?: GmailItemDto) {
    const attachments = email?.attachments || [];
    return useQuery({
        queryKey: ['Fetch email attachments', email?.id],
        queryFn: () => fetchAttachmentFiles(attachments).then((data) => data || []),
        placeholderData: (prev) => prev,
        enabled: !!email,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}
