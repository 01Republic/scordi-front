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

export default function OrgReviewCampaignDetailLayout({children}: {children: React.ReactNode}) {
    const pathname = useRouter().pathname;
    const orgId = useRecoilValue(orgIdParamState);

    const isActive = (path: string) => {
        if (path === '' && (pathname.endsWith('submissions') || pathname.endsWith('changes'))) {
            return false;
        }
        return pathname.endsWith(path);
    };

    return (
        <MainLayout>
            <MainContainer>
                <div className="container mx-auto py-6 max-w-7xl">
                    {/* Breadcrumb */}
                    <Breadcrumb className="mb-4">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">업무</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-primaryColor-900 font-medium">요청 상세</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">2025-04-01 전수조사 요청</h1>
                        <Button className="bg-primaryColor-900 text-white">변경사항 승인하기</Button>
                    </div>

                    {/* Navigation Menu */}
                    <div className="mb-8">
                        <nav className="border-b flex">
                            <Link
                                href={OrgReviewCampaignDetailPageRoute.path(orgId, 1)}
                                className={cn(
                                    'px-4 py-2 border-b-2 border-transparent text-sm font-medium',
                                    isActive('') && 'border-primaryColor-900 text-primaryColor-900',
                                )}
                            >
                                개요
                            </Link>
                            <Link
                                href={OrgReviewCampaignDetailSubmissionsPageRoute.path(orgId, 1)}
                                className={cn(
                                    'px-4 py-2 border-b-2 border-transparent text-sm font-medium',
                                    isActive('submissions') && 'border-primaryColor-900 text-primaryColor-900',
                                )}
                            >
                                제출현황
                            </Link>
                            <Link
                                href={OrgReviewCampaignDetailChangesPageRoute.path(orgId, 1)}
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
