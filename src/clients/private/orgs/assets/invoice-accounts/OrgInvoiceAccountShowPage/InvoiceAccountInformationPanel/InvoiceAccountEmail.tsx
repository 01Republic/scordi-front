import React, {memo} from 'react';
import {EditableColumnProps} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/EditableColumnProps.interface';
import {FormControl} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/FormControl';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {InvoiceAccountProviderAvatar} from '^models/InvoiceAccount/components';

interface InvoiceAccountEmailProps extends EditableColumnProps<string> {
    invoiceAccount: InvoiceAccountDto;
}

export const InvoiceAccountEmail = memo((props: InvoiceAccountEmailProps) => {
    const {value, defaultValue, onChange} = props;
    const {invoiceAccount, isEditMode, isLoading} = props;
    const editable = invoiceAccount.isManuallyCreated;

    return (
        <FormControl label="이메일">
            {editable && isEditMode ? (
                <input
                    className={`input input-sm input-underline !bg-slate-100 w-full ${
                        isLoading ? 'opacity-50 pointer-events-none' : ''
                    }`}
                    defaultValue={defaultValue}
                    onChange={(e) => onChange(e.target.value)}
                    required
                />
            ) : (
                <div className="flex items-center gap-2 h-[33.5px]" title={value}>
                    {!invoiceAccount.isManuallyCreated && (
                        <InvoiceAccountProviderAvatar invoiceAccount={invoiceAccount} />
                    )}
                    <span className="w-full whitespace-nowrap overflow-hidden text-ellipsis">{value}</span>
                </div>
            )}
            <span />
        </FormControl>
    );
});
