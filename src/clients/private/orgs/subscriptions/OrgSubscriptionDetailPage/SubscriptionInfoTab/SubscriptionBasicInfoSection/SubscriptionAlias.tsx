import React, {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {WithChildren} from '^types/global.type';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {useCurrentSubscription} from '../../atom';
import {EmptyValue} from '../../EmptyValue';

interface CardSectionInputProps extends WithChildren {
    isEditMode?: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
    defaultValue?: string;
}

export const SubscriptionAlias = memo((props: CardSectionInputProps) => {
    const {isEditMode, form, defaultValue} = props;

    const value = defaultValue ? defaultValue : <EmptyValue />;

    return (
        <FormControl label="워크스페이스명">
            {isEditMode ? (
                <input
                    className="w-full input border-gray-200 bg-gray-100 h-[50px]"
                    defaultValue={defaultValue}
                    {...form.register('alias')}
                />
            ) : (
                <div className="flex items-center h-[50px] font-normal text-16 text-slate-950">{value}</div>
            )}
            <span />
        </FormControl>
    );
});
