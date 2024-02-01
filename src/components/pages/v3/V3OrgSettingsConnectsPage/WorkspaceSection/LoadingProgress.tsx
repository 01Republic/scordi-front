import React, {memo, useEffect, useState} from 'react';
import {Container} from '^v3/share/OnboardingFlow/Container';
import {PiSpinnerGapThin} from 'react-icons/pi';
import {workspaceTimeoutChain} from '^v3/share/OnboardingFlow/steps/ConnectGoogleAdminIsLoading/workspaceTimeoutChain';

export const LoadingProgress = memo(() => {
    const [title, setTitle] = useState('인증 정보를 가져오고 있어요.');
    const [desc, setDesc] = useState('15초 정도 걸릴 수 있어요. 잠시만 기다려주세요.');

    useEffect(() => {
        workspaceTimeoutChain(setTitle, setDesc);
    }, []);

    return (
        <div data-step="ConnectGoogleAdmin" className="h-screen pt-28 flex flex-col gap-7 animate-pulse">
            <Container size="md">
                <div className="text-center">
                    <h3 className="font-bold text-3xl mb-3">{title}</h3>
                    <p className="text-16 text-gray-500">{desc}</p>
                </div>
            </Container>

            <Container size="sm" className="flex justify-center py-8">
                <PiSpinnerGapThin size={60} className="animate-spin text-scordi-500 m-auto" />
            </Container>
        </div>
    );
});
