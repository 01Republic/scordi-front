import {useQueries} from '@tanstack/react-query';
import {NonNullableProp} from '^utils/type/required-prop';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {codefBankAccountApi} from '^models/CodefBankAccount/api';
import {codefCardApi} from '^models/CodefCard/api';
import {bankAccountApi} from '^models/BankAccount/api';
import {creditCardApi} from '^models/CreditCard/api';

/**
 * 코드에프 자산으로부터 스코디 자산 등록 및 구독 불러오기
 * ---
 * @param orgId
 * @param codefAsset
 */
async function syncCodefAsset(orgId: number, codefAsset: CodefBankAccountDto | CodefCardDto) {
    if (codefAsset instanceof CodefBankAccountDto) {
        // 1) 스코디 계좌 생성 + 거래내역 불러오기 + 구독 파싱
        return (
            codefBankAccountApi
                .histories(orgId, codefAsset.id, {sync: true})
                // 2) 업데이트된 코드에프 계좌 객체 조회 (스코디 계좌 ID 획득)
                .then(() => codefBankAccountApi.show(orgId, codefAsset.id))
                .then((res) => res.data as NonNullableProp<CodefBankAccountDto, 'bankAccountId'>)
                // 3) 생성된 스코디 계좌 조회
                .then((codefBankAccount) => bankAccountApi.show(orgId, codefBankAccount.bankAccountId))
                .then((res) => res.data)
        );
    } else {
        // 1) 스코디 카드 생성 + 거래내역 불러오기 + 구독 파싱
        return (
            codefCardApi
                .histories(orgId, codefAsset.id, {sync: true})
                // 2) 업데이트된 코드에프 카드 객체 조회 (스코디 카드 ID 획득)
                .then(() => codefCardApi.show(orgId, codefAsset.id))
                .then((res) => res.data as NonNullableProp<CodefCardDto, 'creditCardId'>)
                // 3) 생성된 스코디 카드 조회
                .then((codefCard) => creditCardApi.show(orgId, codefCard.creditCardId))
                .then((res) => res.data)
        );
    }
}

/** 구독불러오기까지 실행 */
export function useSyncCodefAssets(orgId: number, codefAssets: (CodefBankAccountDto | CodefCardDto)[]) {
    return useQueries({
        queries: codefAssets.map((codefAsset) => {
            const modelName = codefAsset instanceof CodefBankAccountDto ? 'CodefBankAccount' : 'CodefCard';

            return {
                queryKey: ['useSyncCodeAssets', orgId, modelName, codefAsset.id],
                queryFn: () => syncCodefAsset(orgId, codefAsset),
                retry: 0,
                enabled: !!orgId && !isNaN(orgId),
            };
        }),
    });
}
