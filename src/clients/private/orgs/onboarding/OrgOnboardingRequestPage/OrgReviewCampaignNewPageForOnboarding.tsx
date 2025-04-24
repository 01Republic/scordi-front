import {memo} from 'react';
import {useRouter} from 'next/router';
import {ArrowLeft} from 'lucide-react';
import {useIdParam} from '^atoms/common';
import {MainContainer} from '^clients/private/_layouts/MainLayout';
import {OrgOnboardingCompletePageRoute} from '^pages/orgs/[id]/onboarding/complete';
import {RequestCampaignCreateForm} from '../../reviewCampaigns/OrgReviewCampaignNewPage/RequestCampaignCreateForm';

export const OrgReviewCampaignNewPageForOnboarding = memo(() => {
    const router = useRouter();
    const orgId = useIdParam('id');

    return (
        <MainContainer className="h-lvh">
            <div className="pt-10 pb-20">
                <div
                    className="flex items-center gap-2 hover:cursor-pointer hover:text-scordi-500"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="w-6 h-6" />
                    뒤로가기
                </div>
            </div>

            <RequestCampaignCreateForm orgId={orgId} redirectTo={() => OrgOnboardingCompletePageRoute.path(orgId)} />
        </MainContainer>
    );
});
