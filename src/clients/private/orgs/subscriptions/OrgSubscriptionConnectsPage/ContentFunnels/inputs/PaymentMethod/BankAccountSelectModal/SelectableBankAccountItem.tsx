import React, {memo, useState} from 'react';
import {enterToSpace} from '^components/util/keyDownLikeClick';
import {BankAccountDto} from '^models/BankAccount/type';
import {BankAccountProfileOption2} from '^models/BankAccount/components';
import {Check} from 'lucide-react';

interface SelectableBankAccountItemProps {
    item: BankAccountDto;
    onClick: () => any;
    isSelected: boolean;
    onSaved: () => any;
}

export const SelectableBankAccountItem = memo((props: SelectableBankAccountItemProps) => {
    const {item, onClick, isSelected, onSaved} = props;
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
                <BankAccountProfileOption2 item={item} />
            </div>

            <div className="flex items-center gap-2">
                <div>{isSelected && <Check className="text-scordi" />}</div>
            </div>
        </div>
    );
});
SelectableBankAccountItem.displayName = 'SelectablePaymentMethodItem';
