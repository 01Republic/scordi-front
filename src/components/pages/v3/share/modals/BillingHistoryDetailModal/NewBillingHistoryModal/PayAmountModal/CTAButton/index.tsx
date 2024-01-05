import React, {memo} from 'react';
import {toast} from 'react-toastify';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {
    abroadPayAmount,
    billingHistoryIdState,
    createBillingHistoryAtom,
    domesticPayAmount,
    finishModalState,
} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/atoms';
import {appBillingHistoryApi} from '^models/BillingHistory/api';
import {appIdState} from '^v3/V3OrgAppShowPage/atom';
import {useModal} from '^v3/share/modals';
import {CreateMoneyRequestDto, CurrencyCode} from '^types/money.type';
import {selectedCurrencyState} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {useBillingHistoriesV3} from '^models/BillingHistory/hook';
import {NextButtonUI} from '^v3/share/NextButtonUI';
import {debounce} from 'lodash';

export const CTAButton = memo(() => {
    const createBillingHistory = useRecoilValue(createBillingHistoryAtom);
    const appId = useRecoilValue(appIdState);
    const abroadAmount = useRecoilValue(abroadPayAmount);
    const domesticAmount = useRecoilValue(domesticPayAmount);
    const setBillingHistoryId = useSetRecoilState(billingHistoryIdState);
    const selectedCurrency = useRecoilValue(selectedCurrencyState);
    const {open: OpenFinishModal} = useModal(finishModalState);
    const {reload: loadHistories} = useBillingHistoriesV3();

    const isDomestic = createBillingHistory.isDomestic;

    const onAmountChange = () => {
        const exchangeRate = isDomestic ? 1 : domesticAmount / abroadAmount;

        const moneyLike: CreateMoneyRequestDto = {
            text: `${domesticAmount}원`,
            amount: domesticAmount,
            code: CurrencyCode.KRW,
            exchangeRate: exchangeRate,
            exchangedCurrency: isDomestic ? CurrencyCode.KRW : selectedCurrency.label,
        };

        return moneyLike;
    };
    const onClick = debounce(() => {
        const payAmount = onAmountChange();

        if (!appId) return;

        if (!domesticAmount) {
            toast.error('결제한 금액을 입력해주세요');
            return;
        }

        if (!isDomestic && !abroadAmount) {
            toast.error('해외 결제 금액을 입력해주세요');
            return;
        }

        const req = appBillingHistoryApi.createV2(appId, {...createBillingHistory, payAmount: payAmount});

        req.then((res) => {
            setBillingHistoryId(res.data.id);
            OpenFinishModal();
            loadHistories();
        });
    }, 500);

    return (
        <NextButtonUI isActive={!!domesticAmount} onClick={() => onClick()}>
            다음
        </NextButtonUI>
    );
});
