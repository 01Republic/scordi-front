import {useToast} from '^hooks/useToast';
import React, {ChangeEvent, memo, useState} from 'react';
import {FieldValues, UseFormReturn} from 'react-hook-form';
import {useRecoilValue} from 'recoil';
import {creditCardSignAtom} from '../../atom';

interface AddOptionalDataProps {
    form: UseFormReturn<FieldValues, any>;
}

export const AddOptionalData = memo((props: AddOptionalDataProps) => {
    const {form} = props;
    const {toast} = useToast();
    const [expiryNumber, setExpiryNumber] = useState<string>('');
    const [isChecked, setIsChecked] = useState(false);
    const cardSignInfo = useRecoilValue(creditCardSignAtom);

    const checkExpiryDate = (e: ChangeEvent<HTMLInputElement>) => {
        const expiryDate = e.target.value.trim();
        setExpiryNumber(expiryDate);

        if (expiryDate.length !== 4) return;

        const inputMonth = expiryDate.slice(0, 2);
        const inputYear = expiryDate.slice(2, 4);

        if (Number(inputMonth) > 13) {
            toast.error('유효기간을 확인해주세요');
            return;
        }
        setExpiryNumber(`${inputMonth} / ${inputYear}`);
    };

    const checkIsPersonal = () => {
        setIsChecked((prev) => !prev);
    };

    return (
        <>
            <div className="w-full flex justify-between gap-10 mb-3">
                <div className="form-control w-full max-w-xs">
                    <label className="label label-text">유효기간</label>
                    <input
                        {...form.register('expiry')}
                        type="text"
                        placeholder="MM/YY"
                        pattern="\d*"
                        maxLength={4}
                        defaultValue={cardSignInfo.expiry}
                        value={expiryNumber}
                        className="input input-bordered w-full max-w-xs"
                        onChange={(e) => checkExpiryDate(e)}
                    />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label label-text">cvc</label>
                    <input
                        {...form.register('cvc')}
                        type="text"
                        pattern="\d*"
                        defaultValue={cardSignInfo.cvc ?? ''}
                        placeholder="CVC"
                        maxLength={3}
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>
            </div>

            {/* 법인카드 checkbox */}
            <div onClick={checkIsPersonal} className="form-control">
                <label className="label cursor-pointer w-fit">
                    <input
                        {...form.register('isCorporateCard')}
                        type="checkbox"
                        checked={isChecked}
                        className="checkbox checkbox-primary mr-2"
                    />
                    <span className="label-text font-semibold">법인 카드</span>
                </label>
            </div>
        </>
    );
});
