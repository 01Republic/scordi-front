import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {ContentPanelBody, ContentPanelMiniTitle} from '^layouts/ContentLayout';
import {yyyy_mm_dd} from '^utils/dateTime';
import {fetchSubscriptionQueryById} from '^atoms/subscriptions.atom';
import {AiOutlineWarning} from '^components/react-icons';
import {ProductDto} from '^types/product.type';
import {useBillingList} from '^hooks/useBillingList';

export const BillingScheduleListPanel = memo(() => {
    const {selectedDate, billingHistories, billingSchedules} = useBillingList();

    return (
        <ContentPanelBody>
            <ContentPanelMiniTitle>
                On: <span>{yyyy_mm_dd(selectedDate)}</span>
            </ContentPanelMiniTitle>

            <ul className="menu bg-base-100 w-full p-2 rounded-box">
                {billingHistories &&
                    billingHistories.map((history, i) => (
                        <BillingScheduleItem
                            key={i}
                            proto={history.application ? history.application.product : history.invoiceApp!.product}
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
                            applicationId={schedule.applicationId}
                            date={new Date(schedule.billingDate)}
                            payAmount={schedule.unitPrice * schedule.paidMemberCount}
                            isPaid={schedule.isSuccess}
                            historyId={0}
                        />
                    ))}
            </ul>
        </ContentPanelBody>
    );
});

interface BillingScheduleItemPropsByApplicationId {
    applicationId: number;
    date: Date;
    payAmount: number;
    isPaid: boolean;
    historyId: number;
}

interface BillingScheduleItemPropsByProto {
    proto: ProductDto;
    date: Date;
    payAmount: number;
    isPaid: boolean;
    historyId: number;
}

type BillingScheduleItemProps = BillingScheduleItemPropsByApplicationId | BillingScheduleItemPropsByProto;
const BillingScheduleItem = memo((props: BillingScheduleItemProps) => {
    const {date, payAmount, isPaid, historyId} = props;
    const applicationId = 'applicationId' in props ? props.applicationId : null;
    const application = applicationId ? useRecoilValue(fetchSubscriptionQueryById(applicationId)) : undefined;
    const isOverdue = !isPaid && new Date().getTime() > date.getTime();
    let proto: ProductDto | undefined;
    if ('proto' in props) {
        proto = props.proto || application?.product;
    }

    if (!proto) return <></>;

    // const {product: proto} = application;

    return (
        <li className={`shadow-sm mb-2 ${historyId && 'bordered'}`}>
            <a className="bg-gray-100 text-gray-900 hover:bg-gray-200 block">
                <div className="flex gap-4 items-center">
                    <div>
                        <img src={proto.image} className="w-8" />
                    </div>
                    <div className="mr-auto">
                        <p className="font-semibold">{proto.name}</p>
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
                                        <AiOutlineWarning size={14} />
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
