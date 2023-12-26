import React, {memo} from 'react';
import {
    AddBillingHistory,
    addBillingHistoryShowModal,
    AddBillingHistoryState,
} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {useBillingHistoryInModal} from '^v3/share/modals/BillingHistoryDetailModal/hook';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {PayMethodBody} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/bodys/PayMethodBody';
import {useRecoilValue} from 'recoil';
import {inputCardNumberModal} from '^v3/V3OrgCardListPage/modals/CardNumberModal/atom';

export const AddBillingHistoryModal = memo(() => {
    const {Modal, close} = useModal(addBillingHistoryShowModal);
    const {billingHistory} = useBillingHistoryInModal();
    const addBillingHistoryState = useRecoilValue(AddBillingHistoryState);

    const onBack = () => {
        close();
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar
                backBtnOnClick={onBack}
                topbarPosition="sticky"
                title={billingHistory ? billingHistory.pageSubject : '결제 내역 등록'}
            />

            <MobileSection.Padding>
                <h2 className="h1 leading-tight mb-10">
                    새로운 결제 내역을 <br />
                    등록합니다
                </h2>
                {addBillingHistoryState === AddBillingHistory.PayMethod && <PayMethodBody />}
                {/*{addBillingHistoryState === AddBillingHistory.Account && <PayMethodBody />}*/}
                {/*{addBillingHistoryState === AddBillingHistory.DetailInfo && <PayMethodBody />}*/}
            </MobileSection.Padding>
        </Modal>
    );
});
