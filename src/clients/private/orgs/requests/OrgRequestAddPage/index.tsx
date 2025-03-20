import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import React from 'react';
import {LeftSideIndicator} from '^clients/private/orgs/requests/OrgRequestAddPage/LeftSideIndicator';
import {RequestAddStep1} from '^clients/private/orgs/requests/OrgRequestAddPage/RequestAddStep1';
import {RequestAddStep2} from '^clients/private/orgs/requests/OrgRequestAddPage/RequestAddStep2';

export const OrgRequestAddPage = () => {
    const [step, setStep] = React.useState(2);

    return (
        <MainLayout>
            <MainContainer>
                <div className={'flex w-full mx-auto'}>
                    <LeftSideIndicator step={step} />
                    <div className={'flex-1 pt-20'}>
                        {step === 1 && <RequestAddStep1 />}
                        {step === 2 && <RequestAddStep2 />}
                    </div>
                </div>
            </MainContainer>
        </MainLayout>
    );
};
