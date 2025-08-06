import {useIdParam} from '^atoms/common';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {useReviewCampaign} from '^models/ReviewCampaign/hook';
import {OrgReviewCampaignListPageRoute} from '^pages/orgs/[id]/reviewCampaigns';
import {OrgReviewCampaignDetailPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]';
import {OrgReviewCampaignDetailChangesPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]/changes';
import {OrgReviewCampaignDetailSubmissionsPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]/submissions';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '^public/components/ui/breadcrumb';
import {WithChildren} from '^types/global.type';
import {useTranslation} from 'next-i18next';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {memo} from 'react';
import {ReviewCampaignControl} from './ReviewCampaignControl';

interface OrgReviewCampaignDetailLayoutProps extends WithChildren {
    className?: string;
    containerFluid?: boolean;
}

export const OrgReviewCampaignDetailLayout = memo((props: OrgReviewCampaignDetailLayoutProps) => {
    const {className = '', containerFluid = false, children} = props;

    const router = useRouter();
    const {t} = useTranslation('reviewCampaigns');
    const orgId = useIdParam('id');
    const id = useIdParam('reviewCampaignId');
    const {data: reviewCampaign} = useReviewCampaign(orgId, id);

    const isActive = (path: '' | 'submissions' | 'changes') => router.pathname.endsWith(path === '' ? ']' : path);

    return (
        <MainLayout>
            <MainContainer className={className} containerFluid={containerFluid}>
                <Breadcrumb className="mb-4">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={OrgReviewCampaignListPageRoute.path(orgId)}>
                                {t('layout.work')}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-primaryColor-900 font-medium">
                                {t('layout.requestDetail')}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="flex items-center mb-6">
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold">{reviewCampaign?.title}&nbsp;</h1>
                    </div>

                    <ReviewCampaignControl reviewCampaign={reviewCampaign} />
                </div>

                <div className="mb-8">
                    <nav className="border-b flex">
                        <Link
                            href={OrgReviewCampaignDetailPageRoute.path(orgId, id)}
                            className={`px-4 py-2 border-b-2 border-transparent text-14 font-medium transition-all ${
                                isActive('') ? 'border-scordi text-scordi' : 'text-gray-500 hover:text-scordi'
                            }`}
                        >
                            {t('layout.overview')}
                        </Link>
                        <Link
                            href={OrgReviewCampaignDetailSubmissionsPageRoute.path(orgId, id)}
                            className={`px-4 py-2 border-b-2 border-transparent text-14 font-medium transition-all ${
                                isActive('submissions')
                                    ? 'border-scordi text-scordi'
                                    : 'text-gray-500 hover:text-scordi'
                            }`}
                        >
                            {t('layout.submissions')}
                        </Link>
                        <Link
                            href={OrgReviewCampaignDetailChangesPageRoute.path(orgId, id)}
                            className={`px-4 py-2 border-b-2 border-transparent text-14 font-medium transition-all ${
                                isActive('changes') ? 'border-scordi text-scordi' : 'text-gray-500 hover:text-scordi'
                            }`}
                        >
                            {t('layout.results')}
                        </Link>
                    </nav>

                    {children}
                </div>
            </MainContainer>
        </MainLayout>
    );
});
