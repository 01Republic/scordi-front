import {memo} from 'react';
import {ConnectMethodCard} from '^v3/V3OrgConnectsPage/ConnectsPageBody/ConnectMethodCard';
import {MethodsSection} from '^v3/V3OrgConnectsPage/ConnectsPageBody/MethodsSection';

export const ConnectInvoiceEmailsSection = memo(function ConnectInvoiceEmailsSection() {
    return (
        <MethodsSection
            id="invoice-emails"
            title="결제메일"
            description="청구서를 받고 있는 이메일이 있다면 한번에 불러와 연결 할 수 있어요."
        >
            <div className="grid grid-cols-5 gap-4">
                <ConnectMethodCard
                    logo="https://static.vecteezy.com/system/resources/previews/016/716/465/original/gmail-icon-free-png.png"
                    title="Gmail"
                />
                <ConnectMethodCard
                    logo="https://play-lh.googleusercontent.com/YuB811yIABwkqgTr82XnG79VtfTwJ5dPUUSIs8Oe9q5-aJv6dk-z3BirQEyo5a59Nw=w240-h480-rw"
                    title="Naver"
                    disabled
                />
                <ConnectMethodCard
                    logo="https://t1.daumcdn.net/crms/symbol_img/symbol_%EC%B9%B4%EC%B9%B4%EC%98%A4%EB%A9%94%EC%9D%BC.png"
                    title="Kakao"
                    disabled
                />
            </div>
        </MethodsSection>
    );
});
