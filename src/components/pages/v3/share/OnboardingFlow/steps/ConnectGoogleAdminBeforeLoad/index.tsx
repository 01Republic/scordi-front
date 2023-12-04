import {memo, useEffect} from 'react';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {googleOAuth} from '^config/environments';
import {StepContentProps} from '^components/util/funnel';
import {Container} from '../../Container';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';

export * from './get-data-from-local-storage';
export * from './StepContent';

interface Props extends StepContentProps {
    // onNext: () => any;
}

export const ConnectGoogleAdminBeforeLoad = memo(function ConnectGoogleAdminBeforeLoad(props: Props) {
    const {onNext, onReady} = props;

    useEffect(() => {
        onReady && onReady();
    }, []);

    return (
        <GoogleOAuthProvider clientId={googleOAuth.adminClient.id}>
            <div data-step="ConnectGoogleAdmin" className="h-full flex flex-col gap-7">
                <Container size="md">
                    <div className="text-center">
                        <h3 className="font-bold text-3xl mb-3">우리 회사 구독서비스를 모아볼까요?</h3>
                        <p className="text-16 text-gray-500">
                            구글 워크스페이스를 연동하고 몇 개를 쓰고 있는지 알아보세요.
                        </p>
                        {/*<p className="text-sm text-gray-500">관리자 계정을 만들고 flex를 실제로 경험해보세요.</p>*/}
                    </div>
                </Container>

                <Container size="sm" />

                <Container size="sm" className="flex justify-center">
                    <GoogleLoginBtn about="admin" googleLoginOnSuccessFn={() => onNext()} />
                </Container>
            </div>
        </GoogleOAuthProvider>
    );
});
