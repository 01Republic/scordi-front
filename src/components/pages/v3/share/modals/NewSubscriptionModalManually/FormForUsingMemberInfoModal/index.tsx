import React, {memo} from 'react';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {
    newFormForFinishModalAtom,
    newFormForUsingMemberInfoModalAtom,
    newSubscriptionManualFormData,
} from '^v3/share/modals/NewSubscriptionModalManually/atom';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {FormControl} from '^components/util/form-control';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useForm} from 'react-hook-form';
import {CreateSubscriptionRequestDto} from '^models/Subscription/types';
import {subscriptionApi} from '^models/Subscription/api';
import {SelectMasterProfile} from '^v3/share/modals/NewSubscriptionModalManually/FormForUsingMemberInfoModal/SelectMasterProfile';

export const FormForUsingMemberInfoModal = memo(function FormForUsingMemberInfoModal() {
    const {Modal, close} = useModal(newFormForUsingMemberInfoModalAtom);
    const {open: finishModalOpen} = useModal(newFormForFinishModalAtom);
    const [formData, setFormData] = useRecoilState(newSubscriptionManualFormData);
    const form = useForm<CreateSubscriptionRequestDto>();

    const onNext = () => {
        // select onChange에서 setFormData로 state변경하면
        // 선택한 옵션값으로 데이터 변경되지 않는 버그 발생으로
        // 우선은 여기서 값 변경하도록 했습니다..

        const masterId = form.getValues('masterId');
        if (!masterId) return;
        setFormData((prev) => ({...prev, masterId: masterId}));

        const req = subscriptionApi.create({
            ...formData,
        });

        // 생성 진행 중인 상태 처리
        // 성공 완료 처리
        req.then(() => finishModalOpen());

        // 실패시 처리
        req.catch((e) => console.log(e));
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar title="새로운 구독 추가" backBtnOnClick={close} topbarPosition="sticky" />

            <MobileSection.Padding>
                <div>
                    <h3 className="font-bold text-2xl pt-5 mb-10">
                        구독을 관리하는 <br /> 담당자를 선택해주세요
                    </h3>

                    <div className="w-full flex flex-col gap-4">
                        <FormControl topLeftLabel="누가 담당하고 있나요?">
                            <SelectMasterProfile form={form} />
                        </FormControl>

                        <FormControl topLeftLabel="어떤 팀에 속해있나요?">
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
