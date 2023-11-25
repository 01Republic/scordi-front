import React, {ForwardedRef, forwardRef, InputHTMLAttributes, memo, useEffect, useRef, useState} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {useForm} from 'react-hook-form';
import {useId} from 'react-id-generator';
import {CgArrowsExchangeAlt} from 'react-icons/cg';
import {isEditModeState} from './atom';
import {subjectReportProductItem, useReportInDemo} from '../../atom';
import {CurrencyType, RecurringType, ReportItemFormDataDto} from '../../dto/report-item-form.dto';

export const EditItemForm = memo(function EditItemForm() {
    const subjectItem = useRecoilValue(subjectReportProductItem);
    const form = useForm<ReportItemFormDataDto>();
    const setIsEditMode = useSetRecoilState(isEditModeState);
    const {productHandler} = useReportInDemo();
    const [isFree, setIsFree] = useState(true);
    const [recurringType, setRecurringType] = useState(RecurringType.Monthly);
    const [isPerUser, setIsPerUser] = useState(false);
    const [payAmount, setPayAmount] = useState<number>();
    const [currencyType, setCurrencyType] = useState(CurrencyType.KRW);

    useEffect(() => {
        if (!subjectItem) return;
        setIsFree(subjectItem.formData.isFree);
        setRecurringType(subjectItem.formData.recurringType);
        setIsPerUser(subjectItem.formData.isPerUser);
        setPayAmount(subjectItem.formData.payAmount);
        setCurrencyType(subjectItem.formData.currencyType);
    }, [subjectItem]);

    useEffect(() => {
        form.setValue('isFree', isFree);
    }, [isFree]);

    useEffect(() => {
        form.setValue('recurringType', recurringType);
    }, [recurringType]);

    useEffect(() => {
        form.setValue('isPerUser', isPerUser);
    }, [isPerUser]);

    useEffect(() => {
        form.setValue('payAmount', payAmount || 0);
    }, [payAmount]);

    useEffect(() => {
        form.setValue('currencyType', currencyType);
    }, [currencyType]);

    const onSubmit = (data: ReportItemFormDataDto) => {
        if (!subjectItem) return;
        productHandler.update(subjectItem, data);
        setIsEditMode(false);
    };

    const submitButtonClick = () => {
        onSubmit(form.getValues());
    };

    return (
        <div>
            <form>
                <div className="w-full flex flex-col gap-4 mb-16">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-[500]">유료로 쓰고 있나요?</span>
                        </label>
                        <div className="w-full grid grid-cols-2 gap-1 bg-gray-100 rounded-[0.5rem] p-1">
                            <button
                                type="button"
                                onClick={() => setIsFree(true)}
                                className={`btn text-lg rounded-[0.5rem] border-0 ${
                                    isFree ? 'bg-gray-300' : 'hover:bg-gray-200'
                                }`}
                            >
                                무료
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsFree(false)}
                                className={`btn text-lg rounded-[0.5rem] border-0  ${
                                    !isFree ? 'bg-gray-300' : 'hover:bg-gray-200'
                                }`}
                            >
                                유료
                            </button>
                        </div>
                    </div>

                    {/* 반복주기 : 월간 / 연간 / 일회성 */}
                    <div className={isFree ? 'hidden' : 'form-control w-full'}>
                        <label className="label">
                            <span className="label-text font-[500]">반복주기</span>
                        </label>
                        <div className="w-full grid grid-cols-3 gap-1 bg-gray-100 rounded-[0.5rem] p-1">
                            <button
                                type="button"
                                onClick={() => setRecurringType(RecurringType.Monthly)}
                                className={`btn text-lg rounded-[0.5rem] border-0 ${
                                    recurringType === RecurringType.Monthly ? 'bg-gray-300' : 'hover:bg-gray-200'
                                }`}
                            >
                                월간
                            </button>
                            <button
                                type="button"
                                onClick={() => setRecurringType(RecurringType.Yearly)}
                                className={`btn text-lg rounded-[0.5rem] border-0 ${
                                    recurringType === RecurringType.Yearly ? 'bg-gray-300' : 'hover:bg-gray-200'
                                }`}
                            >
                                연간
                            </button>
                            <button
                                type="button"
                                onClick={() => setRecurringType(RecurringType.Onetime)}
                                className={`btn text-lg rounded-[0.5rem] border-0  ${
                                    recurringType === RecurringType.Onetime ? 'bg-gray-300' : 'hover:bg-gray-200'
                                }`}
                            >
                                일회성
                            </button>
                        </div>
                        <label className="label">
                            <span className="label-text-alt">반복 지불이 아니면 '일회성'으로 체크해주세요</span>
                        </label>
                    </div>

                    {/* 체크박스 : 인당 과금이에요 */}
                    <div
                        className={isFree ? 'hidden' : 'relative w-full cursor-pointer'}
                        onClick={() => setIsPerUser((v) => !v)}
                    >
                        <Checkbox
                            labelText="1인당 과금이에요"
                            className="checkbox checkbox-info"
                            checked={isPerUser}
                            onKeyDown={(e) => {
                                if (e.code == 'Enter' || e.code == 'Space') {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setIsPerUser((v) => !v);
                                }
                            }}
                            onChange={(e) => e.preventDefault()}
                        />
                        <div className="absolute absolute-cover" />
                    </div>

                    {/* 단위금액 : 00 원/달러 */}
                    <div className={isFree ? 'hidden' : 'form-control w-full'}>
                        <label className="label">
                            <span className="label-text font-[500]">단위금액</span>
                        </label>
                        <div className="input-group relative focus:outline focus:outline-offset-2">
                            <input
                                type="number"
                                placeholder={currencyType === CurrencyType.KRW ? '57000' : '6.99'}
                                className="input input-bordered flex-1 !outline-none border-gray-300 border-r-0 text-lg"
                                value={payAmount}
                                onChange={(e) => setPayAmount(Number(e.target.value.replace(/\D/g, '')))}
                            />
                            <span className="bg-white border-y border-gray-300 text-lg">
                                {currencyType === CurrencyType.KRW && '원'}
                                {currencyType === CurrencyType.USD && '달러'}
                            </span>
                            <button
                                type="button"
                                className="flex items-center px-4 cursor-pointer bg-gray-100 hover:bg-gray-200 border-y border-r border-gray-300 text-lg transition-all focus:bg-gray-300 focus:outline-gray-300"
                                onClick={() =>
                                    setCurrencyType((v) => {
                                        if (v === CurrencyType.KRW) return CurrencyType.USD;
                                        if (v === CurrencyType.USD) return CurrencyType.KRW;
                                        return CurrencyType.KRW;
                                    })
                                }
                            >
                                <CgArrowsExchangeAlt size={24} className="mr-2" />
                                {currencyType === CurrencyType.KRW && '달러'}
                                {currencyType === CurrencyType.USD && '원'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full grid grid-cols-2 gap-2">
                    <button type="button" className="btn btn-lg rounded-box" onClick={() => setIsEditMode(false)}>
                        취소
                    </button>
                    <button type="submit" className="btn btn-lg btn-scordi rounded-box" onClick={submitButtonClick}>
                        완료
                    </button>
                </div>
            </form>
        </div>
    );
});

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    labelText: string;
}

const Checkbox = forwardRef((props: CheckboxProps, ref: ForwardedRef<any>) => {
    const [id] = useId(1, 'CheckboxInput');
    const {labelText, ...inputProps} = props;

    return (
        <div className="form-control">
            <label className="cursor-pointer label justify-start gap-4" htmlFor={id}>
                <input id={id} ref={ref} type="checkbox" className="checkbox checkbox-info" {...inputProps} />
                <span className="label-text font-[500] text-[16px] relative top-[-2px]">{labelText}</span>
            </label>
        </div>
    );
});
