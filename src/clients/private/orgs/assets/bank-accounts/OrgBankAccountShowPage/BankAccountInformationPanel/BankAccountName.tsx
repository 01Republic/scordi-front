import React, {memo} from 'react';
import {FormControl} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/FormControl';
import {EditableColumnProps} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/EditableColumnProps.interface';

export const BankAccountName = memo((props: EditableColumnProps<string>) => {
    const {value, defaultValue, onChange} = props;
    const {isEditMode, isLoading} = props;

    return (
        <FormControl label="이름">
            {isEditMode ? (
                <input
                    className={`input input-sm input-underline !bg-slate-100 w-full ${
                        isLoading ? 'opacity-50 pointer-events-none' : ''
                    }`}
                    defaultValue={defaultValue}
                    onChange={(e) => onChange(e.target.value)}
                    required
                />
            ) : (
                <div className="flex items-center h-[33.5px]" title={value}>
                    <span className="w-full whitespace-nowrap overflow-hidden text-ellipsis">{value}</span>
                </div>
            )}
            <span />
        </FormControl>
    );
});
