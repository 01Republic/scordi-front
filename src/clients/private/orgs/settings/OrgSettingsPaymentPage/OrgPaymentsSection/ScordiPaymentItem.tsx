import {memo} from 'react';
import {ScordiPaymentDto, t_scordiPaymentStatus} from '^models/_scordi/ScordiPayment/type';
import {yyyy_mm_dd} from '^utils/dateTime';
import {ScordiPaymentItemNotionType} from './ScordiPaymentItemNotionType';

export type ScordiPaymentItemUIType = 'default' | 'notion' | 'github' | 'sentry';

export interface ScordiPaymentItemProps {
    scordiPayment: ScordiPaymentDto;
    isLast: boolean;
    version?: ScordiPaymentItemUIType;
}

export const ScordiPaymentItem = memo((props: ScordiPaymentItemProps) => {
    const {scordiPayment, isLast = false, version = 'default'} = props;

    const onClick = () => {
        // console.log(scordiPayment);
    };

    if (version === 'notion') return <ScordiPaymentItemNotionType scordiPayment={scordiPayment} isLast={isLast} />;

    const requestedAt = scordiPayment.requestedAt;

    return (
        <div
            className={`p-4 grid grid-cols-4 items-center text-14 ${isLast ? '' : 'border-b'}`}
            data-id={scordiPayment.id}
            onClick={onClick}
        >
            {/*결제 정보*/}
            <div>{scordiPayment.planName}</div>

            {/*결제일*/}
            <div>{requestedAt ? yyyy_mm_dd(requestedAt) : '-'}</div>

            {/*결제 구분*/}
            <div>{t_scordiPaymentStatus(scordiPayment.status)}</div>

            {/*결제 금액*/}
            <div>
                {scordiPayment.price.toLocaleString()}
                <span onClick={() => console.log(scordiPayment)}>원</span>
            </div>
        </div>
    );
});
ScordiPaymentItem.displayName = 'ScordiPaymentItem';
