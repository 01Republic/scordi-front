import React, {memo, useState} from 'react';
import {FaCheck} from 'react-icons/fa6';
import {CreditCardDto} from '^models/CreditCard/type';
import {CreditCardProfileOption2} from '^models/CreditCard/components';
import {enterToSpace} from '^components/util/keyDownLikeClick';
import {MoreButtonDropdown} from '^components/ui/inputs/MonoSelect/MoreButtonDropdown';
import {MoreButtonContent} from './MoreButtonContent';

interface SelectablePaymentMethodItemProps {
    item: CreditCardDto;
    onClick: () => any;
    isSelected: boolean;
    onSaved: () => any;
}

export const SelectablePaymentMethodItem = memo((props: SelectablePaymentMethodItemProps) => {
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
                <CreditCardProfileOption2 item={item} />
            </div>

            <div className="flex items-center gap-2">
                <div>{isSelected && <FaCheck className="text-scordi" />}</div>

                <div className={`${isHovered ? 'flex' : 'hidden'} items-center justify-center transition-all`}>
                    <MoreButtonDropdown>
                        <MoreButtonContent creditCard={item} onSaved={onSaved} />
                    </MoreButtonDropdown>
                </div>
            </div>
        </div>
    );
});
SelectablePaymentMethodItem.displayName = 'SelectablePaymentMethodItem';
