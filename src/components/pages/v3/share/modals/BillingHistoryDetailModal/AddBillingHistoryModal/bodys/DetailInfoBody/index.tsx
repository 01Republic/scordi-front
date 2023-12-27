import React, {ChangeEvent, memo, useEffect} from 'react';
import {FormControl} from '^components/util/form-control';
import {TextInput} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/share/TextInput';
import {UseFormReturn} from 'react-hook-form';
import {CreateBillingHistoryRequestDto} from '^models/BillingHistory/type';
import {CreateMoneyRequestDto, CurrencyCode} from '^types/money.type';
import {ButtonGroupRadio} from '^components/util/form-control/inputs/ButtonGroupRadio/ButtonGroupRadio';
import {AddBillingHistoryModalBtn} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/share/AddBillingHistoryModalBtn';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {
    AddBillingHistory,
    AddBillingHistoryState,
    selectedCurrencyState,
} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {appIdState} from '^v3/V3OrgAppShowPage/atom';
import {appBillingHistoryApi} from '^models/BillingHistory/api';
import {isDomesticState} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/bodys/atom';

interface DetailInfoBodyProps {
    form: UseFormReturn<CreateBillingHistoryRequestDto>;
}

export const DetailInfoBody = memo(function DetailInfoBody(props: DetailInfoBodyProps) {
    const selectedCurrency = useRecoilValue(selectedCurrencyState);
    const isDomestic = useRecoilValue(isDomesticState);
    const setAddBillingHistory = useSetRecoilState(AddBillingHistoryState);

    const appId = useRecoilValue(appIdState);

    const {form} = props;

    useEffect(() => {
        form.setValue('isVATDeductible', true);
    }, []);

    const isVatDeductibleOptions = [
        {label: '공제', value: 'true'},
        {label: '불공제', value: 'false'},
    ];

    const onVATChange = (e: ChangeEvent<HTMLInputElement>) => {
        const moneyLike: CreateMoneyRequestDto = {
            text: `${e.target.value}원`,
            amount: Number(e.target.value),
            code: CurrencyCode.KRW,
            exchangeRate: 1,
            exchangedCurrency: isDomestic ? CurrencyCode.KRW : selectedCurrency.label,
        };
        form.setValue('vat', moneyLike);
    };

    const onClick = () => {
        if (!appId) return;

        const dto = form.getValues();

        const req = appBillingHistoryApi.createV2(appId, dto);

        req.then(() => {
            setAddBillingHistory(AddBillingHistory.Finish);
        });

        req.catch((e) => console.log(e));
    };

    return (
        <>
            <FormControl topLeftLabel="결제 승인 번호를 입력해주세요">
                <input className="hidden" {...form.register('uid')} />
                <TextInput type="number" onChange={(e) => form.setValue('uid', e.target.value)} />
            </FormControl>

            <FormControl topLeftLabel="국내 또는 해외 결제 여부를 선택해주세요">
                <ButtonGroupRadio
                    options={isVatDeductibleOptions}
                    onChange={(e) => {
                        const selectedValue = e.value === 'true';
                        form.setValue('isVATDeductible', selectedValue);
                    }}
                    defaultValue={isVatDeductibleOptions[0]}
                />
            </FormControl>

            <FormControl topLeftLabel="부가세를 입력해주세요">
                <TextInput type="number" onChange={onVATChange} />
            </FormControl>

            <AddBillingHistoryModalBtn onClick={onClick} text="등록하기" />
        </>
    );
});
