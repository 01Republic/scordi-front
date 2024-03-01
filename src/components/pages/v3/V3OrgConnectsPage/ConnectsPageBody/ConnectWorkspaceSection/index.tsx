import {memo} from 'react';
import {MethodsSection} from '../MethodsSection';
import {ConnectMethodCard} from '../ConnectMethodCard';
import {GoogleWorkspaceConnector} from './GoogleWorkspaceConnector';

export const ConnectWorkspaceSection = memo(function ConnectWorkspaceSection() {
    return (
        <MethodsSection
            id="workspace"
            title="구성원"
            description="이용중인 그룹웨어를 연결하고 누가 무엇을 이용중인지 한 번에 확인해요."
        >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <GoogleWorkspaceConnector />

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
