import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useQuery} from '@tanstack/react-query';
import {subscriptionApi} from '^models/Subscription/api';
import {unitFormat} from '^utils/number';
import {useCurrentOrg2} from '^models/Organization/hook';
import {WithChildren} from '^types/global.type';
import {Paginated} from '^types/utils/paginated.dto';

export const DashboardTitle = memo(function DashboardTitle() {
    const organizationId = useRecoilValue(orgIdParamState);
    const {currentOrg} = useCurrentOrg2();
    const {data, isFetched} = useQuery({
        queryKey: ['DashboardTitle', organizationId],
        queryFn: () => subscriptionApi.index({where: {organizationId}}).then((res) => res.data),
        enabled: !!organizationId && !isNaN(organizationId),
        initialData: Paginated.init(),
    });

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

const Title = ({children}: WithChildren) => <h1 className="font-bold text-3xl">{children}</h1>;
