import React, {memo} from 'react';
import {FormControl} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/FormControl';
import {EditableColumnProps} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/EditableColumnProps.interface';

interface BankAccountNumberProps extends EditableColumnProps<string> {
    displayValue: string;
}

export const BankAccountNumber = memo((props: BankAccountNumberProps) => {
    const {displayValue, value, defaultValue, onChange} = props;
    const {isEditMode, isLoading} = props;

    return (
        <FormControl label="계좌번호">
            {isEditMode ? (
                <input
                    type={'number'}
                    className={`input input-sm input-underline !bg-slate-100 w-full ${
                        isLoading ? 'opacity-50 pointer-events-none' : ''
                    }`}
                    defaultValue={defaultValue}
                    onChange={(e) => onChange(e.target.value)}
                    required
                />
            ) : (
                <div className="flex items-center h-[33.5px]" title={value}>
                    <span className="w-full whitespace-nowrap overflow-hidden text-ellipsis">{displayValue}</span>
                </div>
            )}
            <span />
        </FormControl>
    );
});
