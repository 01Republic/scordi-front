import {useState} from 'react';
import {
    FindOperatorType,
    FindOperatorUnitDto,
} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateCodefParserDto';
import {codefParserFactoryApi} from '^admin/factories/codef-parser-factories/CodefParserFactory/api';
import {CodefBillingHistoryDto, FindAllCodefBillingHistoryQueryDto} from '^models/CodefBillingHistory/type';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {getLikeQueryString} from '^admin/factories/codef-parser-factories/form/share/get-like-query-string';
import {useQuery} from '@tanstack/react-query';

// TODO: [deprecated] 2025.09.30 일이 지나서 이 주석을 발견하는 사람은 아래 코드를 삭제해도 좋습니다. (이어지는 useSearchCodefBillingHistories 함수는 아래 주석으로된 옛 코드를 react-query 스타일로 리팩토링한 결과이며, 09.30 이후 까지 신규코드 운영에 특별히 문제가 안생긴다면, 신규 코드의 안정성이 검증된 것으로 보고 주석코드는 삭제해도 좋습니다.)
// export function useSearchCodefBillingHistories2() {
//     const [isLoading, setIsLoading] = useState(false);
//     const [codefBillingHistories, setCodefBillingHistories] = useState<CodefBillingHistoryDto[]>([]);
//
//     const search = (params: FindOperatorUnitDto, codefBankAccount?: CodefBankAccountDto) => {
//         const {ops = FindOperatorType.Like, fo = false, bo = false, value = ''} = params;
//         if (!codefBankAccount && !value) {
//             setCodefBillingHistories([]);
//             return;
//         }
//
//         setIsLoading(true);
//         const query = {} as FindAllCodefBillingHistoryQueryDto;
//         query.where = {
//             codefBankAccountId: {op: 'not', val: 'NULL'},
//             // resAccountOut: {op: 'mt', val: 0}, // 수입 빼고 지출만 조회
//         };
//         if (codefBankAccount) query.where.codefBankAccountId = codefBankAccount.id;
//         query.find = {ops, value: getLikeQueryString(fo, bo, value)};
//         codefParserFactoryApi
//             .searchCodefBillingHistories(query)
//             .then((res) => setCodefBillingHistories(res.data))
//             .finally(() => setIsLoading(false));
//     };
//
//     return {
//         isLoading,
//         codefBillingHistories,
//         search,
//     };
// }

// 계좌파서 > 입출금내역 조회
export function useSearchCodefBillingHistories(
    initialParams: FindOperatorUnitDto,
    selectedCodefBankAccount?: CodefBankAccountDto,
) {
    const [params, setQuery] = useState(initialParams);
    const [codefBankAccount, setCodefBankAccount] = useState(selectedCodefBankAccount);
    const queryResult = useQuery({
        queryKey: ['codef-bank-accout-parser.useSearchCodefBillingHistories2', params, codefBankAccount],
        queryFn: async () => {
            const {ops = FindOperatorType.Like, fo = false, bo = false, value = ''} = params;
            const query = {} as FindAllCodefBillingHistoryQueryDto;
            query.where = {codefBankAccountId: {op: 'not', val: 'NULL'}};
            if (codefBankAccount) query.where.codefBankAccountId = codefBankAccount.id;
            query.find = {ops, value: getLikeQueryString(fo, bo, value)};
            return codefParserFactoryApi.searchCodefBillingHistories(query).then((res) => res.data);
        },
        enabled: !!params && !!params.value,
    });

    const search = (params: FindOperatorUnitDto, codefBankAccount?: CodefBankAccountDto) => {
        setQuery(params);
        setCodefBankAccount(codefBankAccount);
    };

    return {
        ...queryResult,
        isLoading: queryResult.isFetching,
        codefBillingHistories: queryResult.data || [],
        search,
    };
}
