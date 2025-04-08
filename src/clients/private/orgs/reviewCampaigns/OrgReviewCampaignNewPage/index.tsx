import React from 'react';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {LeftSideIndicator} from './LeftSideIndicator';
import {RequestAddStep1} from './RequestAddStep1';
import {RequestAddStep2} from './RequestAddStep2';
import {RequestAddStep3} from './RequestAddStep3';

export const OrgReviewCampaignNewPage = () => {
    return (
        <MainLayout>
            <MainContainer>
                <h2 className="text-2xl font-bold text-gray-900 mb-12">새 요청 만들기</h2>

                <div className="grid grid-cols-9 gap-6">
                    <div className="col-span-2">
                        <LeftSideIndicator />
                    </div>

                    <div className="col-span-7">
                        <div className={'flex-1'}>
                            <RequestAddStep1 />
                            <RequestAddStep2 />
                            <RequestAddStep3 />
                        </div>
                    </div>
                </div>
            </MainContainer>
        </MainLayout>
    );
};
