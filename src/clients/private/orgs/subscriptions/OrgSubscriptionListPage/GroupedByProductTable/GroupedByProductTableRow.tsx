import React, {memo, useState} from 'react';
import {ChevronDown, ChevronRight} from 'lucide-react';
import {SubscriptionDto} from '^models/Subscription/types';
import {ProductDto} from '^models/Product/type';
import {ProductProfile} from './ProductProfile';
import {GroupedSubscriptionTableRow} from './GroupedSubscriptionTableRow';
import {CheckboxHandler} from '^hooks/useCheckboxHandler';

interface GroupedByProductTableRowProps {
    product: ProductDto;
    reload: () => any;
    ch?: CheckboxHandler<SubscriptionDto>;
}

export const GroupedByProductTableRow = memo((props: GroupedByProductTableRowProps) => {
    const {product, ch, reload} = props;
    const [isOpen, setIsOpen] = useState(true);

    const hoverBgColor = 'group-hover:bg-scordi-light-50 transition-all';

    return (
        <>
            <tr>
                <td className={`pr-1 pl-3 text-start ${hoverBgColor}`} colSpan={11}>
                    <button
                        type="button"
                        className="flex gap-2 justify-center items-center"
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        {isOpen ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                        <ProductProfile product={product} />
                    </button>
                </td>
            </tr>
            {isOpen &&
                product.subscriptions?.map((subscription) => (
                    <GroupedSubscriptionTableRow
                        key={subscription.id}
                        subscription={subscription}
                        ch={ch}
                        reload={reload}
                    />
                ))}
        </>
    );
});
