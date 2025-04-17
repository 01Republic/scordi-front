import {useRouter} from 'next/router';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '^public/components/ui/breadcrumb';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {useIdParam} from '^atoms/common';
import Link from 'next/link';
import {OrgReviewCampaignDetailPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]';
import {OrgReviewCampaignDetailSubmissionsPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]/submissions';
import {OrgReviewCampaignDetailChangesPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]/changes';
import {useReviewCampaign} from '^models/ReviewCampaign/hook';
import {OrgReviewCampaignListPageRoute} from '^pages/orgs/[id]/reviewCampaigns';
import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {ReviewCampaignControl} from './ReviewCampaignControl';

interface OrgReviewCampaignDetailLayoutProps extends WithChildren {
    className?: string;
    containerFluid?: boolean;
}

export const OrgReviewCampaignDetailLayout = memo((props: OrgReviewCampaignDetailLayoutProps) => {
    const {className = '', containerFluid = false, children} = props;

    const router = useRouter();
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
                            <BreadcrumbLink href={OrgReviewCampaignListPageRoute.path(orgId)}>업무</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-primaryColor-900 font-medium">요청 상세</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="flex items-center mb-6">
                    <h1 className="text-3xl font-bold">{reviewCampaign?.title}</h1>

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
                            개요
                        </Link>
                        <Link
                            href={OrgReviewCampaignDetailSubmissionsPageRoute.path(orgId, id)}
                            className={`px-4 py-2 border-b-2 border-transparent text-14 font-medium transition-all ${
                                isActive('submissions')
                                    ? 'border-scordi text-scordi'
                                    : 'text-gray-500 hover:text-scordi'
                            }`}
                        >
                            제출현황
                        </Link>
                        <Link
                            href={OrgReviewCampaignDetailChangesPageRoute.path(orgId, id)}
                            className={`px-4 py-2 border-b-2 border-transparent text-14 font-medium transition-all ${
                                isActive('changes') ? 'border-scordi text-scordi' : 'text-gray-500 hover:text-scordi'
                            }`}
                        >
                            변경사항
                        </Link>
                    </nav>

                    {children}
                </div>
            </MainContainer>
        </MainLayout>
    );
});
