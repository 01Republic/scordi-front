import { getToken } from '^api/api';
import {
    orgIdParamState,
    reviewCampaignIdParamState,
    reviewResponseIdParamState,
    useRouterIdParamState,
} from '^atoms/common';
import { reviewResponseApi } from '^models/ReviewResponse/api';
import { ReviewResponseDto } from '^models/ReviewResponse/type/ReviewResponse.dto';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export const useReviewRequest = () => {
    const [responseData, setResponseData] = useState<ReviewResponseDto | undefined>(undefined);
    const orgId = useRecoilValue(orgIdParamState);
    const reviewCampaignId = useRouterIdParamState('reviewCampaignId', reviewCampaignIdParamState);
    const reviewResponseId = useRouterIdParamState('reviewResponseId', reviewResponseIdParamState);
    const token = getToken();

    useEffect(() => {
        console.log('useEffect triggered');
        if (orgId && reviewCampaignId && reviewResponseId) {
            reviewResponseApi
                .show(orgId, Number(reviewCampaignId), Number(reviewResponseId), token || '')
                .then((response) => {
                    setResponseData(response.data);
                })
                .catch((error) => {
                    console.error('에러 발생:', error);
                });
        }
    }, [orgId, reviewCampaignId, reviewResponseId]);

    return { responseData };
};
