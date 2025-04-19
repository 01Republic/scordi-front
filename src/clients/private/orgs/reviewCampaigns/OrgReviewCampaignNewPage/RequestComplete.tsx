import {NextImage} from '^components/NextImage';
import ClappingHands from '^images/clappingHands.png';
import {OrgOnboardingCompletePageRoute} from '^pages/orgs/[id]/onboarding/complete';
import {OrgReviewCampaignDetailPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]';
import {Button} from '^public/components/ui/button';
import {useRouter} from 'next/router';

interface RequestCompleteProps {
    orgId: number;
    campaignId: number;
    type?: string;
}

export const RequestComplete = ({orgId, campaignId, type}: RequestCompleteProps) => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center py-20 space-y-8">
            <NextImage src={ClappingHands} alt="clapping hands" width={60} height={60} />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">구성원에게 요청을 보냈어요</h2>
            <Button
                size={'xxl'}
                variant={'scordi'}
                onClick={() => {
                    if (type === 'onboarding') {
                        router.push(OrgOnboardingCompletePageRoute.path(orgId));
                    } else {
                        router.push(OrgReviewCampaignDetailPageRoute.path(orgId, campaignId));
                    }
                }}
                className="w-[280px]"
            >
                확인
            </Button>
        </div>
    );
};
