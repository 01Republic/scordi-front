import React, {useEffect, useState} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {CreateReviewCampaignRequestDto} from '^models/ReviewCampaign/type';
import {useReviewCampaignCreateStep} from '../atom';
import {StepCard, StepCardBody, StepSubmitButton} from '../components';
import {DatePicker} from './DatePicker';
import {TimePicker} from './TimePicker';
import {dayAfter} from '^utils/dateTime';

interface Props {
    form: UseFormReturn<CreateReviewCampaignRequestDto, any>;
    isLoading?: boolean;
}

export const RequestAddStep3 = ({form, isLoading}: Props) => {
    const {getStep, setFoldStep} = useReviewCampaignCreateStep();
    const [date, setDate] = useState<Date | undefined>(dayAfter(7));
    const [time, setTime] = useState<string>('10:00');
    const step = getStep(3);
    const {errors} = form.formState;
    const finishAt = form.watch('finishAt');

    useEffect(() => {
        setFinishAt(date, time);
    }, [date, time]);

    const setFinishAt = (date: Date | undefined, time: string) => {
        if (!date || !time) return false;
        const finishAt = new Date(date);
        const [hours, minutes] = time.split(':').map(Number);
        finishAt.setHours(hours, minutes);
        if (finishAt.getTime() <= new Date().getTime()) {
            form.setError('finishAt', {type: 'range', message: '과거 시점은 선택할 수 없어요.'});
        } else {
            form.clearErrors('finishAt');
        }
        form.setValue('finishAt', finishAt);
        return true;
    };

    return (
        <StepCard
            title="3. 제출 마감일 설정"
            isHidden={!!step?.hidden}
            isCurrent={!!step?.isFocused}
            isFolded={!!step?.folded}
            setIsFolded={(isFolded) => setFoldStep(3, isFolded)}
        >
            <StepCardBody>
                <div className={'flex flex-col gap-2'}>
                    <div className={'text-gray-500 text-14'} onClick={() => console.log(form.getValues())}>
                        마감일은 추후 변경 가능합니다.
                    </div>
                    <div className={'flex space-x-4 items-center'}>
                        <DatePicker date={finishAt} onSelect={setDate} disabled={{before: new Date()}} />
                        <TimePicker time={time} onSelect={setTime} />
                    </div>
                    <p className="text-error text-12">{errors.finishAt?.message}&nbsp;</p>
                </div>

                <div className={'flex justify-center space-x-4'}>
                    <StepSubmitButton
                        type="submit"
                        text="완료"
                        disabled={!!errors.finishAt?.message}
                        isLoading={isLoading}
                    />
                </div>
            </StepCardBody>
        </StepCard>
    );
};
