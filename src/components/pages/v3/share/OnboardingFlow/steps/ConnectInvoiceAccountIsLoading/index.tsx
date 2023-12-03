import {memo, useEffect, useState} from 'react';
import {StepContentProps} from '^components/util/funnel';
import {Container} from '^v3/share/OnboardingFlow/Container';
import {PiSpinnerGapThin} from 'react-icons/pi';
import {useRecoilValue} from 'recoil';
import {googleAccessTokenAtom} from '^components/pages/UsersLogin/atom';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {tChainStep, timeoutChain} from '^components/util/delay';
import {invoiceAccountTimeoutChain} from '^v3/share/OnboardingFlow/steps/ConnectInvoiceAccountIsLoading/invoiceAccountTimeoutChain';

interface Props extends StepContentProps {
    // onNext: () => any;
}

export const ConnectInvoiceAccountIsLoading = memo(function ConnectInvoiceAccountIsLoading(props: Props) {
    const accessToken = useRecoilValue(googleAccessTokenAtom);
    const [title, setTitle] = useState('인증 정보를 가져오고 있어요.');
    const [desc, setDesc] = useState('최대 1분 정도 걸릴 수 있어요. 잠시만 기다려주세요.');
    const {onPrev, onNext} = props;

    const getReport = (token: string) => {
        // const req = invoiceAccountApi.create();

        invoiceAccountTimeoutChain(setTitle, setDesc);

        // TODO: 장한
        // req.then(() => {});
    };

    useEffect(() => {
        if (accessToken) getReport(accessToken);
    }, [accessToken]);

    return (
        <div data-step="ConnectInvoiceAccount" className="h-full flex flex-col justify-center gap-7">
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
