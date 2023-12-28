import React, {memo, useEffect} from 'react';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {
    newFormForUsingMemberInfoModalAtom,
    newSubscriptionManualFormData,
} from '^v3/share/modals/NewSubscriptionModalManually/atom';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {FormControl} from '^components/util/form-control';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useForm} from 'react-hook-form';
import {CreateSubscriptionRequestDto} from '^models/Subscription/types';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {orgIdParamState} from '^atoms/common';
import {subscriptionApi} from '^models/Subscription/api';

export const FormForUsingMemberInfoModal = memo(function FormForUsingMemberInfoModal() {
    const orgId = useRecoilValue(orgIdParamState);
    const {Modal, close} = useModal(newFormForUsingMemberInfoModalAtom);
    const [formData, setFormData] = useRecoilState(newSubscriptionManualFormData);
    const form = useForm<CreateSubscriptionRequestDto>();

    const onNext = () => {
        // 여기서는 폼데이터 상태객체를 바꿀 생각 하지 말고
        // 그냥 서브밋 해야 함.
        subscriptionApi.create({
            ...formData,
            // 담당자 인풋 값
            // 팀 인풋 값
        });

        // 생성 진행 중인 상태 처리

        // 성공 완료 처리

        // 실패시 처리
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar title="새로운 구독 추가" backBtnOnClick={close} topbarPosition="sticky" />

            <MobileSection.Padding>
                <div>
                    <h3 className="font-bold text-2xl pt-5 mb-10">담당자 + 팀 입력</h3>

                    <div className="w-full flex flex-col gap-4">
                        <FormControl topLeftLabel="담당자">
                            <input
                                type="text"
                                required
                                className="input input-bordered"
                                {...form.register('alias', {required: true})}
                                placeholder="ex. 도메인 scordi.io"
                            />
                        </FormControl>

                        <FormControl topLeftLabel="팀">
                            <input
                                type="text"
                                required
                                className="input input-bordered"
                                {...form.register('alias', {required: true})}
                                placeholder="ex. 도메인 scordi.io"
                            />
                        </FormControl>
                    </div>
                </div>
            </MobileSection.Padding>

            <ModalLikeBottomBar>
                <button
                    className="btn btn-lg btn-block btn-scordi font-medium font-white text-xl bg-slate-50"
                    onClick={onNext}
                >
                    등록하기
                </button>
            </ModalLikeBottomBar>
        </Modal>
    );
});
