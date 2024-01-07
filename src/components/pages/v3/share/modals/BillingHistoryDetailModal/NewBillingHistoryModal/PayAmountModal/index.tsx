import React, {memo, useEffect} from 'react';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {
    abroadPayAmount,
    createBillingHistoryAtom,
    domesticPayAmount,
    payAmountModalState,
} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/atoms';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useResetRecoilState, useSetRecoilState} from 'recoil';
import {selectedCurrencyState} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {PayAmountModalTitle} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/PayAmountModal/PayAmountModalTitle';
import {DomesticPayAmountInput} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/PayAmountModal/DomesticPayAmountInput';
import {CTAButton} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/PayAmountModal/CTAButton';
import {AbroadPayAmountSection} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/PayAmountModal/AbroadPayAmountSection';
import {useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';

export const PayAmountModal = memo(() => {
    const {Modal, isShow, close} = useModal(payAmountModalState);
    const resetSelectedCurrency = useResetRecoilState(selectedCurrencyState);
    const setCreateBillingHistory = useSetRecoilState(createBillingHistoryAtom);
    const resetDomesticPayAmount = useResetRecoilState(domesticPayAmount);
    const resetAbroadPayAmount = useResetRecoilState(abroadPayAmount);
    const {currentSubscription} = useCurrentSubscription();

    useEffect(() => {
        resetAbroadPayAmount();
        resetSelectedCurrency();
        resetDomesticPayAmount();
        setCreateBillingHistory((prev) => ({...prev, isDomestic: true}));
    }, [isShow]);

    return (
        <>
            <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
                <ModalTopbar
                    backBtnOnClick={close}
                    topbarPosition="sticky"
                    title={currentSubscription?.product.nameKo || '결제 내역 추가'}
                />
                <MobileSection.Padding>
                    <PayAmountModalTitle />
                    <section className="flex flex-col gap-5">
                        {/*국내 결제 금액*/}
                        <DomesticPayAmountInput />

                        {/*해외 결제 금액*/}
                        <AbroadPayAmountSection />
                    </section>
                </MobileSection.Padding>

                <ModalLikeBottomBar className="left-0">
                    <CTAButton />
                </ModalLikeBottomBar>
            </Modal>

            {/*더 상위인 BillingHistoryDetailModal 로 이동*/}
            {/*EditBillingHistory 에서도 쓰이기 때문*/}
            {/*<AbroadPayAmountCurrencyModal />*/}
        </>
    );
});
