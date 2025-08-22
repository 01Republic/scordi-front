import React, {memo, useState} from 'react';
import {useRecoilState} from 'recoil';
import {ChevronDown, ChevronRight} from 'lucide-react';
import {ProductDto} from '^models/Product/type';
import {checkedSubscriptionList} from '../atom';
import {ProductProfile} from './ProductProfile';
import {GroupedSubscriptionTableRow} from './GroupedSubscriptionTableRow';

interface GroupedByProductTableRowProps {
    product: ProductDto;
    reload: () => any;
}

export const GroupedByProductTableRow = memo((props: GroupedByProductTableRowProps) => {
    const {product, reload} = props;
    const [checkedItems, setCheckedItems] = useRecoilState(checkedSubscriptionList);
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
                product.subscriptions?.map((subscription) => {
                    const isChecked = checkedItems.map((i) => i.id).includes(subscription.id);
                    return (
                        <GroupedSubscriptionTableRow
                            key={subscription.id}
                            subscription={subscription}
                            // ch={ch}
                            reload={reload}
                            isChecked={isChecked}
                            onCheck={(checked) => {
                                checked
                                    ? setCheckedItems([...checkedItems, subscription])
                                    : setCheckedItems((prev) => prev.filter((i) => i.id !== subscription.id));
                            }}
                        />
                    );
                })}
        </>
    );
});
