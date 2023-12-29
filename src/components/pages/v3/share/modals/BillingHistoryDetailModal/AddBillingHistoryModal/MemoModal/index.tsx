import React, {memo} from 'react';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {
    billingHistoryIdState,
    createBillingHistoryAtom,
    memoModalState,
    memoState,
    payMethodModalState,
} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/atoms';
import {useBillingHistoryInModal} from '^v3/share/modals/BillingHistoryDetailModal/hook';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {AddBillingHistoryModalBtn} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/share/AddBillingHistoryModalBtn';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {appBillingHistoryApi} from '^models/BillingHistory/api';
import {AddBillingHistory} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {appIdState} from '^v3/V3OrgAppShowPage/atom';

export const MemoModal = memo(() => {
    const {Modal, close} = useModal(memoModalState);
    const {billingHistory} = useBillingHistoryInModal();
    const [memo, setMemo] = useRecoilState(memoState);
    const setCreateBillingHistory = useSetRecoilState(createBillingHistoryAtom);
    const appId = useRecoilValue(appIdState);
    const billingHistoryId = useRecoilValue(billingHistoryIdState);

    const onClick = () => {};

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar
                backBtnOnClick={close}
                topbarPosition="sticky"
                title={billingHistory ? billingHistory.pageSubject : '결제 내역 등록'}
            />
            <MobileSection.Padding>
                <h2 className="h1 leading-tight mb-10 whitespace-pre-line">
                    어떤 내용의 <br /> 결제내역인가요?
                </h2>
                <section className="flex flex-col gap-5">
                    <textarea
                        onChange={(e) => {
                            setMemo(e.target.value);
                        }}
                        className="textarea textarea-primary w-full min-h-40"
                        placeholder="디자인팀 피그마 결제"
                        defaultValue={memo}
                    />

                    <AddBillingHistoryModalBtn onClick={onClick} text="완료" />
                </section>
            </MobileSection.Padding>
        </Modal>
    );
});
