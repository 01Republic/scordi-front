import {useQueries} from '@tanstack/react-query';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {codefBankAccountApi} from '^models/CodefBankAccount/api';
import {bankAccountApi} from '^models/BankAccount/api';
import {NonNullableProp} from '^utils/type/required-prop';
import {codefCardApi} from '^models/CodefCard/api';
import {creditCardApi} from '^models/CreditCard/api';

/**
 * 코드에프 자산으로부터 스코디 자산 등록
 * ---
 * @param orgId
 * @param codefAsset
 */
export async function createScordiAsset(orgId: number, codefAsset: CodefBankAccountDto | CodefCardDto) {
    if (codefAsset instanceof CodefBankAccountDto) {
        // 1) 거래내역 불러오기 (완료를 기다리지않음)
        codefBankAccountApi.patchHistories(orgId, codefAsset.id).catch(console.warn);
        // 2) 스코디 계좌 생성
        return codefBankAccountApi
            .createBankAccount(orgId, codefAsset.id)
            .then((res) => res.data as NonNullableProp<CodefBankAccountDto, 'bankAccountId'>)
            .then((codefBankAccount) => bankAccountApi.show(orgId, codefBankAccount.bankAccountId))
            .then((res) => res.data);
    } else {
        // 1) 거래내역 불러오기 (완료를 기다리지않음)
        codefCardApi.patchHistories(orgId, codefAsset.id).catch(console.warn);
        // 2) 스코디 카드 생성
        return codefCardApi
            .createCreditCard(orgId, codefAsset.id)
            .then((res) => res.data as NonNullableProp<CodefCardDto, 'creditCardId'>)
            .then((codefCard) => creditCardApi.show(orgId, codefCard.creditCardId))
            .then((res) => res.data);
    }
}

/** 스코디 자산 등록만 실행 (거래내역 불러오기는 포함) */
export function useCreateAssets(orgId: number, codefAssets: (CodefBankAccountDto | CodefCardDto)[]) {
    return useQueries({
        queries: codefAssets.map((codefAsset) => {
            const modelName = codefAsset instanceof CodefBankAccountDto ? 'CodefBankAccount' : 'CodefCard';

            return {
                queryKey: ['useCreateAssets', orgId, modelName, codefAsset.id],
                queryFn: () => createScordiAsset(orgId, codefAsset),
                retry: 0,
                enabled: !!orgId && !isNaN(orgId),
            };
        }),
    });
}
