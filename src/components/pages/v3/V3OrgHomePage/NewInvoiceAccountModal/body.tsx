import React, {memo} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {connectInvoiceAccountStatus, InvoiceAccount} from '^v3/V3OrgHomePage/NewInvoiceAccountModal/atom';
import {ConnectInvoiceAccountBefore} from '^v3/V3OrgHomePage/NewInvoiceAccountModal/steps/ConnectInvoiceAccountBefore';
import {ConnectInvoiceAccountIsLoading} from '^v3/V3OrgHomePage/NewInvoiceAccountModal/steps/ConnectInvoiceAccountIsLoading';
import {ConnectInvoiceAccountAfter} from '^v3/V3OrgHomePage/NewInvoiceAccountModal/steps/ConnectInvoiceAccountAfter';

export const NewInvoiceAccountModalBody = memo(() => {
    const [connectStep, setConnectStep] = useRecoilState(connectInvoiceAccountStatus);

    return (
        <>
            {connectStep === InvoiceAccount.beforeLoad && <ConnectInvoiceAccountBefore />}
            {connectStep === InvoiceAccount.isLoading && <ConnectInvoiceAccountIsLoading />}
            {connectStep === InvoiceAccount.afterLoad && <ConnectInvoiceAccountAfter />}
        </>
    );
});
