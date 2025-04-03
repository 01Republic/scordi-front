import React from 'react';
import {useRecoilState} from 'recoil';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {reviewCampaignCreateStepAtom} from './atom';
import {LeftSideIndicator} from './LeftSideIndicator';
import {RequestAddStep1} from './RequestAddStep1';
import {RequestAddStep2} from './RequestAddStep2';
import {RequestAddStep3} from './RequestAddStep3';

export const OrgReviewCampaignNewPage = () => {
    const [step, setStep] = useRecoilState(reviewCampaignCreateStepAtom);

    return (
        <MainLayout>
            <MainContainer>
                <div className={'flex w-full mx-auto'}>
                    <LeftSideIndicator step={step} />
                    <div className={'flex-1 pt-20'}>
                        <RequestAddStep1 />
                        <RequestAddStep2 />
                        <RequestAddStep3 />
                    </div>
                </div>
            </MainContainer>
        </MainLayout>
    );
};
