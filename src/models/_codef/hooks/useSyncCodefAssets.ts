import {useQueries, useQuery} from '@tanstack/react-query';
import {NonNullableProp} from '^utils/type/required-prop';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {codefBankAccountApi} from '^models/CodefBankAccount/api';
import {codefCardApi} from '^models/CodefCard/api';
import {bankAccountApi} from '^models/BankAccount/api';
import {creditCardApi} from '^models/CreditCard/api';
import {groupBy} from 'lodash';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {allSettled} from '^utils/array';
import {errorToast} from '^api/api';

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
    const bankIds = codefAssets
        .filter((codefBankAccounts) => codefBankAccounts instanceof CodefBankAccountDto)
        .map((codefBankAccount) => codefBankAccount.id);

    const cardIds = codefAssets //
        .filter((codefCards) => codefCards instanceof CodefCardDto)
        .map((codefCard) => codefCard.id);

    const bankPatchedRef = useRef(false);
    const cardPatchedRef = useRef(false);

    const [startedBankIds, setStartedBankIds] = useState<number[]>([]);
    const [startedCardIds, setStartedCardIds] = useState<number[]>([]);
    const [notStartedBankIds, setNotStartedBankIds] = useState<number[]>(bankIds);
    const [notStartedCardIds, setNotStartedCardIds] = useState<number[]>(cardIds);

    const groupedByCompany = groupBy(codefAssets, (asset: CodefBankAccountDto | CodefCardDto) => asset.company?.param);

    const results = useQueries({
        queries: Object.entries(groupedByCompany).map(([company, assets]) => {
            return {
                queryKey: ['useSyncCodeAssets', orgId, company],
                queryFn: async () => {
                    const results = [];

                    for (const asset of assets) {
                        if (asset instanceof CodefBankAccountDto) {
                            setStartedBankIds((prev) => [...prev, asset.id]);
                            setNotStartedBankIds((prev) => prev.filter((id) => id !== asset.id));
                        } else {
                            setStartedCardIds((prev) => [...prev, asset.id]);
                            setNotStartedCardIds((prev) => prev.filter((id) => id !== asset.id));
                        }

                        results.push(await syncCodefAsset(orgId, asset));
                    }
                    return results;
                },
                retry: 0,
                enabled: !!orgId && !isNaN(orgId),
            };
        }),
    });

    useEffect(() => {
        if (bankPatchedRef.current) return;
        if (bankIds.length === 0) return;
        if (notStartedBankIds.length !== 0) return;

        bankPatchedRef.current = true;
        codefBankAccountApi
            .patchFinalHistories(orgId, {})
            .then(() => {
                setNotStartedBankIds([]);
                setStartedBankIds([]);
            })
            .catch(errorToast);
    }, [orgId, bankIds.length, notStartedBankIds.length]);

    useEffect(() => {
        if (cardPatchedRef.current) return;
        if (cardIds.length === 0) return;
        if (notStartedCardIds.length !== 0) return;

        cardPatchedRef.current = true;
        codefCardApi
            .patchFinalHistories(orgId, {})
            .then(() => {
                setNotStartedCardIds([]);
                setStartedCardIds([]);
            })
            .catch(errorToast);
    }, [orgId, cardIds.length, notStartedCardIds.length]);

    return {results, notStartedBankIds, notStartedCardIds, startedBankIds, startedCardIds};
}
