import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import React from 'react';
import {LeftSideIndicator} from '^clients/private/orgs/requests/OrgRequestAddPage/LeftSideIndicator';
import {RequestAddStep1} from '^clients/private/orgs/requests/OrgRequestAddPage/RequestAddStep1';
import {RequestAddStep2} from '^clients/private/orgs/requests/OrgRequestAddPage/RequestAddStep2';
import {RequestAddStep3} from '^clients/private/orgs/requests/OrgRequestAddPage/RequestAddStep3';
import {atom, useRecoilState} from 'recoil';

export const requestAddStepAtom = atom<number>({
    key: 'requestAddStep',
    default: 1,
});

export const OrgRequestAddPage = () => {
    const [step, setStep] = useRecoilState(requestAddStepAtom);

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
