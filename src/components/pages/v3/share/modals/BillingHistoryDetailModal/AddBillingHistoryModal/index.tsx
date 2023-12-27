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
import {useRecoilState, useSetRecoilState} from 'recoil';
import {AmountBody} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/bodys/AmountBody';
import {DetailInfoBody} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/bodys/DetailInfoBody';
import {useForm} from 'react-hook-form';
import {CreateBillingHistoryRequestDto} from '^models/BillingHistory/type';
import {CurrencySelectModal} from '^v3/share/modals/BillingHistoryDetailModal/CurrencySelectModal';
import {FinishBody} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/bodys/FinishBody';
import {MemoBody} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/bodys/MemoBody';
import {isDomesticState, memoState} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/bodys/atom';
import {CardFormModalGroup} from '^v3/V3OrgCardListPage/modals/CardFormModalGroup';

export const AddBillingHistoryModal = memo(() => {
    const {Modal, close, isShow} = useModal(addBillingHistoryShowModal);
    const {billingHistory} = useBillingHistoryInModal();
    const [addBillingHistory, setAddBillingHistory] = useRecoilState(AddBillingHistoryState);
    const setIsDomestic = useSetRecoilState(isDomesticState);
    const setMemo = useSetRecoilState(memoState);
    const form = useForm<CreateBillingHistoryRequestDto>();

    useEffect(() => {
        // form, recoil 초기화
        setAddBillingHistory(AddBillingHistory.PayMethod);
        form.reset();
        setIsDomestic(true);
        setMemo('메모 남기기');
    }, [isShow]);

    // 모달 뒤로가기 버튼
    const onBack = () => {
        switch (addBillingHistory) {
            case AddBillingHistory.PayMethod:
                close();
                return;
            case AddBillingHistory.Amount:
                setAddBillingHistory(AddBillingHistory.PayMethod);
                return;
            case AddBillingHistory.DetailInfo:
                setAddBillingHistory(AddBillingHistory.Amount);
                return;
            case AddBillingHistory.Finish:
                setAddBillingHistory(AddBillingHistory.DetailInfo);
                return;
            case AddBillingHistory.Memo:
                setAddBillingHistory(AddBillingHistory.Finish);
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
                    <h2 className="h1 leading-tight mb-10 whitespace-pre-line">
                        {isShowTitle && '새로운 결제 내역을\n등록합니다'}
                        {addBillingHistory === AddBillingHistory.Finish && ''}
                        {addBillingHistory === AddBillingHistory.Memo && '어떤 내용의\n결제 내역인가요?'}
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
            <CardFormModalGroup />
            <CurrencySelectModal />
        </>
    );
});
