import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {V3MainLayout, V3MainLayoutContainer} from '^v3/layouts/V3MainLayout';
import {LNBIndex} from '^v3/share/LeftNavBar';

interface V3OrgAppsPageProps extends WithChildren {}

export const V3OrgAppsPage = memo((props: V3OrgAppsPageProps) => {
    const {children} = props;

    return (
        <V3MainLayout activeTabIndex={LNBIndex.Subscriptions}>
            <V3MainLayoutContainer>
                <section className="mb-6">
                    <h1>구독리스트</h1>
                </section>
            </V3MainLayoutContainer>
        </V3MainLayout>
    );
});
