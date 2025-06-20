import {useState} from 'react';
import {
    FindOperatorType,
    FindOperatorUnitDto,
} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateCodefParserDto';
import {codefParserFactoryApi} from '^admin/factories/codef-parser-factories/CodefParserFactory/api';
import {CodefBillingHistoryDto, FindAllCodefBillingHistoryQueryDto} from '^models/CodefBillingHistory/type';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {getLikeQueryString} from '^admin/factories/codef-parser-factories/form/share/get-like-query-string';

/**
 * 계좌파서 > 입출금내역 조회
 */
export function useSearchCodefBillingHistories() {
    const [isLoading, setIsLoading] = useState(false);
    const [codefBillingHistories, setCodefBillingHistories] = useState<CodefBillingHistoryDto[]>([]);

    const search = (params: FindOperatorUnitDto, codefBankAccount?: CodefBankAccountDto) => {
        const {ops = FindOperatorType.Like, fo = false, bo = false, value = ''} = params;
        if (!codefBankAccount && !value) {
            setCodefBillingHistories([]);
            return;
        }

        setIsLoading(true);
        const query = {} as FindAllCodefBillingHistoryQueryDto;
        query.where = {
            codefBankAccountId: {op: 'not', val: 'NULL'},
            // resAccountOut: {op: 'mt', val: 0}, // 수입 빼고 지출만 조회
        };
        if (codefBankAccount) query.where.codefBankAccountId = codefBankAccount.id;
        query.find = {ops, value: getLikeQueryString(fo, bo, value)};
        codefParserFactoryApi
            .searchCodefBillingHistories(query)
            .then((res) => setCodefBillingHistories(res.data))
            .finally(() => setIsLoading(false));
    };

    return {
        isLoading,
        codefBillingHistories,
        search,
    };
}
