import {memo} from 'react';
import {SubscriptionDto} from '^types/subscription.type';
import {BsStats} from '^components/v2/Stats/Stats';
import {BsStat} from '^components/v2/Stats/Stat';
import {CurrentBill} from './summary/CurrentBill';
import {PaymentDue} from './summary/PaymentDue';
import {PaymentInfo} from './summary/PaymentInfo';

interface SummaryZoneProps {
    application: SubscriptionDto;
}

export const SummaryZone = memo((props: SummaryZoneProps) => {
    const {application} = props;

    return (
        <div className="bs-container mb-20">
            <BsStats className="bs-row shadow border">
                <BsStat className="bs-col-12 sm:bs-col">
                    <CurrentBill application={application} />
                </BsStat>

                <BsStat className="bs-col-12 sm:bs-col">
                    <PaymentDue application={application} />
                </BsStat>

                <BsStat className="bs-col-12 sm:bs-col">
                    <PaymentInfo application={application} />
                </BsStat>
            </BsStats>
        </div>
    );
});
