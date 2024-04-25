import React, {memo} from 'react';
import {OrganizationDto} from '^models/Organization/type';
import {useRouter} from 'next/router';
import {useAlert} from '^hooks/useAlert';
import {
    ContentPanel,
    ContentPanelItem,
    ContentPanelItemText,
    ContentPanelItemTitle,
    ContentPanelList,
} from '^layouts/ContentLayout';
import {AdminOrgsPageRoute} from '^pages/admin/orgs';
import {organizationApi} from '^models/Organization/api';

interface OrganizationDeletePanelProps {
    organization: OrganizationDto;
}

export const OrganizationDeletePanel = memo((props: OrganizationDeletePanelProps) => {
    const router = useRouter();
    const {alert} = useAlert();
    const {organization} = props;

    const onclick = () => {
        if (confirm('데이터를 복구할 수 없게 됩니다.\n진짜 실행할까요?')) {
            organizationApi
                .destroy(organization.id)
                .then(() => router.replace(AdminOrgsPageRoute.path()))
                .catch((err) => {
                    alert.error('삭제하지 못했어요', err.response.data.message);
                });
        }
    };

    return (
        <ContentPanel title="위험 구역!">
            <ContentPanelList>
                <ContentPanelItem>
                    <div className="flex-1">
                        <ContentPanelItemTitle text="이 조직을 스코디 전체에서 제거합니다." />
                        <ContentPanelItemText
                            text={`
                            <ul>
                              <li>조직을 삭제하면 스코디에 저장된 <b>구독과 연동정보 등 모든 정보를 삭제합니다.</b></li>
                              <li><b>이 작업은 돌이킬 수 없습니다.</b> 신중하게 검토 후 삭제하세요!</li>
                            </ul>
                            `}
                        />
                    </div>
                    <div className="flex-1 text-end">
                        <button type="button" className="btn btn-error text-white" onClick={onclick}>
                            관리자 권한으로 이 조직 삭제하기
                        </button>
                    </div>
                </ContentPanelItem>
            </ContentPanelList>
        </ContentPanel>
    );
});
OrganizationDeletePanel.displayName = 'OrganizationDeletePanel';
