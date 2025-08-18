import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {EmptyValue} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/EmptyValue';
import {SubscriptionDto, UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {dateIsBeforeThen, intlDateLong, yyyy_mm_dd} from '^utils/dateTime';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {UseFormReturn, useWatch} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import Datepicker from 'react-tailwindcss-datepicker';

interface SubscriptionFinishAtProps {
    isEditMode?: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
    subscription: SubscriptionDto;
}

export const SubscriptionFinishAt = memo((props: SubscriptionFinishAtProps) => {
    const {t} = useTranslation('subscription');
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
        <FormControl label={t('detail.paymentInfo.endDate')}>
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
                                        toast(t('detail.paymentInfo.dateValidation.startDateFirst'));
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
                        <div onClick={() => toast(t('detail.paymentInfo.dateValidation.setStartDateFirst'))}>
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
