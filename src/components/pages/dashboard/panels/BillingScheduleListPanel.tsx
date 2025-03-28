import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {ContentPanelBody, ContentPanelMiniTitle} from '^layouts/ContentLayout';
import {yyyy_mm_dd} from '^utils/dateTime';
import {fetchSubscriptionQueryById} from '^models/Subscription/atom';
import {ProductDto} from '^models/Product/type';
import {useBillingList} from '^hooks/useBillingList';
import {AlertCircle} from 'lucide-react';

export const BillingScheduleListPanel = memo(() => {
    const {selectedDate, billingHistories, billingSchedules} = useBillingList();

    return (
        <ContentPanelBody>
            <ContentPanelMiniTitle>
                On: <span>{yyyy_mm_dd(selectedDate || new Date())}</span>
            </ContentPanelMiniTitle>

            <ul className="menu bg-base-100 w-full p-2 rounded-box">
                {billingHistories &&
                    billingHistories.map((history, i) => (
                        <BillingScheduleItem
                            key={i}
                            product={history.subscription ? history.subscription.product : history.invoiceApp!.product!}
                            date={new Date(history.paidAt!)}
                            payAmount={history.payAmount?.amount || 0}
                            isPaid={!!history.paidAt}
                            historyId={history.id}
                        />
                    ))}
                {billingSchedules &&
                    billingSchedules.map((schedule, i) => (
                        <BillingScheduleItem
                            key={i}
                            subscriptionId={schedule.subscriptionId}
                            date={new Date(schedule.billingDate)}
                            payAmount={schedule.payAmount?.amount || 0}
                            isPaid={schedule.isDead}
                            historyId={0}
                        />
                    ))}
            </ul>
        </ContentPanelBody>
    );
});

interface BillingScheduleItemPropsByApplicationId {
    subscriptionId: number;
    date: Date;
    payAmount: number;
    isPaid: boolean;
    historyId: number;
}

interface BillingScheduleItemPropsByProto {
    product: ProductDto;
    date: Date;
    payAmount: number;
    isPaid: boolean;
    historyId: number;
}

type BillingScheduleItemProps = BillingScheduleItemPropsByApplicationId | BillingScheduleItemPropsByProto;
const BillingScheduleItem = memo((props: BillingScheduleItemProps) => {
    const {date, payAmount, isPaid, historyId} = props;
    const subscriptionId = 'subscriptionId' in props ? props.subscriptionId : null;
    const subscription = subscriptionId ? useRecoilValue(fetchSubscriptionQueryById(subscriptionId)) : undefined;
    const isOverdue = !isPaid && new Date().getTime() > date.getTime();
    let product: ProductDto | undefined;
    if ('product' in props) {
        product = props.product || subscription?.product;
    }

    if (!product) return <></>;

    // const {product: proto} = application;

    return (
        <li className={`shadow-sm mb-2 ${historyId && 'bordered'}`}>
            <a className="bg-gray-100 text-gray-900 hover:bg-gray-200 block">
                <div className="flex gap-4 items-center">
                    <div>
                        <img src={product.image} className="w-8" />
                    </div>
                    <div className="mr-auto">
                        <p className="font-semibold">{product.nameEn}</p>
                        <p className="text-xs text-gray-500">
                            {yyyy_mm_dd(date)}{' '}
                            {historyId ? <span className="font-medium">(Recorded: #{historyId})</span> : ''}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-right font-semibold bg-white inline px-0 pt-1 pb-0">
                            {isOverdue && (
                                <span className="text-error flex gap-2 items-center justify-end">
                                    <span className="inline">
                                        <AlertCircle size={14} />
                                    </span>
                                    <span>결제기한이 지났어요!</span>
                                </span>
                            )}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold">US${payAmount}</p>
                    </div>
                </div>
            </a>
        </li>
    );
});
