import React, {memo} from 'react';
import {StepLayout} from '../_common/StepLayout';
import {googleOAuth} from '^config/environments';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {InvoiceAccountSelect} from '../inputs/InvoiceAccountSelect';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {useSetRecoilState} from 'recoil';
import {connectInvoiceAccountCodeAtom} from '^v3/share/OnboardingFlow/steps/ConnectInvoiceAccountBeforeLoad/atom';

export const InvoiceAccountSelectStep = memo(function InvoiceAccountSelectStep() {
    const setCode = useSetRecoilState(connectInvoiceAccountCodeAtom);

    return (
        <>
            <StepLayout title="청구서(인보이스)를 받고 있는 이메일이 있나요?" desc="">
                <InvoiceAccountSelect />
            </StepLayout>
        </>
    );
});
