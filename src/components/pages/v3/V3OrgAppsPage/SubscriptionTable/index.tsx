import {memo} from 'react';
import {SubscriptionTr} from './SubscriptionTr';
import {useRecoilValue} from 'recoil';
import {subscriptionsForCurrentOrgState} from '^v3/V3OrgAppsPage/atom';

export const SubscriptionTable = memo(function SubscriptionTable() {
    const subscriptions = useRecoilValue(subscriptionsForCurrentOrgState);

    return (
        <div className="card bg-white shadow">
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead className="top-[50px]">
                        <tr className="text-gray-500">
                            {/*<th className="bg-transparent"></th>*/}
                            <th className="bg-transparent">서비스</th>
                            <th className="bg-transparent text-center">상태</th>
                            <th className="bg-transparent">관리자 / 팀</th>
                            <th className="bg-transparent text-center">과금 방식</th>{' '}
                            {/* 태그들로 표시해 줄 것: 연, 고정, 사용량, 크레딧, 1인당 */}
                            <th className="bg-transparent text-right">사용인원</th>
                            <th className="bg-transparent text-right">최신 결제금액</th>
                            <th className="bg-transparent text-right">다음 결제일</th>
                            <th className="bg-transparent"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions.map((subscription, i) => (
                            <SubscriptionTr subscription={subscription} key={i} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});
