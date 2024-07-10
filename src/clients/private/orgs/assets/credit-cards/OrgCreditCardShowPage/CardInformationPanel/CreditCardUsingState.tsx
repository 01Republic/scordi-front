import React, {memo} from 'react';
import {UnderlineDropdownSelect} from '^clients/private/_components/inputs/UnderlineDropdownSelect';
import {UsingStatusTag} from '^models/CreditCard/components';
import {CreditCardUsingStatus} from '^models/CreditCard/type';
import {EditableColumnProps} from './EditableColumnProps.interface';
import {FormControl} from './FormControl';

export const CreditCardUsingState = memo((props: EditableColumnProps<CreditCardUsingStatus>) => {
    const {value, defaultValue, onChange} = props;
    const {isEditMode, isLoading} = props;

    return (
        <FormControl label="사용상태">
            {isEditMode ? (
                <UnderlineDropdownSelect
                    defaultValue={defaultValue}
                    options={[
                        CreditCardUsingStatus.UnDef,
                        CreditCardUsingStatus.NoUse,
                        CreditCardUsingStatus.InUse,
                        CreditCardUsingStatus.Expired,
                    ]}
                    toComponent={(usingStatus: CreditCardUsingStatus) => <UsingStatusTag value={usingStatus} />}
                    onChange={(usingStatus?: CreditCardUsingStatus) => {
                        onChange(usingStatus || CreditCardUsingStatus.UnDef);
                    }}
                    className={`${isLoading ? 'opacity-50 pointer-events-none' : ''} input-sm`}
                />
            ) : (
                <div className="flex items-center h-[33.5px]">{value && <UsingStatusTag value={value} />}</div>
            )}
        </FormControl>
    );
});
CreditCardUsingState.displayName = 'CreditCardUsingState';
