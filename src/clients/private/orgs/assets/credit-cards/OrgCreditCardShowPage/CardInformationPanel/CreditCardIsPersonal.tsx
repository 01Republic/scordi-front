import React, {memo} from 'react';
import {UnderlineDropdownSelect} from '^clients/private/_components/inputs/UnderlineDropdownSelect';
import {IsPersonalTag} from '^models/CreditCard/components';
import {FormControl} from './FormControl';
import {EditableColumnProps} from './EditableColumnProps.interface';

export const CreditCardIsPersonal = memo((props: EditableColumnProps<boolean, true>) => {
    const {value, defaultValue, onChange} = props;
    const {isEditMode, isLoading} = props;

    return (
        <FormControl label="구분">
            {isEditMode ? (
                <UnderlineDropdownSelect
                    defaultValue={defaultValue}
                    options={[true, false]}
                    toComponent={(isPersonal: boolean) => <IsPersonalTag value={isPersonal} />}
                    onChange={(isPersonal) => onChange(isPersonal)}
                    className={`${isLoading ? 'opacity-50 pointer-events-none' : ''} input-sm`}
                />
            ) : (
                <div className="flex items-center h-[33.5px]">
                    {typeof value === 'boolean' && <IsPersonalTag value={value} />}
                </div>
            )}
            <span />
        </FormControl>
    );
});
CreditCardIsPersonal.displayName = 'CreditCardIsPersonal';
