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
import {FormControl} from '^components/util/form-control';

export const FormForMemoModal = memo(() => {
    const {Modal, close} = useModal(newFormForMemoModalAtom);
    const [desc, setDesc] = useRecoilState(memoAtom);
    const form = useForm<CreateSubscriptionRequestDto>();
    const subscriptionId = useRecoilValue(subscriptionIdAtom);
    const {toast} = useToast();

    const onClick = () => {
        const desc = form.getValues('desc');

        if (!desc) return;

        const req = subscriptionApi.update(subscriptionId, {desc});

        req.then(() => {
            close();
            setDesc(desc);
        });

        req.catch((e) => toast.error(e.message));
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar title="새로운 구독 추가" backBtnOnClick={close} topbarPosition="sticky" />

            <MobileSection.Padding>
                <div className="pt-5 pb-10">
                    <h3 className="font-bold text-2xl mb-2">기록해둘 내용이 있나요?</h3>
                    <p className="font-semibold text-16 text-gray-500"></p>
                </div>

                <FormControl>
                    <input
                        onChange={(e) => form.setValue('desc', e.target.value)}
                        className="input input-bordered w-full"
                        placeholder=""
                        defaultValue={desc}
                        autoFocus={true}
                    />
                </FormControl>
            </MobileSection.Padding>

            <ModalLikeBottomBar className="left-0">
                <ModalButton onClick={onClick} text="완료" />
            </ModalLikeBottomBar>
        </Modal>
    );
});
