import React, {memo} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {connectInvoiceAccountStatus, InvoiceAccount} from '^v3/share/modals/NewInvoiceAccountModal/atom';
import {ConnectInvoiceAccountBefore} from '^v3/share/modals/NewInvoiceAccountModal/steps/ConnectInvoiceAccountBefore';
import {ConnectInvoiceAccountIsLoading} from '^v3/share/modals/NewInvoiceAccountModal/steps/ConnectInvoiceAccountIsLoading';
import {ConnectInvoiceAccountAfter} from '^v3/share/modals/NewInvoiceAccountModal/steps/ConnectInvoiceAccountAfter';

interface NewInvoiceAccountModalBodyProps {
    onClose?: () => any;
    onFinish?: () => any;
}

export const NewInvoiceAccountModalBody = memo((props: NewInvoiceAccountModalBodyProps) => {
    const connectStep = useRecoilValue(connectInvoiceAccountStatus);

    const {onClose, onFinish} = props;

    return (
        <>
            {connectStep === InvoiceAccount.beforeLoad && <ConnectInvoiceAccountBefore />}
            {connectStep === InvoiceAccount.isLoading && <ConnectInvoiceAccountIsLoading onFinish={onFinish} />}
            {connectStep === InvoiceAccount.afterLoad && <ConnectInvoiceAccountAfter onClose={onClose} />}
        </>
    );
});
