import {ModalTopbar, useModal} from '^v3/share/modals';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import React, {memo} from 'react';
import {
    memoAtom,
    newFormForMemoModalAtom,
    subscriptionIdAtom,
} from '^v3/share/modals/NewSubscriptionModalManually/atom';
import {useRecoilState, useRecoilValue} from 'recoil';
import {CreateSubscriptionRequestDto} from '^models/Subscription/types';
import {useForm} from 'react-hook-form';
import {subscriptionApi} from '^models/Subscription/api';
import {useToast} from '^hooks/useToast';
import {ModalButton} from '^v3/share/ModalButton';

export const FormForMemoModal = memo(() => {
    const {Modal, close} = useModal(newFormForMemoModalAtom);
    const [memo, setMemo] = useRecoilState(memoAtom);
    const form = useForm<CreateSubscriptionRequestDto>();
    const subscriptionId = useRecoilValue(subscriptionIdAtom);
    const {toast} = useToast();

    const onClick = () => {
        const memo = form.getValues('memo');

        if (!memo) return;

        const req = subscriptionApi.update(subscriptionId, {memo});

        req.then(() => {
            close();
            setMemo(memo);
        });

        req.catch((e) => toast.error(e.message));
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar title="새로운 구독 추가" backBtnOnClick={close} topbarPosition="sticky" />
            <MobileSection.Padding>
                <textarea
                    onChange={(e) => form.setValue('memo', e.target.value)}
                    className="textarea textarea-primary w-full min-h-40"
                    placeholder=""
                    defaultValue={memo}
                />
            </MobileSection.Padding>

            <ModalLikeBottomBar className="left-0">
                <ModalButton onClick={onClick} text="완료" />
            </ModalLikeBottomBar>
        </Modal>
    );
});
