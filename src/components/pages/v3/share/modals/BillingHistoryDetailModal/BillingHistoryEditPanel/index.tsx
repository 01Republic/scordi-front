import React, {memo, useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {isBillingHistoryEditModeAtom} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {useBillingHistoryInModal} from '^v3/share/modals/BillingHistoryDetailModal/hook';
import {useForm} from 'react-hook-form';
import {BackButtonHijacker} from '^v3/V3OrgTeam/modals/TeamMemberShowModal/TeamMemberShowBody/TeamMemberEditPanel/BackButtonHijacker';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {FormControl, RequiredFormControl} from '^components/util/form-control';
import {BillingHistoryEditPanelBySubtype} from '^v3/share/modals/BillingHistoryDetailModal/BillingHistoryEditPanel/BillingHistoryEditPanelBySubtype';
import {CardSingleSelect} from '^v3/share/modals/BillingHistoryDetailModal/BillingHistoryEditPanel/CardSelect';
import {CurrencyCode} from '^models/Money';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {TextInput} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/share/TextInput';
import {plainToast} from '^hooks/useToast';
import {
    BillingHistoryByCardReceiptDto,
    UpdateBillingHistoryByCardReceiptDto,
} from '^models/BillingHistory/type/card-recipt';
import {plainToInstance} from 'class-transformer';
import {BillingHistoryEditAbroadCurrencyButton} from './BillingHistoryEditAbroadCurrency';

export const BillingHistoryEditPanel = memo(function BillingHistoryEditPanel() {
    const {billingHistory, updateBillingHistory} = useBillingHistoryInModal();
    const [isEditMode, setIsEditMode] = useRecoilState(isBillingHistoryEditModeAtom);
    const form = useForm<UpdateBillingHistoryByCardReceiptDto>();

    const setFormIfNotNull = (key: keyof UpdateBillingHistoryByCardReceiptDto, value: any) => {
        if (value === null) return;
        form.setValue(key, value);
    };

    useEffect(() => {
        if (!billingHistory || !isEditMode) return;
        const cardReceiptBillingHistory = new BillingHistoryByCardReceiptDto(billingHistory);

        form.setValue('creditCardId', billingHistory.creditCardId);
        setFormIfNotNull('isDomestic', billingHistory.isDomestic);
        setFormIfNotNull('uid', billingHistory.uid);
        setFormIfNotNull('isVATDeductible', billingHistory.isVATDeductible);

        form.setValue('domesticAmount', cardReceiptBillingHistory.domesticAmount);
        form.setValue('abroadAmount', cardReceiptBillingHistory.abroadAmount);
        form.setValue('exchangedCurrency', cardReceiptBillingHistory.exchangedCurrency);
        form.setValue('vatAmount', cardReceiptBillingHistory.vatAmount);

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

    if (!billingHistory) return <></>;

    const exchangeableCurrencyCode =
        billingHistory.payAmount?.exchangeRate !== 1 ? billingHistory.payAmount?.exchangedCurrency : undefined;

    const submitButtonOnClick = (data: UpdateBillingHistoryByCardReceiptDto) => {
        if (billingHistory.subtype === 'EMAIL_INVOICE') {
            plainToast.error('이메일 인보이스로 결제내역은 수정할 수 없습니다.', {duration: 4000});
            return;
        }
        if (!data.domesticAmount) {
            plainToast.error('결제 금액을 확인해주세요', {duration: 4000});
            return;
        }
        if (data.abroadAmount) {
            if (!data.exchangedCurrency || data.exchangedCurrency === CurrencyCode.KRW) {
                plainToast.error('해외 결제 금액의 통화를 선택해주세요', {duration: 4000});
                return;
            }
        }
        // form values to dto
        const dto = plainToInstance(UpdateBillingHistoryByCardReceiptDto, data);
        const requestDto = dto.toRequestDto();
        console.log('\nrequestDto', requestDto);
        updateBillingHistory(requestDto).then(() => {
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
                            <CardSingleSelect
                                billingHistory={billingHistory}
                                onChange={(cardId) => form.setValue('creditCardId', cardId)}
                            />
                        </RequiredFormControl>

                        <FormControl topLeftLabel="결제 일시">
                            <input
                                type="datetime-local"
                                className="input input-bordered w-full text-sm font-semibold text-neutral-500"
                                max="9999-12-31T23:59"
                                min="2000-01-01T00:00"
                                defaultValue={billingHistory.paidAt?.toISOString().slice(0, 16)}
                                onChange={(e) => form.setValue('paidAt', new Date(e.target.value))}
                            />
                        </FormControl>

                        <RequiredFormControl topLeftLabel="국내 결제 금액">
                            <div className="input input-bordered w-full flex items-center justify-between">
                                <input type="number" className="w-full" {...form.register('domesticAmount')} />
                                <span>{CurrencyCode.KRW}</span>
                            </div>
                        </RequiredFormControl>
                        <FormControl topLeftLabel="결제 지역">
                            <ButtonGroupRadio
                                onChange={(e) => {
                                    console.log('결제 지역 radio');
                                    console.log(e.value);
                                    form.setValue('isDomestic', e.value);
                                }}
                                options={[
                                    {label: '국내', value: true},
                                    {label: '해외', value: false},
                                ]}
                                defaultValue={form.getValues('isDomestic')}
                            />
                        </FormControl>
                        <FormControl topLeftLabel="해외 결제 금액">
                            <div className="input input-bordered w-full flex items-center justify-between">
                                <input type="number" className="w-full" {...form.register('abroadAmount')} />
                                <BillingHistoryEditAbroadCurrencyButton
                                    currencyCode={exchangeableCurrencyCode}
                                    onChange={(code) => form.setValue('exchangedCurrency', code)}
                                />
                            </div>
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
                            <TextInput type="number" {...form.register('vatAmount')} />
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
                            onClick={() => submitButtonOnClick(form.getValues())}
                        >
                            완료
                        </button>
                    </div>
                </MobileSection.Padding>
            </MobileSection.Item>
        </form>
    );
});
