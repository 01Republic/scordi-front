import React, {memo, useEffect} from 'react';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {
    abroadPayAmount,
    createBillingHistoryAtom,
    domesticPayAmount,
    payAmountModalState,
} from '^v3/share/modals/NewBillingHistoryModal/atoms';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useResetRecoilState, useSetRecoilState} from 'recoil';
import {selectedCurrencyState} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {PayAmountModalTitle} from '^v3/share/modals/NewBillingHistoryModal/PayAmountModal/PayAmountModalTitle';
import {DomesticPayAmountInput} from '^v3/share/modals/NewBillingHistoryModal/PayAmountModal/DomesticPayAmountInput';
import {CTAButton} from '^v3/share/modals/NewBillingHistoryModal/PayAmountModal/CTAButton';
import {AbroadPayAmountSection} from '^v3/share/modals/NewBillingHistoryModal/PayAmountModal/AbroadPayAmountSection';
import {useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {FormControlGroup} from '^components/util/form-control/FormControlGroup';

interface PayAmountModalProps {
    onSubmit?: () => any;
}

export const PayAmountModal = memo((props: PayAmountModalProps) => {
    const {Modal, isShow, close} = useModal(payAmountModalState);
    const resetSelectedCurrency = useResetRecoilState(selectedCurrencyState);
    const setCreateBillingHistory = useSetRecoilState(createBillingHistoryAtom);
    const resetDomesticPayAmount = useResetRecoilState(domesticPayAmount);
    const resetAbroadPayAmount = useResetRecoilState(abroadPayAmount);
    const {currentSubscription} = useCurrentSubscription();

    const {onSubmit} = props;

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
                </MobileSection.Padding>
                <MobileSection.Padding>
                    <FormControlGroup>
                        {/*국내 결제 금액*/}
                        <DomesticPayAmountInput />

                        {/*해외 결제 금액*/}
                        <AbroadPayAmountSection />
                    </FormControlGroup>
                </MobileSection.Padding>

                <ModalLikeBottomBar className="left-0">
                    <CTAButton onSubmit={onSubmit} />
                </ModalLikeBottomBar>
            </Modal>

            {/*더 상위인 BillingHistoryDetailModal 로 이동*/}
            {/*EditBillingHistory 에서도 쓰이기 때문*/}
            {/*<AbroadPayAmountCurrencyModal />*/}
        </>
    );
});
