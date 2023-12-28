import React, {memo, useEffect} from 'react';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {
    newFormForBillingInfoModalAtom,
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
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {CurrencyCode} from '^types/money.type';
import {
    currencySelectShowModal,
    selectedCurrencyForSubscriptionState,
} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {CurrencySelectModal} from '^v3/share/modals/BillingHistoryDetailModal/CurrencySelectModal';

export const FormForBillingInfoModal = memo(function FormForBillingInfoModal() {
    const orgId = useRecoilValue(orgIdParamState);
    const {Modal, close} = useModal(newFormForBillingInfoModalAtom);
    const {open: openUsingMemberInfoModal} = useModal(newFormForUsingMemberInfoModalAtom);
    const [formData, setFormData] = useRecoilState(newSubscriptionManualFormData);
    const form = useForm<CreateSubscriptionRequestDto>();
    const {open: openCurrencySelectModal} = useModal(currencySelectShowModal);
    const selectedCurrency = useRecoilValue(selectedCurrencyForSubscriptionState);

    useEffect(() => {
        const amount = form.getValues('currentBillingAmount.amount');
        const currency = selectedCurrency.label ?? CurrencyCode.USD;
        form.setValue('currentBillingAmount', {currency, amount});
    }, [selectedCurrency]);

    const onNext = () => {
        // set value
        setFormData((data) => ({
            ...data,
            currentBillingAmount: form.getValues('currentBillingAmount'),
            billingCycleOption: form.getValues('billingCycleOption') ?? BillingCycleOptions.Monthly,
            isPerUser: form.getValues('isPerUser') ?? true,
        }));

        openUsingMemberInfoModal();
    };

    return (
        <>
            <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
                <ModalTopbar title="새로운 구독 추가" backBtnOnClick={close} topbarPosition="sticky" />

                <MobileSection.Padding>
                    <div>
                        <h3 className="font-bold text-2xl pt-5 mb-10">결제 정보 입력</h3>

                        <div className="w-full flex flex-col gap-4">
                            {/*<FormControl topLeftLabel="과금방식">*/}
                            {/*    <ButtonGroupRadio*/}
                            {/*        onChange={(o) => form.setValue('billingCycleOption', o.value)}*/}
                            {/*        options={[*/}
                            {/*            {label: '정해진 금액이에요', value: BillingCycleOptions.Monthly},*/}
                            {/*            {label: '사용량에 따라 달라요', value: BillingCycleOptions.Onetime},*/}
                            {/*        ]}*/}
                            {/*        defaultValue={formData.billingCycleOption ?? BillingCycleOptions.Monthly}*/}
                            {/*    />*/}
                            {/*</FormControl>*/}

                            <FormControl topLeftLabel="결제 금액">
                                <div className="input input-bordered w-full flex items-center justify-between">
                                    <input
                                        type="number"
                                        step="0.01"
                                        min={0}
                                        className="w-full"
                                        onChange={(e) => {
                                            const amount = Number(e.target.value);
                                            const currency = form.getValues('currentBillingAmount.currency');
                                            form.setValue('currentBillingAmount', {currency, amount});
                                        }}
                                    />
                                    <span
                                        className="cursor-pointer btn btn-sm"
                                        onClick={() => openCurrencySelectModal()}
                                    >
                                        {form.getValues('currentBillingAmount')?.currency ?? CurrencyCode.USD}
                                    </span>
                                </div>
                            </FormControl>

                            <FormControl topLeftLabel="결제주기">
                                <ButtonGroupRadio
                                    onChange={(o) => form.setValue('billingCycleOption', o.value)}
                                    options={[
                                        {label: '매월', value: BillingCycleOptions.Monthly},
                                        {label: '매년', value: BillingCycleOptions.Yearly},
                                        {label: '일회성', value: BillingCycleOptions.Onetime},
                                    ]}
                                    defaultValue={formData.billingCycleOption ?? BillingCycleOptions.Monthly}
                                />
                            </FormControl>

                            <FormControl topLeftLabel="인원에 따라 과금되는 형태인가요?">
                                <ButtonGroupRadio
                                    onChange={(o) => form.setValue('isPerUser', o.value)}
                                    options={[
                                        {label: '네', value: true},
                                        {label: '아니오', value: false},
                                    ]}
                                    defaultValue={formData.isPerUser ?? true}
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
                        다음
                    </button>
                </ModalLikeBottomBar>
            </Modal>

            <CurrencySelectModal selectedCurrencyAtom={selectedCurrencyForSubscriptionState} />
        </>
    );
});
