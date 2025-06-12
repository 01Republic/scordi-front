import React, {memo} from 'react';
import {UseFormReturn, useWatch} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {SubscriptionDto, UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import Datepicker from 'react-tailwindcss-datepicker';
import {dateIsBeforeThen, intlDateLong, yyyy_mm_dd} from '^utils/dateTime';
import {EmptyValue} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/EmptyValue';

interface SubscriptionStartAtProps {
    isEditMode?: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
    subscription: SubscriptionDto;
}

export const SubscriptionStartAt = memo((props: SubscriptionStartAtProps) => {
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
        <FormControl label="구독시작일">
            {isEditMode ? (
                <Datepicker
                    inputClassName="input border-gray-200 bg-gray-100 w-full"
                    asSingle={true}
                    useRange={false}
                    value={{
                        startDate: startAt || null,
                        endDate: startAt || null,
                    }}
                    onChange={(newValue) => {
                        const startAt = newValue?.startDate;
                        if (startAt) {
                            if (finishAt && !dateIsBeforeThen(startAt, finishAt)) {
                                toast('종료일보다는 작아야 합니다.');
                                form.setValue('startAt', form.watch('startAt'));
                            } else {
                                form.setValue('startAt', new Date(yyyy_mm_dd(startAt)));
                            }
                        } else {
                            form.setValue('startAt', null);
                            form.setValue('finishAt', null);
                        }
                    }}
                />
            ) : (
                <div className="flex items-center" style={{height: '49.5px'}}>
                    {subscription?.startAt ? intlDateLong(subscription?.startAt) : <EmptyValue />}
                </div>
            )}
            <span />
        </FormControl>
    );
});
