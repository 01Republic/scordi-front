import {GoogleOAuthProvider} from '@react-oauth/google';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {StepContentProps} from '^components/util/funnel';
import {googleOAuth} from '^config/environments';
import {isLoadedState} from '^v3/share/OnboardingFlow/atom';
import {Container} from '^v3/share/OnboardingFlow/Container';
import {connectInvoiceAccountCodeAtom} from '^v3/share/OnboardingFlow/steps/ConnectInvoiceAccountBeforeLoad/atom';
import {ArrowLeft} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo, useEffect} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';

interface Props extends StepContentProps {
    // onNext: () => any;
}

export const ConnectInvoiceAccountBeforeLoad = memo(function ConnectInvoiceAccountBeforeLoad(props: Props) {
    const {onPrev, onNext} = props;
    const setCode = useSetRecoilState(connectInvoiceAccountCodeAtom);
    const [isLoading, setIsLoading] = useRecoilState(isLoadedState);
    const {t} = useTranslation('common');

    const onCode = (code: string) => {
        setCode(code);
        onNext();
    };

    useEffect(() => {
        isLoading && setIsLoading(false);
    }, []);

    return (
        <GoogleOAuthProvider clientId={googleOAuth.gmailClient.id}>
            <div data-step="ConnectInvoiceAccount" className="h-full flex flex-col justify-start gap-7">
                <Container size="md">
                    <div className="text-center">
                        <h3 className="font-bold text-3xl mb-3">결제 정보도 연결해볼까요?</h3>
                        <p className="text-16 text-gray-500">결제 메일을 받는 계정을 선택하고 지출까지 모아보세요.</p>
                    </div>
                </Container>

                <Container size="sm" />

                <Container size="sm" className="">
                    <div className="w-full flex justify-center">
                        <GoogleLoginBtn about="gmail" onCode={(code) => onCode(code)} />
                    </div>

                    {/* 뒤로가기 */}
                    <button
                        className="btn btn-block btn-link text-gray-400 hover:text-gray-500 !no-underline items-center gap-2"
                        onClick={() => onPrev && onPrev()}
                    >
                        <ArrowLeft />
                        <span>{t('button.back')}</span>
                    </button>
                </Container>
            </div>
        </GoogleOAuthProvider>
    );
});
