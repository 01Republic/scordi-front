import {ShowResponseButton} from '^clients/private/orgs/reviewCampaigns/OrgReviewCampaignDetailPage/SubmissionsPage/ReviewResponseItem/ShowResponseButton';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type';
import {ReviewResponseDto} from '^models/ReviewResponse/type';
import {TeamMemberProfile} from '^models/TeamMember/components/TeamMemberProfile';
import GmailIcon from '^public/logo/icons/ic_gmail.png';
import SlackIcon from '^public/logo/icons/ic_slack.png';
import {useTranslation} from 'next-i18next';
import Image from 'next/image';
import {memo} from 'react';
import {MoreDropdownForResponseItem} from './MoreDropdownForResponseItem';
import {ResendButton} from './ResendButton';
import {SubmitStatusHandler} from './SubmitStatusHandler';

interface ReviewResponseItemProps {
    response: ReviewResponseDto;
    campaign?: ReviewCampaignDto;
    reload: () => any;
}

export const ReviewResponseItem = memo((props: ReviewResponseItemProps) => {
    const {response, campaign, reload} = props;
    const {t} = useTranslation('reviewCampaigns');

    return (
        <div className="flex items-center p-4 text-sm gap-x-6 md:gap-x-12">
            <div className="basis-80">{response.teamMember && <TeamMemberProfile item={response.teamMember} />}</div>

            <div className="flex-1 flex items-center justify-between">
                <div className="flex items-center gap-1 md:w-[100px]">
                    {response.teamMember?.email && (
                        <div className="relative border rounded-full w-6 h-6 p-[2px]">
                            <div className="relative w-full h-full">
                                <Image src={GmailIcon} alt={'gmail'} fill />
                            </div>
                        </div>
                    )}
                    {response.teamMember?.slackMember && (
                        <div className="relative border rounded-full w-6 h-6 p-[2px]">
                            <div className="relative w-full h-full">
                                <Image src={SlackIcon} alt={'slack'} fill />
                            </div>
                        </div>
                    )}
                </div>
                <div className="md:w-[190px] text-right whitespace-nowrap">{response.statusText}</div>
            </div>

            <div className="ml-auto flex items-center gap-3">
                <SubmitStatusHandler response={response} campaign={campaign} reload={reload} />

                {campaign?.isOverdue() ? (
                    <ShowResponseButton response={response} text={t('submissions.viewContent') as string} />
                ) : response.submittedAt ? (
                    <ShowResponseButton response={response} text={t('submissions.viewResponse') as string} />
                ) : (
                    <ResendButton response={response} reload={reload} />
                )}

                <MoreDropdownForResponseItem response={response} reload={reload} />
            </div>
        </div>
    );
});
ReviewResponseItem.displayName = 'ReviewResponseItem';
