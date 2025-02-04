import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {unitFormat} from '^utils/number';
import {useCurrentOrg2} from '^models/Organization/hook';
import {useWorkspaceSubscriptionCount} from '^models/Subscription/hook';
import {WithChildren} from '^types/global.type';

export const DashboardTitle = memo(function DashboardTitle() {
    const orgId = useRecoilValue(orgIdParamState);
    const {currentOrg} = useCurrentOrg2();
    const {data, isFetched} = useWorkspaceSubscriptionCount(orgId);

    const {totalItemCount} = data.pagination;

    if (!isFetched) return <Title />;
    if (totalItemCount) {
        return (
            <Title>
                {/*<span className="block">안녕하세요 {currentOrg?.name}님,</span>*/}
                <span className="block">총 {unitFormat(totalItemCount, '개')}의 구독서비스를 쓰고 있어요</span>
            </Title>
        );
    }

    return <Title>{currentOrg?.name}의 대시보드</Title>;
});

const Title = ({children}: WithChildren) => <h1 className="text-20 lg:text-24 font-bold xl:text-3xl">{children}</h1>;
