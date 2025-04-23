import {memo} from 'react';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type';

interface ChangesPageContentTitleProps {
    campaign: ReviewCampaignDto;
    totalCount: number;
    leftCount: number;
}

export const ChangesPageContentTitle = memo((props: ChangesPageContentTitleProps) => {
    const {campaign, totalCount, leftCount} = props;

    if (campaign.approvedAt || campaign.isClosed()) return <></>;

    // 마감되지 않은 요청에 대하여
    if (!campaign.isOverdue()) {
        return (
            <span>
                먼저{' '}
                <b
                    className="text-scordi animate-pulse hover:animate-none cursor-pointer btn-animation"
                    onClick={() => document.getElementById('review-campaign-finish-btn')?.click()}
                >
                    마감처리
                </b>
                가 필요합니다.{' '}
                {campaign.notSubmittedResponseCount > 0 && (
                    <span className="text-12 font-medium">
                        (아직 <b className="text-scordi">{campaign.notSubmittedResponseCount.toLocaleString()}명</b>이
                        제출하지 않았어요)
                    </span>
                )}
            </span>
        );
    }

    if (leftCount) {
        return (
            <span>
                승인 대기중 (<b className="text-scordi">{leftCount.toLocaleString()}개</b> 남았어요)
            </span>
        );
    }

    return (
        <span>
            거의 다 끝났어요!{' '}
            <b
                className="text-scordi animate-pulse hover:animate-none cursor-pointer btn-animation"
                onClick={() => document.getElementById('review-campaign-confirm-btn')?.click()}
            >
                승인하기
            </b>{' '}
            버튼을 눌러 저장해주세요 💁‍♀️
        </span>
    );
});
ChangesPageContentTitle.displayName = 'ChangesPageContentTitle';
