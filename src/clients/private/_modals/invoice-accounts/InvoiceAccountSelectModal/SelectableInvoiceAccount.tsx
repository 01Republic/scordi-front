import React, {memo, useState} from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {enterToSpace} from '^components/util/keyDownLikeClick';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components/InvoiceAccountProfile';
import {MoreButtonContent} from './MoreButtonContent';
import {MoreButtonDropdown} from '^components/ui/inputs/MonoSelect/MoreButtonDropdown';
import {Check} from 'lucide-react';

interface SelectableInvoiceAccountProps {
    invoiceAccount: InvoiceAccountDto;
    onClick: () => any;
    isSelected: boolean;
    onSaved: () => any;
}

export const SelectableInvoiceAccount = memo((props: SelectableInvoiceAccountProps) => {
    const {invoiceAccount, onClick, isSelected, onSaved} = props;
    const [isHovered, setHovered] = useState(false);
    const hoverIn = () => setHovered(true);
    const hoverOut = () => setHovered(false);

    return (
        <div
            tabIndex={0}
            className={`-mx-4 px-4 py-2.5 cursor-pointer ${
                isHovered ? 'bg-gray-100' : 'bg-white'
            } flex items-center justify-between rounded-box btn-animation`}
            onKeyDown={enterToSpace(onClick)}
            onClick={onClick}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
        >
            <div>
                <InvoiceAccountProfile invoiceAccount={invoiceAccount} />
            </div>

            <div className="flex items-center gap-2">
                <div>{isSelected && <Check className="text-scordi" />}</div>

                <div className={`${isHovered ? 'flex' : 'hidden'} items-center justify-center transition-all`}>
                    <MoreButtonDropdown>
                        {({hide}) => (
                            <MoreButtonContent
                                invoiceAccount={invoiceAccount}
                                onClick={() => hide && hide()}
                                onSaved={onSaved}
                            />
                        )}
                    </MoreButtonDropdown>
                </div>
            </div>
        </div>
    );
});
SelectableInvoiceAccount.displayName = 'SelectableInvoiceAccount';
