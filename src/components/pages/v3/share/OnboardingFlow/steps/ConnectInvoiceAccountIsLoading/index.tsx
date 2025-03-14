import {memo, useEffect, useState} from 'react';
import {StepContentProps, useFunnel} from '^components/util/funnel';
import {Container} from '^v3/share/OnboardingFlow/Container';
import {useRecoilState, useRecoilValue} from 'recoil';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {invoiceAccountTimeoutChain} from '^v3/share/OnboardingFlow/steps/ConnectInvoiceAccountIsLoading/invoiceAccountTimeoutChain';
import {orgIdParamState} from '^atoms/common';
import {connectInvoiceAccountCodeAtom} from '^v3/share/OnboardingFlow/steps/ConnectInvoiceAccountBeforeLoad/atom';
import {getCreateInvoiceAccountFromTo} from '^models/InvoiceAccount/type';
import {isLoadedState, onboardingFlowStepStatus, OnboardingStep} from '^v3/share/OnboardingFlow/atom';
import {useToast} from '^hooks/useToast';
import {Loader} from 'lucide-react';

interface Props extends StepContentProps {
    // onNext: () => any;
}

export const ConnectInvoiceAccountIsLoading = memo(function ConnectInvoiceAccountIsLoading(props: Props) {
    const orgId = useRecoilValue(orgIdParamState);
    const code = useRecoilValue(connectInvoiceAccountCodeAtom);
    const [title, setTitle] = useState('인증 정보를 가져오고 있어요.');
    const [desc, setDesc] = useState('최대 1분 정도 걸릴 수 있어요. 잠시만 기다려주세요.');
    const [isLoading, setIsLoading] = useRecoilState(isLoadedState);
    const {toast} = useToast();
    const {setStep} = useFunnel(onboardingFlowStepStatus);

    const {onPrev, onNext} = props;

    const createInvoiceAccount = (code: string) => {
        if (isLoading) return;

        setIsLoading(true);
        invoiceAccountTimeoutChain(setTitle, setDesc);

        const dto = {
            code,
            gmailQueryOptions: getCreateInvoiceAccountFromTo(),
        };

        const req = invoiceAccountApi.createV2(orgId, dto);

        req.then((res) => {
            if (res.status !== 201) return;
            setIsLoading(false);
            onNext();
        });

        req.catch((err) => {
            toast.error(err.message);
            setStep(OnboardingStep.ConnectInvoiceAccount_BeforeLoad);
        });
    };

    useEffect(() => {
        if (code) createInvoiceAccount(code);
    }, [code]);

    return (
        <div data-step="ConnectInvoiceAccount" className="h-full flex flex-col justify-start gap-7">
            <Container size="md">
                <div className="text-center">
                    <h3 className="font-bold text-3xl mb-3">{title}</h3>
                    <p className="text-16 text-gray-500">{desc}</p>
                </div>
            </Container>

            <Container size="sm" className="flex justify-center py-8">
                <Loader size={60} className="animate-spin text-scordi-500 m-auto" />
            </Container>
        </div>
    );
});
