import React, {memo, useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {connectInvoiceAccountCodeAtom} from '^v3/share/OnboardingFlow/steps/ConnectInvoiceAccountBeforeLoad/atom';
import {invoiceAccountTimeoutChain} from '^v3/share/OnboardingFlow/steps/ConnectInvoiceAccountIsLoading/invoiceAccountTimeoutChain';
import {getCreateInvoiceAccountFromTo} from '^models/InvoiceAccount/type';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {LinkTo} from '^components/util/LinkTo';
import {FaArrowLeft} from 'react-icons/fa6';
import {useRouter} from 'next/router';
import {useInvoiceAccountListInConnector} from '^models/InvoiceAccount/hook';
import {toast} from 'react-toastify';
import {PiSpinnerGapThin} from 'react-icons/pi';
// import {toaster as toast} from '^hooks/useToast';

export const GmailInvoiceConnectingPage = memo(function GmailInvoiceConnectingPage() {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const code = useRecoilValue(connectInvoiceAccountCodeAtom);
    const resetCode = useResetRecoilState(connectInvoiceAccountCodeAtom);
    const [title, setTitle] = useState('인증 정보를 가져오고 있어요.');
    const [desc, setDesc] = useState('최대 1분 정도 걸릴 수 있어요. 잠시만 기다려주세요.');
    const {reload} = useInvoiceAccountListInConnector();

    const routerBack = () => {
        // setIsLoading(false);
        reload().then(() => resetCode());
    };

    const createInvoiceAccount = (code: string) => {
        invoiceAccountTimeoutChain(setTitle, setDesc);

        const dto = {
            code,
            gmailQueryOptions: getCreateInvoiceAccountFromTo(),
        };

        const req = invoiceAccountApi.createV2(orgId, dto);

        req.then((res) => {
            if (res.status !== 201) return;
            reload().then(() => resetCode());
        });

        req.catch((err) => {
            toast.error(err.message);
        });
    };

    useEffect(() => {
        if (code) createInvoiceAccount(code);
    }, [code]);

    return (
        <div className="py-10 px-12">
            <header className="mb-12">
                <div className="mb-12">
                    <LinkTo
                        onClick={routerBack}
                        className="flex items-center text-gray-500 hover:underline gap-2 cursor-pointer"
                    >
                        <FaArrowLeft /> 뒤로가기
                    </LinkTo>
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/016/716/465/original/gmail-icon-free-png.png"
                        alt="gmail logo"
                        className="avatar w-[48px] h-[48px] bg-white"
                    />
                </div>

                <div className="mb-12 animate-pulse">
                    <h1 className="text-3xl mb-4">{title}</h1>
                    <h2 className="text-xl mb-4">{desc}</h2>

                    <br />
                </div>
            </header>

            <section className="py-8">
                <PiSpinnerGapThin size={60} className="animate-spin text-scordi-500 m-auto" />
            </section>
        </div>
    );
});
