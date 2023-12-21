import {memo, useEffect, useState} from 'react';
import {Container} from '^v3/share/OnboardingFlow/Container';
import {PiSpinnerGapThin} from 'react-icons/pi';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {invoiceAccountTimeoutChain} from '^v3/share/OnboardingFlow/steps/ConnectInvoiceAccountIsLoading/invoiceAccountTimeoutChain';
import {getCreateInvoiceAccountFromTo} from '^models/InvoiceAccount/type';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {orgIdParamState} from '^atoms/common';
import {
    connectInvoiceAccountCodeAtom,
    connectInvoiceAccountStatus,
    InvoiceAccount,
} from '^v3/V3OrgHomePage/NewInvoiceAccountModal/atom';
import {useAlert} from '^hooks/useAlert';

export const ConnectInvoiceAccountIsLoading = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const [code, setCode] = useRecoilState(connectInvoiceAccountCodeAtom);
    const setConnectStatus = useSetRecoilState(connectInvoiceAccountStatus);
    const [title, setTitle] = useState('인증 정보를 가져오고 있어요.');
    const [desc, setDesc] = useState('최대 1분 정도 걸릴 수 있어요. 잠시만 기다려주세요.');
    const [isLoading, setIsLoading] = useState<boolean | Promise<boolean>>(false);
    const {alert} = useAlert();

    const createInvoiceAccount = (code: string) => {
        if (isLoading) return;

        setIsLoading(async (v) => {
            if (await v) return true;

            // isLoading must be false.
            invoiceAccountTimeoutChain(setTitle, setDesc);

            const dto = {
                code,
                gmailQueryOptions: getCreateInvoiceAccountFromTo(),
            };
            const res = await invoiceAccountApi.createV2(orgId, dto).catch((err) => {
                alert.error('다시 시도해주세요', err.response.data.message);
                setConnectStatus(InvoiceAccount.beforeLoad);
                setCode('');
            });

            if (res) {
                setConnectStatus(InvoiceAccount.afterLoad);
            }
            return true;
        });
    };

    useEffect(() => {
        if (code) createInvoiceAccount(code);
    }, [code]);

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
