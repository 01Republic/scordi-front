import React, {memo} from 'react';
import {FormControl} from './FormControl';
import {EditableColumnProps} from './EditableColumnProps.interface';
import {UnderlineDropdownSelect} from '^clients/private/_components/inputs/UnderlineDropdownSelect';
import {IsCreditCardTag} from '^models/CreditCard/components';

export const CreditCardIsCreditCard = memo((props: EditableColumnProps<boolean, true>) => {
    const {value, defaultValue, onChange} = props;
    const {isEditMode, isLoading} = props;

    return (
        <FormControl label="종류">
            {isEditMode ? (
                <UnderlineDropdownSelect
                    defaultValue={defaultValue}
                    options={[true, false]}
                    toComponent={(isCreditCard: boolean) => <IsCreditCardTag value={isCreditCard} />}
                    onChange={(isCreditCard) => onChange(isCreditCard)}
                    className={`${isLoading ? 'opacity-50 pointer-events-none' : ''} input-sm`}
                />
            ) : (
                <div className="flex items-center h-[33.5px]">
                    {typeof value === 'boolean' && <IsCreditCardTag value={value} />}
                </div>
            )}
            <span />
        </FormControl>
    );
});
