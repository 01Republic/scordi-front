import React, {memo, useEffect} from 'react';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {
    createBillingHistoryAtom,
    payAmountModalState,
} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/atoms';
import {useBillingHistoryInModal} from '^v3/share/modals/BillingHistoryDetailModal/hook';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useRecoilState, useResetRecoilState, useSetRecoilState} from 'recoil';
import {selectedCurrencyState} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {AbroadPayAmountCurrencyModal} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/PayAmountModal/AbroadPayAmountCurrencyModal';
import {PayAmountModalTitle} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/PayAmountModal/PayAmountModalTitle';
import {DomesticPayAmountInput} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/PayAmountModal/DomesticPayAmountInput';
import {DomesticSelect} from 'src/components/pages/v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/PayAmountModal/AbroadPayAmountSection/DomesticSelect';
import {AbroadPayAmount} from 'src/components/pages/v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/PayAmountModal/AbroadPayAmountSection/AbroadPayAmount';
import {CTAButton} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/PayAmountModal/CTAButton';
import {AbroadPayAmountSection} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/PayAmountModal/AbroadPayAmountSection';

export const PayAmountModal = memo(() => {
    const {Modal, isShow, close} = useModal(payAmountModalState);
    const {billingHistory} = useBillingHistoryInModal();
    const resetSelectedCurrency = useResetRecoilState(selectedCurrencyState);
    const setCreateBillingHistory = useSetRecoilState(createBillingHistoryAtom);

    useEffect(() => {
        resetSelectedCurrency();
        setCreateBillingHistory((prev) => ({...prev, isDomestic: true}));
    }, [isShow]);

    return (
        <>
            <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
                <ModalTopbar
                    backBtnOnClick={close}
                    topbarPosition="sticky"
                    title={billingHistory ? billingHistory.pageSubject : '결제 내역 등록'}
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

            <AbroadPayAmountCurrencyModal />
        </>
    );
});
