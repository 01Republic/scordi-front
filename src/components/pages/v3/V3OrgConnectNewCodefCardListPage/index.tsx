import React, {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {codefAccountIdParamState, orgIdParamState} from '^atoms/common';
import {codefAccountAtom} from '^models/CodefAccount/atom';
import {codefAccountApi} from '^models/CodefAccount/api';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {NewCodefCardListPage} from './NewCodefCardListPage';
import {V3MainLayout} from '^v3/layouts/V3MainLayout';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {useNewCodefCards} from '^models/CodefCard/hook';

export const V3OrgConnectNewCodefCardListPage = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const codefAccountId = useRecoilValue(codefAccountIdParamState);
    const [codefAccount, setCodefAccount] = useRecoilState(codefAccountAtom);
    const {search} = useNewCodefCards(codefAccountIdParamState);
    const staticData = CardAccountsStaticData.findOne(codefAccount?.organization);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!codefAccountId || isNaN(codefAccountId)) return;

        codefAccountApi.show(orgId, codefAccountId).then((res) => setCodefAccount(res.data));

        search(
            {
                where: {accountId: codefAccountId, isSleep: false},
                sync: false,
                connected: false,
            },
            false,
            true,
        );
    }, [orgId, codefAccountId]);

    if (!staticData) return <></>;

    return (
        <V3MainLayout activeTabIndex={LNBIndex.Connects} modals={[]}>
            <NewCodefCardListPage />
        </V3MainLayout>
    );
});
V3OrgConnectNewCodefCardListPage.displayName = 'V3OrgConnectNewCodefCardListPage';
