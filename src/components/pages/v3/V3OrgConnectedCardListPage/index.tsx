import React, {memo, useEffect} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {codefAccountIdParamState, orgIdParamState} from '^atoms/common';
import {codefAccountApi} from '^models/CodefAccount/api';
import {codefAccountAtom} from '^models/CodefAccount/atom';
import {cardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {V3MainLayout} from '^v3/layouts/V3MainLayout';
import {AccountCardListPageHeader} from './AccountCardListPageHeader';
import {NewCodefCardSection} from './NewCodefCardSection';

export const V3OrgConnectedCardListPage = memo(function V3OrgConnectedCardListPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const codefAccountId = useRecoilValue(codefAccountIdParamState);
    const setCodefAccount = useSetRecoilState(codefAccountAtom);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!codefAccountId || isNaN(codefAccountId)) return;

        codefAccountApi.show(orgId, codefAccountId).then((res) => setCodefAccount(res.data));
    }, [orgId, codefAccountId]);

    return (
        <V3MainLayout activeTabIndex={LNBIndex.Connects}>
            <CardListPage />
        </V3MainLayout>
    );
});

const CardListPage = memo(() => {
    const codefAccount = useRecoilValue(codefAccountAtom);
    const connectMethod = cardAccountsStaticData.find((data) => data.param === codefAccount?.organization);

    if (!connectMethod) return <></>;

    return (
        <div className="py-10 px-12">
            <AccountCardListPageHeader />

            <div className="py-12">
                {codefAccount && <NewCodefCardSection codefAccount={codefAccount} staticData={connectMethod} />}
            </div>
        </div>
    );
});
