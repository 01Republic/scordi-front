import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {codefAccountApi} from '^models/CodefAccount/api';
import {RequiredProp} from '^utils/type/required-prop';
import {ApiError} from '^api/api';
import {plainToInstance} from 'class-transformer';
import {useQueryClient} from '@tanstack/react-query';

export class CodefAccountFetchCardsResult {
    codefAccount: RequiredProp<CodefAccountDto, 'codefCards'>;
    error?: ApiError;
}

// @public hook
export const useCodefAccountFetchCardsResult = () => {
    const queryClient = useQueryClient();
    const fetch = (codefAccount: CodefAccountDto) => {
        return queryClient.fetchQuery({
            queryKey: ['fetchCodefCardsByAccountQuery', codefAccount.orgId, codefAccount.id],
            queryFn: () => fetchCodefCardsByAccountInSafe(codefAccount),
        });
    };

    return {fetch};
};

// @public func
export const fetchCodefCardsByAccountInSafe = (codefAccount: CodefAccountDto) => {
    // 먼저 코드에프 조회와 함께 카드목록을 불러와보고
    return (
        _fetchCardsWithSync(codefAccount)
            // 문제가 없으면 그대로 계정과 카드를 반환한다.
            .then((res) => {
                codefAccount.codefCards = res.data.items;
                return plainToInstance(CodefAccountFetchCardsResult, {codefAccount});
            })
            // 계정조회에 문제가 있으면 기존에 저장된 카드만 다시 불러오고,
            // 에러를 함께 담아 반환한다.
            .catch(async (error: ApiError) => {
                codefAccount.codefCards = await _fetchCardsWithoutSync(codefAccount).then((res) => res.data.items);
                return plainToInstance(CodefAccountFetchCardsResult, {codefAccount, error});
            })
    );
};

// @private
function _fetchCardsWithSync(codefAccount: CodefAccountDto) {
    const {orgId, id} = codefAccount;
    return codefAccountApi.findCards(orgId, id, {
        where: {accountId: id, isSleep: false},
        itemsPerPage: 0,
        sync: true,
    });
}

// @private
function _fetchCardsWithoutSync(codefAccount: CodefAccountDto) {
    const {orgId, id} = codefAccount;
    return codefAccountApi.findCards(orgId, id, {
        where: {accountId: id, isSleep: false},
        itemsPerPage: 0,
        // sync: false,
    });
}
