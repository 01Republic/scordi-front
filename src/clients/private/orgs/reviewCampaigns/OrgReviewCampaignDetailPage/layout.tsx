import {useRouter} from 'next/router';
import {Button} from '^public/components/ui/button';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '^public/components/ui/breadcrumb';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {cn} from '^public/lib/utils';
import {useIdParam} from '^atoms/common';
import Link from 'next/link';
import {OrgReviewCampaignDetailPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]';
import {OrgReviewCampaignDetailSubmissionsPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]/submissions';
import {OrgReviewCampaignDetailChangesPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]/changes';
import {LoadableBox, Spinner} from '^components/util/loading';
import {useReviewCampaign} from '^models/ReviewCampaign/hook';
import {OrgReviewCampaignListPageRoute} from '^pages/orgs/[id]/reviewCampaigns';
import {reviewCampaignApi} from '^models/ReviewCampaign/api';
import {confirm2, confirmed} from '^components/util/dialog';
import toast from 'react-hot-toast';
import {errorToast} from '^api/api';
import {memo} from 'react';
import {WithChildren} from '^types/global.type';

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

    const handleConfirm = async () => {
        if (!isActive('changes')) return router.push(OrgReviewCampaignDetailChangesPageRoute.path(orgId, id));

        const sync = () => confirm2('변경사항을 모두 승인하시겠습니까?');
        confirmed(sync())
            .then(() => reviewCampaignApi.approve(orgId, id))
            .then(() => toast.success('변경사항이 모두 승인되었습니다.'))
            .catch(errorToast);
    };

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

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">{reviewCampaign?.title}</h1>
                    <Button className="bg-scordi text-white" onClick={handleConfirm}>
                        변경사항 승인하기
                    </Button>
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

                    <LoadableBox isLoading={!reviewCampaign} loadingType={2} noPadding spinnerPos="center">
                        {children}
                    </LoadableBox>
                </div>
            </MainContainer>
        </MainLayout>
    );
});
