import React, {memo} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {appBillingHistoryApi} from '^models/BillingHistory/api';
import {
    billingHistoryIdState,
    memoModalState,
    memoState,
} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/atoms';
import {useForm} from 'react-hook-form';
import {CreateBillingHistoryRequestDto} from '^models/BillingHistory/type';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {useToast} from '^hooks/useToast';
import {NextButtonUI} from '^v3/share/NextButtonUI';
import {debounce} from 'lodash';
import {useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';

export const MemoModal = memo(() => {
    const {Modal, close} = useModal(memoModalState);
    const billingHistoryId = useRecoilValue(billingHistoryIdState);
    const form = useForm<CreateBillingHistoryRequestDto>();
    const [memo, setMemo] = useRecoilState(memoState);
    const {toast} = useToast();
    const {currentSubscription} = useCurrentSubscription();

    const onClick = debounce(() => {
        const memo = form.getValues('memo');

        if (!billingHistoryId || !memo) return;

        const req = appBillingHistoryApi.updateV2(billingHistoryId, {memo});

        req.then(() => {
            close();
            setMemo(memo);
        });

        req.catch((e) => toast.error(e.message));
    }, 500);

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar
                backBtnOnClick={close}
                topbarPosition="sticky"
                title={currentSubscription?.product.nameKo || '결제 내역 추가'}
            />
            <MobileSection.Padding>
                <h2 className="h1 leading-tight mb-10 whitespace-pre-line">
                    어떤 내용의 <br /> 결제내역인가요?
                </h2>

                <textarea
                    onChange={(e) => form.setValue('memo', e.target.value)}
                    className="textarea textarea-primary w-full min-h-40"
                    placeholder="디자인팀 피그마 결제"
                    defaultValue={memo}
                />
            </MobileSection.Padding>

            <ModalLikeBottomBar className="left-0">
                <NextButtonUI isActive={true} onClick={() => onClick()}>
                    완료
                </NextButtonUI>
            </ModalLikeBottomBar>
        </Modal>
    );
});
