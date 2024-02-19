import {memo} from 'react';
import {ConnectMethodCard} from '^v3/V3OrgConnectsPage/ConnectsPageBody/ConnectMethodCard';
import {MethodsSection} from '^v3/V3OrgConnectsPage/ConnectsPageBody/MethodsSection';

export const ConnectCardAccountsSection = memo(function ConnectCardAccountsSection() {
    return (
        <MethodsSection id="card-accounts" title="카드" description="연결된 카드의 거래내역을 불러올 수 있어요.">
            <div className="grid grid-cols-5 gap-4">
                <ConnectMethodCard
                    logo="https://plutus-app-public-assets.s3.ap-northeast-2.amazonaws.com/HYUNDAI.png"
                    title="현대카드"
                />
                <ConnectMethodCard
                    logo="https://plutus-app-public-assets.s3.ap-northeast-2.amazonaws.com/SAMSUNG.png"
                    title="삼성카드"
                />
                <ConnectMethodCard
                    logo="https://plutus-app-public-assets.s3.ap-northeast-2.amazonaws.com/NH.png"
                    title="NH카드"
                />
                <ConnectMethodCard
                    logo="https://plutus-app-public-assets.s3.ap-northeast-2.amazonaws.com/BC.png"
                    title="BC카드"
                />
                <ConnectMethodCard
                    logo="https://plutus-app-public-assets.s3.ap-northeast-2.amazonaws.com/SHINHAN_BANK.png"
                    title="신한카드"
                />
                <ConnectMethodCard
                    logo="https://plutus-app-public-assets.s3.ap-northeast-2.amazonaws.com/WOORI_BANK.png"
                    title="우리카드"
                />
                <ConnectMethodCard
                    logo="https://plutus-app-public-assets.s3.ap-northeast-2.amazonaws.com/LOTTE.png"
                    title="롯데카드"
                />
                <ConnectMethodCard
                    logo="https://plutus-app-public-assets.s3.ap-northeast-2.amazonaws.com/HANA_BANK.png"
                    title="하나카드"
                />
                <ConnectMethodCard
                    logo="https://plutus-app-public-assets.s3.ap-northeast-2.amazonaws.com/KUKMIN_BANK.png"
                    title="KB국민카드"
                />
            </div>
        </MethodsSection>
    );
});
