import React, {memo} from 'react';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {newFormForBillingInfoModalAtom} from '^v3/share/modals/NewSubscriptionModalManually/atom';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {RequiredFormControl} from '^components/util/form-control';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {CurrentBillingAmountCurrencyModal} from './CurrentBillingAmountCurrencyModal';
import {BillingCycleOptionRadio} from './BillingCycleOptionRadio';
import {RecurringTypeSelect} from './RecurringTypeSelect';
import {CurrentBillingAmountInput} from './CurrentBillingAmountInput';
import {NextButton} from './NextButton';
import {CardSelect} from '^v3/share/modals/NewSubscriptionModalManually/FormForBillingInfoModal/CardSelect';

export const FormForBillingInfoModal = memo(function FormForBillingInfoModal() {
    const {Modal, close} = useModal(newFormForBillingInfoModalAtom);

    return (
        <>
            <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
                <ModalTopbar title="새로운 구독 추가" backBtnOnClick={close} topbarPosition="sticky" />

                <MobileSection.Padding>
                    <div>
                        <h3 className="font-bold text-2xl pt-5 mb-10">결제 정보 입력</h3>

                        <div className="w-full flex flex-col gap-4">
                            <RequiredFormControl topLeftLabel="결제수단">
                                <CardSelect />
                            </RequiredFormControl>

                            <RequiredFormControl
                                topLeftLabel="결제주기"
                                bottomLeftHint="반복 지불이 아니면 '일회성'으로 체크해주세요"
                            >
                                <BillingCycleOptionRadio />
                            </RequiredFormControl>

                            <RequiredFormControl
                                topLeftLabel="과금방식"
                                bottomLeftHint="단위가격이 매겨지는 방식이에요"
                            >
                                <RecurringTypeSelect />
                            </RequiredFormControl>

                            <RequiredFormControl topLeftLabel="요금">
                                <CurrentBillingAmountInput />
                            </RequiredFormControl>
                        </div>
                    </div>
                </MobileSection.Padding>

                <ModalLikeBottomBar>
                    <NextButton />
                </ModalLikeBottomBar>
            </Modal>

            <CurrentBillingAmountCurrencyModal />
        </>
    );
});
