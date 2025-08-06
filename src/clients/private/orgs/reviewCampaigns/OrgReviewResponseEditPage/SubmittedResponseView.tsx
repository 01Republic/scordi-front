import {useIdParam} from '^atoms/common';
import {OrgReviewCampaignListPageRoute} from '^pages/orgs/[id]/reviewCampaigns';
import {Button} from '^public/components/ui/button';
import {Check} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';

export const SubmittedResponseView = () => {
    const router = useRouter();
    const {t} = useTranslation('reviewCampaigns');
    const orgId = useIdParam('id');

    return (
        <div
            className={
                'space-y-2 min-h-lvh max-w-screen-sm mx-auto py-20 flex flex-col items-center justify-center bg-gray-50'
            }
        >
            <div
                className={
                    'flex items-center justify-center gap-2 text-white w-14 h-14 bg-[#FB923C] rounded-full text-24 mb-3'
                }
            >
                <Check />
            </div>
            <div className={'text-24 font-medium text-gray-800'}>{t('response.submitted.title')}</div>
            <div className={'text-18 text-gray-800'}>{t('response.submitted.message')}</div>
            <Button
                size={'xl'}
                variant={'scordi'}
                onClick={() => router.push(OrgReviewCampaignListPageRoute.path(Number(orgId)))}
            >
                {t('response.submitted.homeButton')}
            </Button>
        </div>
    );
};
