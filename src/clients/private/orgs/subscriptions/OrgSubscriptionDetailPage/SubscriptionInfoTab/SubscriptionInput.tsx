import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {useForm} from 'react-hook-form';
import {EmptyValue} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/EmptyValue';

interface CardSectionInputProps extends WithChildren {
    isEditMode?: boolean;
    label: string;
    defaultValue: string;
    registerValue: string;
}

export const CardSectionInput = memo((props: CardSectionInputProps) => {
    const {isEditMode, label, defaultValue, registerValue} = props;
    const form = useForm();
    const value = defaultValue.length === 0 ? <EmptyValue /> : defaultValue;

    return (
        <FormControl label={label}>
            {isEditMode ? (
                <input
                    className="w-full input border-gray-200 bg-gray-100 h-[50px]"
                    defaultValue={defaultValue}
                    {...form.register(registerValue)}
                />
            ) : (
                <div className="flex items-center h-[50px] font-normal text-16 text-slate-950">{value}</div>
            )}
            <span />
        </FormControl>
    );
});
