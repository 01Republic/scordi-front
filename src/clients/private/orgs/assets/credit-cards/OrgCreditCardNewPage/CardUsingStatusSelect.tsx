import React, {memo} from 'react';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {UnderlineDropdownSelect} from '^clients/private/_components/inputs/UnderlineDropdownSelect';
import {CreditCardUsingStatus} from '^models/CreditCard/type';
import {UsingStatusTag} from '^models/CreditCard/components';
import {CardAttrSelectPropsType} from './CardAttrSelectProps.type';

export const CardUsingStatusSelect = memo((props: CardAttrSelectPropsType<CreditCardUsingStatus>) => {
    const {defaultValue, onChange, isLoading = false} = props;

    return (
        <FormControl label="사용상태">
            <UnderlineDropdownSelect
                name="usingStatus"
                defaultValue={defaultValue}
                options={[
                    CreditCardUsingStatus.UnDef,
                    CreditCardUsingStatus.NoUse,
                    CreditCardUsingStatus.InUse,
                    CreditCardUsingStatus.Expired,
                ]}
                toComponent={(usingStatus: CreditCardUsingStatus) => <UsingStatusTag value={usingStatus} />}
                onChange={(usingStatus?: CreditCardUsingStatus) => {
                    onChange && onChange(usingStatus || CreditCardUsingStatus.UnDef);
                }}
                className={`${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
            />
        </FormControl>
    );
});
CardUsingStatusSelect.displayName = 'CardUsingStatusSelect';
