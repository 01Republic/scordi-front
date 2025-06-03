import React, {memo} from 'react';
import {padStart} from 'lodash';
import {rangeToArr} from '^utils/range';
import {UnderlineDropdownSelect} from '^clients/private/_components/inputs/UnderlineDropdownSelect';
import {FormControl} from './FormControl';
import {FormControlEmptyValue} from './FormControlEmptyValue';

interface CreditCardExpiryProps {
    isEditMode: boolean;
    isLoading: boolean;
    value?: string;
    defaultValue: string[];
    onYearChange: (val: string) => any;
    onMonthChange: (val: string) => any;
}

export const CreditCardExpiry = memo((props: CreditCardExpiryProps) => {
    const {isLoading, isEditMode} = props;
    const {value, defaultValue, onYearChange, onMonthChange} = props;

    return (
        <FormControl label="유효기간">
            {isEditMode ? (
                <div className="grid grid-cols-2 items-center gap-2">
                    <div className="flex items-center gap-1">
                        <div>년</div>
                        <div className="flex-auto">
                            <UnderlineDropdownSelect
                                defaultValue={defaultValue[0] ? parseInt(`${defaultValue[0]}`) : undefined}
                                options={rangeToArr(2024 - 10, 2024 + 10)}
                                onChange={(year?: number) => {
                                    if (typeof year === 'undefined') return;
                                    onYearChange(`${year}`);
                                }}
                                className={`${isLoading ? 'opacity-50 pointer-events-none' : ''} input-sm`}
                                maxHeight="200px"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <div>월</div>
                        <div className="flex-auto">
                            <UnderlineDropdownSelect
                                defaultValue={defaultValue[1] ? parseInt(`${defaultValue[1]}`) : undefined}
                                options={rangeToArr(1, 12)}
                                onChange={(month?: number) => {
                                    if (typeof month === 'undefined') return;
                                    onMonthChange(padStart(`${month}`, 2, '0'));
                                }}
                                className={`${isLoading ? 'opacity-50 pointer-events-none' : ''} input-sm`}
                                maxHeight="200px"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center h-[33.5px]">
                    {value ? (
                        <div className="flex items-center gap-0.5">
                            <div>{value.slice(0, 2)}</div>
                            <small>/</small>
                            <div>{value.slice(2, 4)}</div>
                        </div>
                    ) : (
                        <FormControlEmptyValue />
                    )}
                </div>
            )}
            <span />
        </FormControl>
    );
});
CreditCardExpiry.displayName = 'CreditCardExpiry';
