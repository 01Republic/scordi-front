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
import {useRecoilState} from 'recoil';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {AmountBody} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/bodys/AmountBody';
import {DetailInfoBody} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/bodys/DetailInfoBody';
import {useForm} from 'react-hook-form';
import {CreateBillingHistoryRequestDto} from '^models/BillingHistory/type';
import {CurrencySelectModal} from '^v3/share/modals/BillingHistoryDetailModal/CurrencySelectModal';

export const AddBillingHistoryModal = memo(() => {
    const {Modal, close} = useModal(addBillingHistoryShowModal);
    const {billingHistory} = useBillingHistoryInModal();
    const [addBillingHistory, setAddBillingHistory] = useRecoilState(AddBillingHistoryState);
    const form = useForm<CreateBillingHistoryRequestDto>();

    const onClick = () => {
        console.log(1);
        setAddBillingHistory(AddBillingHistory.Amount);
    };
    const onBack = () => {
        close();
    };

    return (
        <>
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
                    <section className="flex flex-col gap-5">
                        {addBillingHistory === AddBillingHistory.PayMethod && <PayMethodBody form={form} />}
                        {addBillingHistory === AddBillingHistory.Amount && <AmountBody form={form} />}
                        {addBillingHistory === AddBillingHistory.DetailInfo && <DetailInfoBody form={form} />}
                    </section>
                </MobileSection.Padding>

                <ModalLikeBottomBar>
                    <button onClick={onClick} className="btn-modal w-full">
                        다음
                    </button>
                </ModalLikeBottomBar>
            </Modal>
            {/*<CardFormModalGroup />*/}
            <CurrencySelectModal />
        </>
    );
});
