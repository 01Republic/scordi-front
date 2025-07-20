import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {unitFormat} from '^utils/number';
import {useCurrentOrg2} from '^models/Organization/hook';
import {useWorkspaceSubscriptionCount} from '^models/Subscription/hook';
import {WithChildren} from '^types/global.type';
import {useTranslation} from 'next-i18next';

export const DashboardTitle = memo(function DashboardTitle() {
    const orgId = useRecoilValue(orgIdParamState);
    const {currentOrg} = useCurrentOrg2();
    const {data, isFetched} = useWorkspaceSubscriptionCount(orgId);
    const {t} = useTranslation('dashboard');

    const {totalItemCount} = data.pagination;

    if (!isFetched) return <Title />;
    if (totalItemCount) {
        return (
            <Title>
                {/*<span className="block">안녕하세요 {currentOrg?.name}님,</span>*/}
                <span className="block">{t('title.subscriptionCount', {count: totalItemCount})}</span>
            </Title>
        );
    }

    return <Title>{t('title.dashboard', {orgName: currentOrg?.name})}</Title>;
});

const Title = ({children}: WithChildren) => <h1 className="text-20 lg:text-24 font-bold xl:text-3xl">{children}</h1>;
