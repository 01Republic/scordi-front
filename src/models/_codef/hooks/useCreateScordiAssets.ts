import {useQueries} from '@tanstack/react-query';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {codefBankAccountApi} from '^models/CodefBankAccount/api';
import {bankAccountApi} from '^models/BankAccount/api';
import {NonNullableProp} from '^utils/type/required-prop';
import {codefCardApi} from '^models/CodefCard/api';
import {creditCardApi} from '^models/CreditCard/api';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {errorToast} from '^api/api';

/**
 * 코드에프 자산으로부터 스코디 자산 등록
 * ---
 * @param orgId
 * @param codefAsset
 */
export async function createScordiAsset(orgId: number, codefAsset: CodefBankAccountDto | CodefCardDto) {
    if (codefAsset instanceof CodefBankAccountDto) {
        // 1) 거래내역 불러오기
        return (
            codefBankAccountApi
                .patchHistories(orgId, codefAsset.id)
                // 2) 스코디 계좌 생성
                .then(() => codefBankAccountApi.createBankAccount(orgId, codefAsset.id))
                .then((res) => res.data as NonNullableProp<CodefBankAccountDto, 'bankAccountId'>)
                .then((codefBankAccount) => bankAccountApi.show(orgId, codefBankAccount.bankAccountId))
                .then((res) => res.data)
        );
    } else {
        // 1) 거래내역 불러오기
        return (
            codefCardApi
                .patchHistories(orgId, codefAsset.id)
                // 2) 스코디 카드 생성
                .then(() => codefCardApi.createCreditCard(orgId, codefAsset.id))
                .then((res) => res.data as NonNullableProp<CodefCardDto, 'creditCardId'>)
                .then((codefCard) => creditCardApi.show(orgId, codefCard.creditCardId))
                .then((res) => res.data)
        );
    }
}

/** 스코디 자산 등록만 실행 (거래내역 불러오기는 포함) */
export function useCreateAssets(orgId: number, codefAssets: (CodefBankAccountDto | CodefCardDto)[]) {
    const bankIds = codefAssets
        .filter((codefBankAccounts) => codefBankAccounts instanceof CodefBankAccountDto)
        .map((codefBankAccount) => codefBankAccount.id);

    const cardIds = codefAssets //
        .filter((codefCards) => codefCards instanceof CodefCardDto)
        .map((codefCard) => codefCard.id);

    const [startedBankIds, setStartedBankIds] = useState<number[]>([]);
    const [startedCardIds, setStartedCardIds] = useState<number[]>([]);
    const [notStartedBankIds, setNotStartedBankIds] = useState<number[]>(bankIds);
    const [notStartedCardIds, setNotStartedCardIds] = useState<number[]>(cardIds);

    const results = useQueries({
        queries: codefAssets.map((codefAsset) => {
            const modelName = codefAsset instanceof CodefBankAccountDto ? 'CodefBankAccount' : 'CodefCard';
            const codefAssetId = codefAsset.id;

            return {
                queryKey: ['useCreateAssets', orgId, modelName, codefAssetId],
                queryFn: async () => {
                    if (codefAsset instanceof CodefBankAccountDto) {
                        setStartedBankIds((prev) => [...prev, codefAssetId]);
                        setNotStartedBankIds((prev) => prev.filter((id) => id !== codefAssetId));
                    } else {
                        setStartedCardIds((prev) => [...prev, codefAssetId]);
                        setNotStartedCardIds((prev) => prev.filter((id) => id !== codefAssetId));
                    }

                    return createScordiAsset(orgId, codefAsset);
                },
                retry: 0,
                enabled: !!orgId && !isNaN(orgId),
            };
        }),
    });

    useEffect(() => {
        if (bankIds.length === 0) return;
        if (notStartedBankIds.length !== 0) return;
        codefBankAccountApi
            .patchFinalHistories(orgId, {})
            .then(() => {
                setNotStartedBankIds([]);
                setStartedBankIds([]);
            })
            .catch(errorToast);
    }, [bankIds]);

    useEffect(() => {
        if (cardIds.length === 0) return;
        if (notStartedCardIds.length !== 0) return;
        codefCardApi
            .patchFinalHistories(orgId, {})
            .then(() => {
                setNotStartedCardIds([]);
                setStartedCardIds([]);
            })
            .catch(errorToast);
    }, [cardIds]);

    return {results, notStartedBankIds, notStartedCardIds, startedBankIds, startedCardIds};
}
