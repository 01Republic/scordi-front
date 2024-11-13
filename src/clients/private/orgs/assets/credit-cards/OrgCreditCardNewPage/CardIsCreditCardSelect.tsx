import React, {memo} from 'react';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {UnderlineDropdownSelect} from '^clients/private/_components/inputs/UnderlineDropdownSelect';
import {IsCreditCardTag} from '^models/CreditCard/components';
import {CardAttrSelectPropsType} from './CardAttrSelectProps.type';

export const CardIsCreditCardSelect = memo((props: CardAttrSelectPropsType<boolean>) => {
    const {defaultValue, onChange, isLoading = false} = props;

    return (
        <FormControl label="종류">
            <UnderlineDropdownSelect
                name="isCreditCard"
                defaultValue={defaultValue}
                options={[true, false]}
                toComponent={(isCreditCard: boolean) => <IsCreditCardTag value={isCreditCard} />}
                onChange={onChange}
                className={`${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
            />
        </FormControl>
    );
});
CardIsCreditCardSelect.displayName = 'CardIsCreditCardSelect';
