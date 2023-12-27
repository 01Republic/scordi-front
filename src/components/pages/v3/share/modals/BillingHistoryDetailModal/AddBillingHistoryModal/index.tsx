import React, {memo, useEffect} from 'react';
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
import {AmountBody} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/bodys/AmountBody';
import {DetailInfoBody} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/bodys/DetailInfoBody';
import {useForm} from 'react-hook-form';
import {CreateBillingHistoryRequestDto} from '^models/BillingHistory/type';
import {CurrencySelectModal} from '^v3/share/modals/BillingHistoryDetailModal/CurrencySelectModal';
import {FinishBody} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/bodys/FinishBody';
import {MemoBody} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/bodys/MemoBody';

export const AddBillingHistoryModal = memo(() => {
    const {Modal, close, isShow} = useModal(addBillingHistoryShowModal);
    const {billingHistory} = useBillingHistoryInModal();
    const [addBillingHistory, setAddBillingHistory] = useRecoilState(AddBillingHistoryState);
    const form = useForm<CreateBillingHistoryRequestDto>();

    useEffect(() => {
        setAddBillingHistory(AddBillingHistory.PayMethod);
        form.reset();
    }, [isShow]);

    // 모달 뒤로가기 버튼
    const onBack = () => {
        if (addBillingHistory === AddBillingHistory.PayMethod) {
            close();
            return;
        }
        if (addBillingHistory === AddBillingHistory.Amount) {
            setAddBillingHistory(AddBillingHistory.PayMethod);
            return;
        }
        if (addBillingHistory === AddBillingHistory.DetailInfo) {
            setAddBillingHistory(AddBillingHistory.Amount);
            return;
        }
    };

    const isShowTitle = addBillingHistory !== AddBillingHistory.Finish && addBillingHistory !== AddBillingHistory.Memo;

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
                        {isShowTitle && ' 새로운 결제 내역을 \n' + ' 등록합니다'}
                        {addBillingHistory === AddBillingHistory.Finish && ''}
                        {addBillingHistory === AddBillingHistory.Memo && '어떤 내용의 \n' + ' 결제 내역인가요?'}
                    </h2>

                    <section className="flex flex-col gap-5">
                        {addBillingHistory === AddBillingHistory.PayMethod && <PayMethodBody form={form} />}
                        {addBillingHistory === AddBillingHistory.Amount && <AmountBody form={form} />}
                        {addBillingHistory === AddBillingHistory.DetailInfo && <DetailInfoBody form={form} />}
                        {addBillingHistory === AddBillingHistory.Finish && <FinishBody />}
                        {addBillingHistory === AddBillingHistory.Memo && <MemoBody form={form} />}
                    </section>
                </MobileSection.Padding>
            </Modal>
            {/*<CardFormModalGroup />*/}
            <CurrencySelectModal />
        </>
    );
});
