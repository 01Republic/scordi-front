import {useRecoilState} from 'recoil';
import {useQuery} from '@tanstack/react-query';
import {adminCodefBankAccountParserApi} from '^models/_codef/CodefBankAccountParser/api';
import {codefBankAccountParserAtom} from '^admin/factories/codef-bank-account-parsers/atoms';

export const useCodefBankAccountParser = (id: number) => {
    return useQuery({
        queryKey: ['codef-bank-account-parser', id],
        queryFn: () => adminCodefBankAccountParserApi.show(id).then((res) => res.data),
    });
};

export const useCurrentBankAccountParser = () => {
    return useRecoilState(codefBankAccountParserAtom);
};
