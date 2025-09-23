import {useRecoilState} from 'recoil';
import {useQuery} from '@tanstack/react-query';
import {gmailInvoiceParsersAdminApi} from '^models/EmailParser/api';
import {emailParserAtom} from './atoms';

export const useEmailParser = (id: number) => {
    return useQuery({
        queryKey: ['EmailParserEditPage.show.email-parser', id],
        queryFn: () => gmailInvoiceParsersAdminApi.show(id).then((res) => res.data),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: !!id,
    });
};

export const useCurrentEmailParser = () => {
    return useRecoilState(emailParserAtom);
};
