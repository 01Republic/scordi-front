import React, {memo, useEffect} from 'react';
import {WithChildren} from '^types/global.type';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {Breadcrumb, BreadcrumbPath} from '^clients/private/_layouts/_shared/Breadcrumb';
import {useOrgIdParam} from '^atoms/common';
import {useRouter} from 'next/router';

interface ShowPageProps extends WithChildren {
    onReady?: () => any;
    breadcrumb?: BreadcrumbPath[];
}

export const ShowPage = memo((props: ShowPageProps) => {
    const {onReady, breadcrumb, children} = props;
    const orgId = useOrgIdParam();
    const router = useRouter();

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!router.isReady) return;
        onReady && onReady();
    }, [orgId, router.isReady]);

    return (
        <MainLayout>
            <div id="page-flash" className="relative" />
            <MainContainer>
                {breadcrumb && <Breadcrumb paths={breadcrumb} />}
                {children}
            </MainContainer>
        </MainLayout>
    );
});
ShowPage.displayName = 'ShowPage';
