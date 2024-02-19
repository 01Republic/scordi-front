import {memo} from 'react';
import {MethodsSection} from '../MethodsSection';
import {ConnectMethodCard} from '../ConnectMethodCard';

export const ConnectWorkspaceSection = memo(function ConnectWorkspaceSection() {
    return (
        <MethodsSection
            id="workspace"
            title="구성원"
            description="이용중인 그룹웨어를 연결하고 누가 무엇을 이용중인지 한 번에 확인해요."
        >
            <div className="grid grid-cols-5 gap-4">
                <ConnectMethodCard
                    logo="https://payplo-service.s3.ap-northeast-2.amazonaws.com/production/prototypes/32/image/1692946151029--SaaS%20%C3%AB%C2%A1%C2%9C%C3%AA%C2%B3%C2%A0%20320_320.png"
                    title="구글 워크스페이스"
                    comment="관리자 연동"
                />
                <ConnectMethodCard
                    logo="https://static-00.iconduck.com/assets.00/teams-icon-1024x1024-2umqdhm3.png"
                    title="마이크로소프트 팀스"
                    comment="관리자 연동"
                    disabled
                />
                <ConnectMethodCard
                    logo="https://www.hostcenter.co.kr/img/sub-visual/works.png"
                    title="네이버 웍스"
                    comment="관리자 연동"
                    disabled
                />
            </div>
        </MethodsSection>
    );
});
