import React, {memo, useEffect} from 'react';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {
    payAmountModalState,
    payMethodModalState,
} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/atoms';
import {useBillingHistoryInModal} from '^v3/share/modals/BillingHistoryDetailModal/hook';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {FormControl} from '^components/util/form-control';
import Select from 'react-select';
import {
    CardComponents,
    PayMethodComponents,
    selectStylesOptions,
} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/PayMethodModal/selectOpions';
import {CreditCardDto} from '^models/CreditCard/type';
import {useToast} from '^hooks/useToast';
import {CreateBillingHistoryRequestDto} from '^models/BillingHistory/type';
import {useForm} from 'react-hook-form';
import {useCreditCardsOfOrganization} from '^models/CreditCard/hook';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {useSetRecoilState} from 'recoil';
import {createBillingHistoryAtom} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/atoms/createBillingHistoryAtom';
import {ModalButton} from '^v3/share/ModalButton';
import {NewCardModalV2} from 'src/components/pages/v3/share/modals/NewCardModal/NewCardModalV2';

export const PayMethodModal = memo(() => {
    const {Modal, isShow, close} = useModal(payMethodModalState);
    const {open: openPayAmountModal} = useModal(payAmountModalState);
    const {billingHistory} = useBillingHistoryInModal();
    const {CreditCard} = useCreditCardsOfOrganization(isShow);
    const setCreateBillingHistory = useSetRecoilState(createBillingHistoryAtom);
    const {toast} = useToast();
    const form = useForm<CreateBillingHistoryRequestDto>();

    useEffect(() => {
        form.reset();
    }, [isShow]);

    const toOption = (card: CreditCardDto) => {
        const value = card.id;
        const label = card.fullNumber;
        const name = card.name;

        return {value, label, name};
    };

    const onClick = () => {
        const cardId = form.getValues('creditCardId');
        const paidAt = form.getValues('paidAt');

        if (!cardId) {
            toast.error('결제한 카드를 선택해주세요');
            return;
        }
        // 우선 일시까지 받도록 해놓음
        if (!paidAt) {
            toast.error('결제 일시를 확인해주세요');
            return;
        }

        setCreateBillingHistory((prev) => ({
            ...prev,
            creditCardId: cardId,
            paidAt: paidAt,
        }));

        openPayAmountModal();
    };

    return (
        <>
            <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
                <ModalTopbar
                    backBtnOnClick={close}
                    topbarPosition="sticky"
                    title={billingHistory ? billingHistory.pageSubject : '결제 내역 등록'}
                />
                <MobileSection.Padding>
                    <h2 className="h1 leading-tight mb-10 whitespace-pre-line">
                        새로운 결제 내역을 <br /> 등록합니다.
                    </h2>
                    <section className="flex flex-col gap-5">
                        {/*현재는 선택 option 카드뿐이라 hidden 처리*/}
                        <div className="hidden">
                            <FormControl topLeftLabel="결제 수단">
                                <Select
                                    components={PayMethodComponents()}
                                    styles={selectStylesOptions}
                                    // options={toOption(['카드', '계좌이체', '무통장입금', '현금영수증', '크레딧'])}
                                />
                            </FormControl>
                        </div>
                        <FormControl topLeftLabel="어떤 카드로 결제하셨나요?">
                            <Select
                                placeholder="카드 선택하기"
                                components={CardComponents()}
                                styles={selectStylesOptions}
                                options={CreditCard?.list.map(toOption)}
                                onChange={(e) => form.setValue('creditCardId', e.id)}
                            />
                        </FormControl>
                        <FormControl topLeftLabel="언제 결제하셨나요?">
                            <input
                                type="datetime-local"
                                className="input input-bordered w-full text-sm font-semibold text-neutral-500"
                                {...form.register('paidAt')}
                                max="9999-12-31T23:59"
                                min="2000-01-01T00:00"
                            />
                        </FormControl>
                    </section>
                </MobileSection.Padding>

                <ModalLikeBottomBar className="left-0">
                    <ModalButton onClick={onClick} />
                </ModalLikeBottomBar>
            </Modal>

            <NewCardModalV2 />
        </>
    );
});