import React, {memo, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {ChevronDown, ChevronRight} from 'lucide-react';
import {ProductDto} from '^models/Product/type';
import {checkedSubscriptionList, visibleColumnsState} from '../atom';
import {ProductProfile} from './ProductProfile';
import {GroupedSubscriptionTableRow} from './GroupedSubscriptionTableRow';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {currencyFormat} from '^utils/number';
import {allColumnIds, ColumnId} from '../TableColumnsHandler/tableColumns';

interface GroupedByProductTableRowProps {
    product: ProductDto;
    reload: () => any;
}

export const GroupedByProductTableRow = memo((props: GroupedByProductTableRowProps) => {
    const {product, reload} = props;
    const [checkedItems, setCheckedItems] = useRecoilState(checkedSubscriptionList);
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const visible = useRecoilValue(visibleColumnsState);
    const visibleSet = new Set(visible);
    const [isOpen, setIsOpen] = useState(true);

    const hoverBgColor = 'group-hover:bg-scordi-light-50 transition-all';

    const symbol = getCurrencySymbol(displayCurrency);

    const totalSubscriptionAmountByProduct =
        product.subscriptions?.reduce(
            (sum, subscription) => sum + (subscription.currentBillingAmount?.toDisplayPrice(displayCurrency) || 0),
            0,
        ) || 0;

    const row: Record<ColumnId, React.ReactNode> = {
        checkBox: (
            <td className={`pr-1 pl-3 text-start ${hoverBgColor}`} colSpan={1}>
                <button
                    type="button"
                    className="flex gap-2 justify-center items-center"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    {isOpen ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                </button>
            </td>
        ),
        subscriptionName: (
            <td className={`pr-1 pl-3 text-start ${hoverBgColor}`} colSpan={2}>
                <button
                    type="button"
                    className="flex gap-2 justify-center items-center"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    {/*{isOpen ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}*/}
                    <ProductProfile product={product} />
                </button>
            </td>
        ),
        team: <td />,
        status: <td />,
        billingCycle: <td />,
        // "payingType",
        amount: (
            <td className={`text-right ${hoverBgColor}`} colSpan={1}>
                <div className="text-sm">
                    <small className="mr-1">{symbol}</small>
                    <span>{currencyFormat(totalSubscriptionAmountByProduct, '')}</span>
                </div>
            </td>
        ),
        lastPaidAt: <td />,
        memberCount: <td />,
        payMethod: <td />,
        master: <td />,
        note: <td />,
        actions: <td />,
    };

    return (
        <>
            <tr>
                {allColumnIds
                    .filter((id) => visibleSet.has(id))
                    .map((id) => (
                        <React.Fragment key={id}>{row[id]}</React.Fragment>
                    ))}
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
