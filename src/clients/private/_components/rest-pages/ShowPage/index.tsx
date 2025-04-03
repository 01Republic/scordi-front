import React, {memo, useEffect, useRef} from 'react';
import {WithChildren} from '^types/global.type';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {Breadcrumb, BreadcrumbPath} from '^clients/private/_layouts/_shared/Breadcrumb';
import {useOrgIdParam} from '^atoms/common';
import {useRouter} from 'next/router';
import {TopLineBannerPortal} from '^components/util/TopLineBannerPortal';
import {TopLineBanner} from '^clients/private/_layouts/_shared/TopLineBanner';

interface ShowPageProps extends WithChildren {
    onReady?: () => any;
    breadcrumb?: BreadcrumbPath[];
}

export const ShowPage = memo((props: ShowPageProps) => {
    const {onReady, breadcrumb, children} = props;
    const orgId = useOrgIdParam();
    const router = useRouter();
    const bannerContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!router.isReady) return;
        onReady && onReady();
    }, [orgId, router.isReady]);

    return (
        <MainLayout>
            <div ref={bannerContainerRef} id="top-banner-container" className="relative h-0 overflow-visible" />
            <TopLineBannerPortal container={bannerContainerRef.current}>
                <TopLineBanner />
            </TopLineBannerPortal>
            <MainContainer>
                {breadcrumb && <Breadcrumb paths={breadcrumb} />}
                {children}
            </MainContainer>
        </MainLayout>
    );
});
ShowPage.displayName = 'ShowPage';
