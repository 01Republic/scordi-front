import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {ContentPanelBody, ContentPanelMiniTitle} from '^layouts/ContentLayout';
import {yyyy_mm_dd} from '^utils/dateTime';
import {useBillingList} from '^hooks/useBillingHistories';
import {fetchApplicationQueryById} from '^atoms/applications.atom';
import {AiOutlineWarning} from 'react-icons/ai';

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
                            applicationId={history.applicationId}
                            date={new Date(history.paidAt)}
                            payAmount={history.paidAmount}
                            isPaid={history.isSuccess}
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

interface BillingScheduleItemProps {
    applicationId: number;
    date: Date;
    payAmount: number;
    isPaid: boolean;
    historyId: number;
}

const BillingScheduleItem = memo((props: BillingScheduleItemProps) => {
    const {applicationId, date, payAmount, isPaid, historyId} = props;
    const isOverdue = !isPaid && new Date().getTime() > date.getTime();
    const application = useRecoilValue(fetchApplicationQueryById(applicationId));

    if (!application) return <></>;

    const {prototype: proto} = application;

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
