import React, {memo, useEffect} from 'react';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {
    payAmountModalState,
    payMethodModalState,
} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/atoms';
import {useBillingHistoryInModal} from '^v3/share/modals/BillingHistoryDetailModal/hook';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {FormControl} from '^components/util/form-control';
import Select from 'react-select';
import {
    CardComponents,
    PayMethodComponents,
    selectStylesOptions,
} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/PayMethodModal/selectOpions';
import {AddBillingHistoryModalBtn} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/share/AddBillingHistoryModalBtn';
import {CreditCardDto} from '^models/CreditCard/type';
import {useToast} from '^hooks/useToast';
import {CreateBillingHistoryRequestDto} from '^models/BillingHistory/type';
import {useForm} from 'react-hook-form';
import {useCreditCardsOfOrganization} from '^models/CreditCard/hook';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {useSetRecoilState} from 'recoil';
import {createBillingHistoryAtom} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/atoms/createBillingHistoryAtom';
import {CardFormModalGroup} from '^v3/V3OrgCardListPage/modals/CardFormModalGroup';
import {dateTimeInputMax} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/PayMethodModal/dateTimeInputMax';

type Option = {
    id: number;
    label: string;
    name: string;
};

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

    const toOption = (options: string[]) => {
        return options.map((item) => {
            return {
                label: item,
                name: item,
            };
        });
    };

    const getCreditCard = (cards: CreditCardDto[]) => {
        // 카드 번호만 가져오는 함수
        return cards
            .map((card) => {
                const cardInfo = card.decryptSign();
                if (!cardInfo.number1) return;

                const cardNumber = `${cardInfo.number1} - ${cardInfo.number2} - ${cardInfo.number3} - ${cardInfo.number4}`;
                return {id: card.id, label: cardNumber, name: cardNumber};
            })
            .filter((item): item is Option => item !== undefined);
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
                                    options={toOption(['카드', '계좌이체', '무통장입금', '현금영수증', '크레딧'])}
                                />
                            </FormControl>
                        </div>
                        <FormControl topLeftLabel="어떤 카드로 결제하셨나요?">
                            <Select
                                placeholder="카드 선택하기"
                                components={CardComponents()}
                                styles={selectStylesOptions}
                                options={CreditCard && getCreditCard(CreditCard.list)}
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
                    <AddBillingHistoryModalBtn onClick={onClick} />
                </ModalLikeBottomBar>
            </Modal>

            <CardFormModalGroup />
        </>
    );
});
