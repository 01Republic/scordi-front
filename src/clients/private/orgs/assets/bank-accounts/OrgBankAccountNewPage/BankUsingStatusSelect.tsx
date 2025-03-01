import React, {memo} from 'react';
import {UsingStatusTag} from '^models/CreditCard/components';
import {BankAccountUsingStatus} from '^models/BankAccount/type';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {UnderlineDropdownSelect} from '^clients/private/_components/inputs/UnderlineDropdownSelect';

export interface BankAttrSelectPropsType<T> {
    defaultValue?: T;
    onChange?: (option?: T) => any;
    isLoading?: boolean;
}

export const BankUsingStatusSelect = memo((props: BankAttrSelectPropsType<BankAccountUsingStatus>) => {
    const {defaultValue, onChange, isLoading = false} = props;

    return (
        <FormControl label="사용상태">
            <UnderlineDropdownSelect
                name="usingStatus"
                defaultValue={defaultValue}
                options={[
                    BankAccountUsingStatus.UnDef,
                    BankAccountUsingStatus.NoUse,
                    BankAccountUsingStatus.InUse,
                    BankAccountUsingStatus.Expired,
                ]}
                toComponent={(usingStatus: BankAccountUsingStatus) => <UsingStatusTag value={usingStatus} />}
                onChange={(usingStatus?: BankAccountUsingStatus) => {
                    onChange && onChange(usingStatus || BankAccountUsingStatus.UnDef);
                }}
                className={`${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
            />
        </FormControl>
    );
});
BankUsingStatusSelect.displayName = 'BankUsingStatusSelect';
