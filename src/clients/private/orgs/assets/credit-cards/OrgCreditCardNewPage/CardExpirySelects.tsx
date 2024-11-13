import React, {memo} from 'react';
import {rangeToArr} from '^utils/range';
import {zeroPad} from '^utils/number';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {UnderlineDropdownSelect} from '^clients/private/_components/inputs/UnderlineDropdownSelect';
import {CardAttrSelectPropsType} from './CardAttrSelectProps.type';

export const CardExpirySelects = memo((props: CardAttrSelectPropsType<string>) => {
    const {defaultValue = '', isLoading = false} = props;

    return (
        <FormControl label="유효기간">
            <div className="flex items-center gap-2">
                <div>년도</div>
                <div className="flex-1">
                    <UnderlineDropdownSelect
                        name="year"
                        maxHeight="200px"
                        options={rangeToArr(2024 - 10, 2024 + 10).map((n) => zeroPad(`${n}`, 4))}
                        className={`${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                        defaultValue={`20${defaultValue.slice(2, 4)}`}
                    />
                </div>
                <div className="px-2">/</div>
                <div>월</div>
                <div className="flex-1">
                    <UnderlineDropdownSelect
                        name="month"
                        maxHeight="200px"
                        options={rangeToArr(1, 12).map((n) => zeroPad(`${n}`, 2))}
                        className={`${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                        defaultValue={defaultValue.slice(0, 2)}
                    />
                </div>
            </div>
        </FormControl>
    );
});
CardExpirySelects.displayName = 'CardExpirySelects';
