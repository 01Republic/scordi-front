import React, {memo} from 'react';
import {Container} from '^v3/share/OnboardingFlow/Container';
import {CheckCircle} from '^components/react-icons/check-circle';
import {newInvoiceAccountModal} from '^v3/share/modals/NewInvoiceAccountModal/atom';
import {useModal} from '^v3/share/modals';
import {ArrowRight} from 'lucide-react';

interface ConnectInvoiceAccountAfterProps {
    onClose?: () => any;
}
export const ConnectInvoiceAccountAfter = memo((props: ConnectInvoiceAccountAfterProps) => {
    const {close} = useModal(newInvoiceAccountModal);
    const {onClose} = props;

    const onClick = () => {
        close();
        onClose && onClose();
    };

    return (
        <div data-step="Finish" className="h-full flex flex-col justify-start gap-7">
            <Container size="sm" className="flex justify-center mb-4">
                <CheckCircle className="w-[60px]" color="#5E5FEE" />
            </Container>

            <Container size="lg" className="mb-4">
                <div className="text-center">
                    <h3 className="font-bold text-3xl mb-4">SaaS 관리 준비가 끝났어요!</h3>
                    <p className="text-16 text-gray-500">
                        누가 어떤 서비스를 쓰고, 언제 / 어디서 / 얼마가 사용되는지 <br /> 한 눈에 관리해요.
                    </p>
                </div>
            </Container>

            <Container size="lg" className="fixed left-0 bottom-10 w-full text-center">
                <button
                    className="btn btn-lg btn-block btn-scordi-light-200 max-w-sm !text-scordi !hover:text-scordi-700 rounded-box gap-2"
                    onClick={onClick}
                >
                    <span>스코디로 관리 시작하기</span>
                    <ArrowRight />
                </button>
            </Container>
        </div>
    );
});
