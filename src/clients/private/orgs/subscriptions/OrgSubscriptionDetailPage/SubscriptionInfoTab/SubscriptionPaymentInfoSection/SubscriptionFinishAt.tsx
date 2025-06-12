import React, {memo} from 'react';
import {UseFormReturn, useWatch} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import Datepicker from 'react-tailwindcss-datepicker';
import {dateIsBeforeThen, intlDateLong, yyyy_mm_dd} from '^utils/dateTime';
import {SubscriptionDto, UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {EmptyValue} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/EmptyValue';

interface SubscriptionFinishAtProps {
    isEditMode?: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
    subscription: SubscriptionDto;
}

export const SubscriptionFinishAt = memo((props: SubscriptionFinishAtProps) => {
    const {isEditMode, form, subscription} = props;

    const startAt = useWatch({
        control: form.control,
        name: 'startAt',
        defaultValue: subscription.startAt,
    });

    const finishAt = useWatch({
        control: form.control,
        name: 'finishAt',
        defaultValue: subscription.finishAt,
    });

    return (
        <FormControl label="구독종료일">
            {isEditMode ? (
                <>
                    {startAt ? (
                        <Datepicker
                            inputClassName="input border-gray-200 bg-gray-100 w-full"
                            asSingle={true}
                            useRange={false}
                            value={{
                                startDate: finishAt || null,
                                endDate: finishAt || null,
                            }}
                            onChange={(newValue) => {
                                const newFinishAt = newValue?.startDate;
                                if (newFinishAt) {
                                    if (startAt && !dateIsBeforeThen(startAt, newFinishAt)) {
                                        toast('시작일보다는 커야 합니다.');
                                        form.setValue('finishAt', finishAt);
                                    } else {
                                        form.setValue('finishAt', new Date(yyyy_mm_dd(newFinishAt)));
                                    }
                                } else {
                                    form.setValue('finishAt', null);
                                }
                            }}
                        />
                    ) : (
                        <div onClick={() => toast('시작일을 먼저 설정해주세요.')}>
                            <input
                                className="input border-gray-200 bg-gray-100 w-full cursor-pointer"
                                placeholder="YYYY-MM-DD"
                                readOnly
                            />
                        </div>
                    )}
                </>
            ) : (
                <div className="flex items-center" style={{height: '49.5px'}}>
                    {subscription?.finishAt ? intlDateLong(subscription?.finishAt) : <EmptyValue />}
                </div>
            )}
        </FormControl>
    );
});
