import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
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
import Link from 'next/link';
import {cn} from '^public/lib/utils';
import {OrgReviewCampaignDetailPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]';
import {orgIdParamState} from '^atoms/common';
import {OrgReviewCampaignDetailSubmissionsPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]/submissions';
import {OrgReviewCampaignDetailChangesPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]/changes';
import {Spinner} from '^components/util/loading';
import {useReviewCampaign} from '^models/ReviewCampaign/hook';
import {OrgReviewCampaignListPageRoute} from '^pages/orgs/[id]/reviewCampaigns';
import {reviewCampaignApi} from '^models/ReviewCampaign/api';
import {confirm2, confirmed} from '^components/util/dialog';
import toast from 'react-hot-toast';
import {errorToast} from '^api/api';

export default function OrgReviewCampaignDetailLayout({children}: {children: React.ReactNode}) {
    const pathname = useRouter().pathname;
    const reviewCampaignId = parseInt(useRouter().query.reviewCampaignId as string, 10);
    const orgId = useRecoilValue(orgIdParamState);
    const {data: reviewCampaign} = useReviewCampaign(orgId, reviewCampaignId);

    const isActive = (path: string) => {
        if (path === '' && (pathname.endsWith('submissions') || pathname.endsWith('changes'))) {
            return false;
        }
        return pathname.endsWith(path);
    };

    const handleConfirm = async () => {
        const sync = () => confirm2('변경사항을 모두 승인하시겠습니까?');
        confirmed(sync())
            .then(() => reviewCampaignApi.approve(orgId, reviewCampaignId))
            .then(() => toast.success('변경사항이 모두 승인되었습니다.'))
            .catch(errorToast);
    };

    if (!reviewCampaign) {
        return (
            <MainLayout>
                <MainContainer>
                    <div className="container mx-auto py-6 max-w-7xl">
                        <Spinner />
                    </div>
                </MainContainer>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <MainContainer>
                <div className="container mx-auto py-6 max-w-7xl">
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
                        <h1 className="text-3xl font-bold">{reviewCampaign.title}</h1>
                        <Button className="bg-primaryColor-900 text-white" onClick={handleConfirm}>
                            변경사항 승인하기
                        </Button>
                    </div>

                    <div className="mb-8">
                        <nav className="border-b flex">
                            <Link
                                href={OrgReviewCampaignDetailPageRoute.path(orgId, reviewCampaignId)}
                                className={cn(
                                    'px-4 py-2 border-b-2 border-transparent text-sm font-medium',
                                    isActive('') && 'border-primaryColor-900 text-primaryColor-900',
                                )}
                            >
                                개요
                            </Link>
                            <Link
                                href={OrgReviewCampaignDetailSubmissionsPageRoute.path(orgId, reviewCampaignId)}
                                className={cn(
                                    'px-4 py-2 border-b-2 border-transparent text-sm font-medium',
                                    isActive('submissions') && 'border-primaryColor-900 text-primaryColor-900',
                                )}
                            >
                                제출현황
                            </Link>
                            <Link
                                href={OrgReviewCampaignDetailChangesPageRoute.path(orgId, reviewCampaignId)}
                                className={cn(
                                    'px-4 py-2 border-b-2 border-transparent text-sm font-medium',
                                    isActive('changes') && 'border-primaryColor-900 text-primaryColor-900',
                                )}
                            >
                                변경사항
                            </Link>
                        </nav>

                        {children}
                    </div>
                </div>
            </MainContainer>
        </MainLayout>
    );
}
