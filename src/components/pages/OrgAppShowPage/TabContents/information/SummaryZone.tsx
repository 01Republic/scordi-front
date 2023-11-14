import {memo} from 'react';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {BsStats} from '^components/v2/Stats/Stats';
import {BsStat} from '^components/v2/Stats/Stat';
import {CurrentBill} from './summary/CurrentBill';
import {PaymentDue} from './summary/PaymentDue';
import {PaymentInfo} from './summary/PaymentInfo';

interface SummaryZoneProps {
    subscription: SubscriptionDto;
}

export const SummaryZone = memo((props: SummaryZoneProps) => {
    const {subscription} = props;

    return (
        <div className="bs-container mb-20">
            <BsStats className="bs-row shadow border">
                <BsStat className="bs-col-12 sm:bs-col">
                    <CurrentBill subscription={subscription} />
                </BsStat>

                <BsStat className="bs-col-12 sm:bs-col">
                    <PaymentDue subscription={subscription} />
                </BsStat>

                <BsStat className="bs-col-12 sm:bs-col">
                    <PaymentInfo subscription={subscription} />
                </BsStat>
            </BsStats>
        </div>
    );
});
