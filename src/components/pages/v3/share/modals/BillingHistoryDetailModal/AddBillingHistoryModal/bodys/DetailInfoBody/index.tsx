import {ChangeEvent, memo} from 'react';
import {FormControl} from '^components/util/form-control';
import {TextInput} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/share/TextInput';
import {UseFormReturn} from 'react-hook-form';
import {CreateBillingHistoryRequestDto} from '^models/BillingHistory/type';
import {CreateMoneyRequestDto, Currency} from '^types/money.type';
import {ButtonGroupRadio} from '^components/util/form-control/inputs/ButtonGroupRadio/ButtonGroupRadio';

interface DetailInfoBodyProps {
    form: UseFormReturn<CreateBillingHistoryRequestDto>;
}

export const DetailInfoBody = memo(function DetailInfoBody(props: DetailInfoBodyProps) {
    const {form} = props;
    const onUidChange = (e: ChangeEvent<HTMLInputElement>) => {
        form.setValue('uid', e.target.value);
    };

    const isVatDeductibleOptions = [
        {label: '공제', value: 'true'},
        {label: '불공제', value: 'false'},
    ];

    const onVATChange = (e: ChangeEvent<HTMLInputElement>) => {
        const moneyLike: CreateMoneyRequestDto = {
            text: `${e.target.value}원`,
            amount: Number(e.target.value),
            code: Currency.KRW,
            exchangeRate: 1,
        };
        form.setValue('vat', moneyLike);
    };

    return (
        <>
            <FormControl topLeftLabel="결제 승인 번호를 입력해주세요">
                <TextInput type="text" onChange={onUidChange} />
            </FormControl>

            <FormControl topLeftLabel="국내 또는 해외 결제 여부를 선택해주세요">
                <input className="hidden" {...form.register('isVATDeductible')} />
                <ButtonGroupRadio
                    options={isVatDeductibleOptions}
                    onChange={(e) => {
                        const selectedValue = e.value === 'true';
                        form.setValue('isVATDeductible', selectedValue);
                    }}
                />
            </FormControl>
            <FormControl topLeftLabel="부가세를 입력해주세요">
                <TextInput type="text" onChange={onVATChange} />
            </FormControl>
        </>
    );
});
