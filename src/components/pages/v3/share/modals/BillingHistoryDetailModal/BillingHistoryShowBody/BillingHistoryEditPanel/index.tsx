import React, {memo, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {isBillingHistoryEditModeAtom} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {useBillingHistoryInModal} from '^v3/share/modals/BillingHistoryDetailModal/hook';
import {
    CardReceiptPayAmount,
    getPayAmount,
    getPayAmounts,
    UpdateBillingHistoryRequestDtoV3,
} from '^models/BillingHistory/type/update-billing-history.request.dto.v2';
import {useForm} from 'react-hook-form';
import {BackButtonHijacker} from '^v3/V3OrgTeam/modals/TeamMemberShowModal/TeamMemberShowBody/TeamMemberEditPanel/BackButtonHijacker';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {FormControl, RequiredFormControl} from '^components/util/form-control';
import {BillingHistoryEditPanelBySubtype} from '^v3/share/modals/BillingHistoryDetailModal/BillingHistoryShowBody/BillingHistoryEditPanel/BillingHistoryEditPanelBySubtype';
import {CardSingleSelect} from '^v3/share/modals/BillingHistoryDetailModal/BillingHistoryShowBody/BillingHistoryEditPanel/CardSelect';
import {CurrencyCode} from '^types/money.type';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {
    AbroadPayAmountCurrencyModal,
    CurrencyBtn,
} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/PayAmountModal/AbroadPayAmountCurrencyModal';
import {TextInput} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/share/TextInput';
import {plainToast} from '^hooks/useToast';
import {plainToInstance} from 'class-transformer';

export const BillingHistoryEditPanel = memo(function BillingHistoryEditPanel() {
    const [cardPayAmount, setCardPayAmounts] = useState<CardReceiptPayAmount>();
    const {billingHistory, updateBillingHistory} = useBillingHistoryInModal();
    const [isEditMode, setIsEditMode] = useRecoilState(isBillingHistoryEditModeAtom);
    const form = useForm<UpdateBillingHistoryRequestDtoV3>();

    const setFormIfNotNull = (key: keyof UpdateBillingHistoryRequestDtoV3, value: any) => {
        if (value === null) return;
        form.setValue(key, value);
    };

    useEffect(() => {
        if (!billingHistory || !isEditMode) return;

        console.log('\nbillingHistory', billingHistory);

        if (billingHistory.payAmount) setCardPayAmounts(getPayAmounts(billingHistory.payAmount));

        form.setValue('paidAt', billingHistory.paidAt ?? undefined);
        form.setValue('creditCardId', billingHistory.creditCardId);

        setFormIfNotNull('isDomestic', billingHistory.isDomestic);
        setFormIfNotNull('uid', billingHistory.uid);
        billingHistory.vat && form.setValue('vat', billingHistory.vat);
        setFormIfNotNull('isVATDeductible', billingHistory.isVATDeductible);

        if (window) {
            const bindKeys = (e: KeyboardEvent) => {
                if (e.key === 'Escape') setIsEditMode(false);
            };
            window.addEventListener('keydown', bindKeys);
            return () => {
                window.removeEventListener('keydown', bindKeys);
            };
        }
    }, [billingHistory, isEditMode]);

    if (!billingHistory || !cardPayAmount) return <></>;

    const onCardChange = (cardId?: number) => {
        form.setValue('creditCardId', cardId);
    };

    const submitButtonOnClick = (data: UpdateBillingHistoryRequestDtoV3) => {
        if (billingHistory.subtype === 'EMAIL_INVOICE') {
            plainToast.error('이메일 영수증은 수정할 수 없습니다.', {duration: 4000});
            return;
        }
        if (!cardPayAmount) {
            plainToast.error('결제 금액을 확인해주세요', {duration: 4000});
            return;
        }

        if (data.vat?.amount && data.vat?.amount !== 0) {
            data.vat = {
                ...data.vat,
                text: data.vat?.text ?? '',
                code: CurrencyCode.KRW,
                exchangeRate: 1,
                exchangedCurrency: CurrencyCode.KRW,
            };
        } else {
            delete data.vat;
        }
        data.payAmount = getPayAmount(cardPayAmount);
        const dto = plainToInstance(UpdateBillingHistoryRequestDtoV3, data);
        console.log('\n\n\ndto', dto);
        updateBillingHistory(dto).then(() => {
            setIsEditMode(false);
            form.reset();
        });
    };

    return (
        <form>
            <BackButtonHijacker onClick={() => setIsEditMode(false)} />
            <MobileSection.Item className="border-b-0">
                <MobileSection.Padding>
                    <div className="w-full flex flex-col gap-4 mb-16">
                        <RequiredFormControl topLeftLabel="결제 수단">
                            <CardSingleSelect onChange={onCardChange} />
                        </RequiredFormControl>

                        <FormControl topLeftLabel="결제 일시">
                            <input
                                type="datetime-local"
                                className="input input-bordered w-full text-sm font-semibold text-neutral-500"
                                max="9999-12-31T23:59"
                                min="2000-01-01T00:00"
                                {...form.register('paidAt')}
                            />
                        </FormControl>

                        <RequiredFormControl topLeftLabel="국내 결제 금액">
                            <div className="input input-bordered w-full flex items-center justify-between">
                                <input
                                    type="number"
                                    className="w-full"
                                    defaultValue={cardPayAmount.domesticAmount}
                                    onChange={(e) => {
                                        setCardPayAmounts({...cardPayAmount, domesticAmount: Number(e.target.value)});
                                    }}
                                />
                                <span>{CurrencyCode.KRW}</span>
                            </div>
                        </RequiredFormControl>
                        <FormControl topLeftLabel="결제 지역">
                            <ButtonGroupRadio
                                onChange={(e) => form.setValue('isDomestic', e.value)}
                                options={[
                                    {label: '국내', value: true},
                                    {label: '해외', value: false},
                                ]}
                                defaultValue={form.getValues('isDomestic')}
                            />
                        </FormControl>
                        <FormControl topLeftLabel="해외 결제 금액">
                            <div className="input input-bordered w-full flex items-center justify-between">
                                <input
                                    type="number"
                                    className="w-full"
                                    defaultValue={cardPayAmount?.abroadAmount}
                                    onChange={(e) => {
                                        setCardPayAmounts({...cardPayAmount, abroadAmount: Number(e.target.value)});
                                    }}
                                />
                                <CurrencyBtn defaultCurrency={billingHistory.payAmount?.exchangedCurrency} />
                            </div>
                            <AbroadPayAmountCurrencyModal
                                onChange={(code) => {
                                    setCardPayAmounts({...cardPayAmount, exchangedCurrency: code});
                                }}
                            />
                        </FormControl>

                        <FormControl topLeftLabel="결제 승인 번호">
                            <TextInput type="text" {...form.register('uid')} />
                        </FormControl>
                        <FormControl topLeftLabel="공제 여부">
                            <ButtonGroupRadio
                                onChange={(e) => form.setValue('isVATDeductible', e.value)}
                                options={[
                                    {label: '공제 가능', value: true},
                                    {label: '공제 불가능', value: false},
                                ]}
                                defaultValue={form.getValues('isVATDeductible')}
                            />
                        </FormControl>
                        <FormControl topLeftLabel="부가세">
                            <TextInput type="number" {...form.register('vat.amount')} />
                        </FormControl>
                    </div>
                    <BillingHistoryEditPanelBySubtype />

                    <div className="w-full grid grid-cols-2 gap-2">
                        <button type="button" className="btn btn-lg rounded-box" onClick={() => setIsEditMode(false)}>
                            취소
                        </button>
                        <button
                            type="submit"
                            className="btn btn-lg btn-scordi rounded-box"
                            onClick={() => {
                                console.log(form.getValues('vat'));
                                submitButtonOnClick(form.getValues());
                            }}
                        >
                            완료
                        </button>
                    </div>
                </MobileSection.Padding>
            </MobileSection.Item>
        </form>
    );
});
