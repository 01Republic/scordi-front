import React, {memo, useRef, useState} from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {enterToSpace} from '^components/util/keyDownLikeClick';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components/InvoiceAccountProfile';
import {FaCheck} from 'react-icons/fa6';
import {IoMdMore} from '^components/react-icons';
import Tippy from '@tippyjs/react/headless';
import {MoreButtonContent} from './MoreButtonContent';

interface SelectableInvoiceAccountProps {
    invoiceAccount: InvoiceAccountDto;
    onClick: () => any;
    isSelected: boolean;
    onSaved: () => any;
}

export const SelectableInvoiceAccount = memo((props: SelectableInvoiceAccountProps) => {
    const {invoiceAccount, onClick, isSelected, onSaved} = props;
    const ref = useRef<any>();
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
                <div>{isSelected && <FaCheck className="text-scordi" />}</div>

                <div className={`${isHovered ? 'flex' : 'hidden'} items-center justify-center transition-all`}>
                    <button
                        ref={ref}
                        type="button"
                        className="btn btn-xs btn-square normal-case !bg-white !border-gray-300 !text-gray-500 !rounded-md shadow hover:shadow-lg"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            return;
                        }}
                    >
                        <IoMdMore size={16} />
                    </button>
                    <Tippy
                        reference={ref}
                        placement="right-start"
                        appendTo={() => document.body}
                        interactive={true}
                        render={(attrs, content, instance) => (
                            <div
                                {...attrs}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    return;
                                }}
                            >
                                <MoreButtonContent invoiceAccount={invoiceAccount} onSaved={onSaved} />
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
});
SelectableInvoiceAccount.displayName = 'SelectableInvoiceAccount';
