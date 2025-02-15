import React, {memo} from 'react';
import {IsPersonalTag} from '^models/CreditCard/components';
import {UnderlineDropdownSelect} from '^clients/private/_components/inputs/UnderlineDropdownSelect';
import {FormControl} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/FormControl';
import {FormControlEmptyValue} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/FormControlEmptyValue';
import {EditableColumnProps} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/EditableColumnProps.interface';

export const BankAccountIsPersonal = memo((props: EditableColumnProps<boolean, true>) => {
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
                    {typeof value === 'boolean' ? <IsPersonalTag value={value} /> : <FormControlEmptyValue />}
                </div>
            )}
            <span />
        </FormControl>
    );
});
