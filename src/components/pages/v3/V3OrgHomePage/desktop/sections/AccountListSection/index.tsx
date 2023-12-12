import React, {memo} from 'react';
import {Panel} from '^v3/V3OrgHomePage/desktop/Panel';
import {Section} from '^v3/V3OrgHomePage/desktop/Section';
import {V3OrgAccountListPageRoute} from '^pages/v3/orgs/[orgId]/accounts';
import {MoreButton} from '^v3/V3OrgHomePage/desktop/MoreButton';
import {useSafePathInCurrentOrg} from '^hooks/useSafePath';

export const AccountListSection = memo(function AccountListSection() {
    const {safePath} = useSafePathInCurrentOrg();

    return (
        <Section
            title={
                <>
                    <span className="text-black">
                        <b>{0}</b>개
                    </span>
                    의 계정을 보관하고 있어요
                </>
            }
            titleButtons={[<MoreButton href={safePath((org) => V3OrgAccountListPageRoute.path(org.id))} />]}
        >
            <Panel></Panel>
        </Section>
    );
});
