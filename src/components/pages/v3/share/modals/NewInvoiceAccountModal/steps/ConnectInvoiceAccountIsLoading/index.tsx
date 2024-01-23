import {memo, useEffect, useState} from 'react';
import {Container} from '^v3/share/OnboardingFlow/Container';
import {PiSpinnerGapThin} from 'react-icons/pi';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {invoiceAccountTimeoutChain} from '^v3/share/OnboardingFlow/steps/ConnectInvoiceAccountIsLoading/invoiceAccountTimeoutChain';
import {getCreateInvoiceAccountFromTo} from '^models/InvoiceAccount/type';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {orgIdParamState} from '^atoms/common';
import {
    connectInvoiceAccountCodeState,
    connectInvoiceAccountStatus,
    InvoiceAccount,
} from '^v3/share/modals/NewInvoiceAccountModal/atom';
import {useAlert} from '^hooks/useAlert';

interface ConnectInvoiceAccountIsLoadingProps {
    onFinish?: () => any;
}

export const ConnectInvoiceAccountIsLoading = memo((props: ConnectInvoiceAccountIsLoadingProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const [code, setCode] = useRecoilState(connectInvoiceAccountCodeState);
    const setConnectStatus = useSetRecoilState(connectInvoiceAccountStatus);
    const [title, setTitle] = useState('인증 정보를 가져오고 있어요.');
    const [desc, setDesc] = useState('최대 1분 정도 걸릴 수 있어요. 잠시만 기다려주세요.');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {alert} = useAlert();

    const {onFinish} = props;

    const createInvoiceAccount = (code: string) => {
        if (!code || !orgId) return;

        invoiceAccountTimeoutChain(setTitle, setDesc);

        const dto = {
            code,
            gmailQueryOptions: getCreateInvoiceAccountFromTo(),
        };
        const req = invoiceAccountApi.createV2(orgId, dto);

        // 중복 요청이 가는 경우 res.data 가 undefined 가 오고 있습니다.
        // 추후 API가 409 Conflict 또는 202 Accepted 를 반환하도록 바뀔 수 있습니다.
        req.then((res) => {
            if (res.status !== 201 || !res.data) return;
            setConnectStatus(InvoiceAccount.afterLoad);
            onFinish && onFinish();
        });
        req.catch((err) => {
            alert.error('다시 시도해주세요', err.response.data.message);
            setConnectStatus(InvoiceAccount.beforeLoad);
            setCode('');
            setIsLoading(false);
        });
    };

    useEffect(() => {
        console.log('\ncode', code);
        if (code && !isLoading) {
            setIsLoading(true);
            createInvoiceAccount(code);
        }
    }, [code, isLoading]);

    return (
        <div data-step="ConnectGoogleAdmin" className="h-full flex flex-col gap-7 animate-pulse">
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
