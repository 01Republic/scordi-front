import {useRouter} from 'next/router';
import React from 'react';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {PreLoader} from '^components/PreLoader';
import {MobileTopNav} from '^components/v2/MobileTopNav';
import {BackButton} from '^components/v2/ui/buttons/BackButton';

export const NewBillingHistoryPageRoute = {
    pathname: '/orgs/:id/apps/billingHistories/new',
    path: (id: number) => NewBillingHistoryPageRoute.pathname.replace(':id', `${id}`),
};

export default function NewBillingHistoryPage() {
    const router = useRouter();
    const organizationId = Number(router.query.id);

    if (!organizationId) return <PreLoader />;
    return (
        <>
            <MobileTopNav>
                <BackButton text="취소" />
            </MobileTopNav>

            {/*  TODO: 이 페이지 목업 누락되어 있음.  */}
        </>
    );
}

NewBillingHistoryPage.getLayout = getOrgMainLayout;
