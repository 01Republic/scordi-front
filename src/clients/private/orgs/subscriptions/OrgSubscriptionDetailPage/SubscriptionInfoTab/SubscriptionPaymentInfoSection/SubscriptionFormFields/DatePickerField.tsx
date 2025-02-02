import React from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import {intlDateLong, yyyy_mm_dd} from '^utils/dateTime';
import {FormControl} from '^clients/private/_components/inputs/FormControl';

interface DatepickerFieldProps {
    label: string;
    isEditMode: boolean;
    form: any;
    field: string;
    subscription: any;
}

export const DatepickerField = (props: DatepickerFieldProps) => {
    const {label, isEditMode, form, field, subscription} = props;

    return (
        <FormControl label={label}>
            {isEditMode ? (
                <Datepicker
                    inputClassName="input border-gray-200 bg-gray-100 w-full"
                    asSingle
                    useRange={false}
                    startFrom={form.watch(field) || subscription[field] || null}
                    value={{
                        startDate: form.watch(field) || subscription[field] || null,
                        endDate: form.watch(field) || subscription[field] || null,
                    }}
                    onChange={(newValue) => {
                        if (!newValue?.startDate) form.setValue(field, null);
                        if (newValue?.startDate) form.setValue(field, new Date(yyyy_mm_dd(newValue.startDate)));
                    }}
                />
            ) : (
                <div className="flex items-center min-h-12">
                    {subscription[field] ? intlDateLong(subscription[field]) : '-'}
                </div>
            )}
        </FormControl>
    );
};
