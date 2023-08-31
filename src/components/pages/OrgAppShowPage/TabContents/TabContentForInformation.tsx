import {memo} from 'react';
import {useRouter} from 'next/router';
import {useCurrentSubscription} from '^hooks/useSubscriptions';
import {SummaryZone} from './information/SummaryZone';
import {CurrentPlanZone} from './information/CurrentPlanZone';
import {PaymentInfoZone} from '^components/pages/OrgAppShowPage/TabContents/information/PaymentInfoZone';

/**
 * 구독에 대해서 알고 싶은 정보 (또는 알아야 하는 정보)
 *
 * 연동을 언제 시작 했는지?
 * 연동 대기하는 중인지, 연동이 완료 됐는지.
 * 마지막 동기화 언제 됐는지?
 * 결제 인보이스가 어느 이메일로 오는지?
 * 지금 사용하고 있는 건지?
 * 이번 달에 내야 할 돈이 얼마인지?
 * 지난 달에 얼마 냈는지?
 * 구독 플랜이 무엇인지?
 * 언제 결제 될 예정인지?
 * 마지막 결제는 언제 됐는지?
 * 이 구독을 몇 명이 쓰고 있는지?
 */

export const TabContentForInformation = memo(() => {
    const {currentSubscription: app} = useCurrentSubscription();

    if (!app) return <></>;

    return (
        <>
            <SummaryZone application={app} />
            <CurrentPlanZone application={app} />
            {/*<PaymentInfoZone application={app} />*/}
        </>
    );
});
