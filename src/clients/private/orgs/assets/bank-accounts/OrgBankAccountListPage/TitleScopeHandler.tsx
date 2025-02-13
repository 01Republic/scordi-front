import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {orgIdParamState} from '^atoms/common';
import {OrgCreditCardListPageRoute} from '^pages/orgs/[id]/creditCards';
import {OrgBankAccountListPageRoute} from '^pages/orgs/[id]/bankAccounts';

const TitleScopeHandler = memo(function TitleScopeHandler() {
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();

    const IsCreditCardListPage = router.pathname === OrgCreditCardListPageRoute.pathname;
    const IsBankAccountListPage = router.pathname === OrgBankAccountListPageRoute.pathname;

    const assets = [
        {title: '카드', path: OrgCreditCardListPageRoute.path(orgId), isActive: IsCreditCardListPage},
        {title: '계좌', path: OrgBankAccountListPageRoute.path(orgId), isActive: IsBankAccountListPage},
    ];

    return (
        <div className={'flex gap-4'}>
            {assets.map((asset) => (
                <Link href={asset.path} key={asset.title}>
                    <h1 className={`text-2xl ${!asset.isActive && 'text-gray-400'}`}>{asset.title}</h1>
                </Link>
            ))}
        </div>
    );
});

export default TitleScopeHandler;
