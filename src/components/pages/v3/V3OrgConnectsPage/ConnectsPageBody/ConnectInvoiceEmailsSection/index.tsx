import {memo} from 'react';
import {MethodsSection} from '../MethodsSection';
import {ConnectMethodCard} from '../ConnectMethodCard';
import {Connectors, V3OrgConnectorDetailPageRoute} from '^pages/v3/orgs/[orgId]/connects/[connectorName]';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {GmailInvoiceConnector} from '^v3/V3OrgConnectsPage/ConnectsPageBody/ConnectWorkspaceSection/GmailInvoiceConnector';

export const ConnectInvoiceEmailsSection = memo(function ConnectInvoiceEmailsSection() {
    const orgId = useRecoilValue(orgIdParamState);

    return (
        <MethodsSection
            id="invoice-emails"
            title="결제메일"
            description="청구서를 받고 있는 이메일이 있다면 한번에 불러와 연결 할 수 있어요."
        >
            <div className="grid grid-cols-5 gap-4">
                <GmailInvoiceConnector />
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
