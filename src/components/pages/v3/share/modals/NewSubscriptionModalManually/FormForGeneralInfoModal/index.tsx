import React, {memo, useEffect, useState} from 'react';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {
    newFormForBillingInfoModalAtom,
    newFormForGeneralInfoModalAtom,
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
import {SelectProduct} from './SelectProduct';

export const FormForGeneralInfoModal = memo(function FormForGeneralInfoModal() {
    const orgId = useRecoilValue(orgIdParamState);
    const {Modal, close, isShow} = useModal(newFormForGeneralInfoModalAtom);
    const {open: openBillingInfoStep} = useModal(newFormForBillingInfoModalAtom);
    const {open: openUsingMemberInfoModal} = useModal(newFormForUsingMemberInfoModalAtom);
    const [formData, setFormData] = useRecoilState(newSubscriptionManualFormData);
    const form = useForm<CreateSubscriptionRequestDto>();
    const [productId, setProductId] = useState<number>();

    useEffect(() => {
        if (productId) form.setValue('productId', productId);
    }, [productId]);

    const onNext = () => {
        // set value
        setFormData((data) => ({
            ...data,
            organizationId: orgId,
            productId: form.getValues('productId'),
            alias: form.getValues('alias'),
            isFreeTier: form.getValues('isFreeTier'),
        }));

        form.getValues('isFreeTier') ? openUsingMemberInfoModal() : openBillingInfoStep();
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar title="새로운 구독 추가" backBtnOnClick={close} topbarPosition="sticky" />

            <MobileSection.Padding>
                <div>
                    {!form.getValues('productId') && (
                        <h3 className="font-bold text-2xl pt-5 mb-10">어느 서비스의 구독인가요?</h3>
                    )}

                    <div className="w-full flex flex-col gap-4">
                        <SelectProduct
                            defaultValue={productId}
                            onChange={(product) => setProductId(product.id)}
                            labelHidden
                        />
                        {form.getValues('productId') && (
                            <>
                                <FormControl topLeftLabel="별칭">
                                    <input
                                        type="text"
                                        required
                                        className="input input-bordered"
                                        {...form.register('alias', {required: true})}
                                        placeholder="ex. 도메인 scordi.io"
                                    />
                                </FormControl>

                                <FormControl topLeftLabel="유료로 쓰고 있나요?">
                                    <ButtonGroupRadio
                                        onChange={(o) => form.setValue('isFreeTier', o.value)}
                                        options={[
                                            {label: '무료', value: true},
                                            {label: '유료', value: false},
                                        ]}
                                        defaultValue={
                                            typeof formData.isFreeTier === 'undefined' ? true : formData.isFreeTier
                                        }
                                    />
                                </FormControl>
                            </>
                        )}
                    </div>
                </div>
            </MobileSection.Padding>

            <ModalLikeBottomBar>
                {form.watch('productId') && (
                    <button
                        className="btn btn-lg btn-block btn-scordi font-medium font-white text-xl bg-slate-50"
                        onClick={onNext}
                    >
                        다음
                    </button>
                )}
            </ModalLikeBottomBar>
        </Modal>
    );
});
