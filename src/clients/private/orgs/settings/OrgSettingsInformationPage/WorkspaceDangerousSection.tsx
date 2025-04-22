import React, {memo} from 'react';
import {SelectDropdown} from '^v3/share/Select';
import {OrgSettingsListSection} from '^clients/private/_layouts/OrgSettingsLayout';
import {organizationApi} from '^models/Organization/api';
import {useCurrentOrg, useCurrentOrg2} from '^models/Organization/hook';
import {toast} from 'react-hot-toast';
import {useRouter} from 'next/router';

interface WorkspaceDangerousSectionProps {
    orgId: number;
}

export const WorkspaceDangerousSection = memo((props: WorkspaceDangerousSectionProps) => {
    const {orgId} = props;
    const router = useRouter();
    const {currentOrg} = useCurrentOrg(orgId);

    const checkPrompt = (msg: string, orgName: string, limit: number): boolean => {
        const text = window.prompt(msg);
        if (text === null) return false;
        if (text === orgName) return true;
        if (limit < 1) return false;
        return checkPrompt(`"${text}"를 입력하셨습니다. 삭제를 위해 "${orgName}" 를 입력해주세요.`, orgName, limit - 1);
    };

    const destroy = async () => {
        if (!currentOrg) return;
        const orgName = currentOrg.name;

        const checked = checkPrompt(`삭제하려는 워크스페이스 이름 ("${orgName}") 을 입력해주세요.`, orgName, 3);
        if (!checked) {
            toast('삭제를 취소했어요');
            return;
        }

        organizationApi
            .destroy(orgId)
            .then(() => toast.success('워크스페이스를 삭제했어요'))
            .then(() => router.replace('/'));
    };

    return (
        <OrgSettingsListSection
            className="!border-red-300 !bg-red-50 text-red-400"
            title={<span className="">워크스페이스 삭제</span>}
        >
            <div className="flex items-start justify-between">
                <div className="text-15">
                    <p className="text-15">이 작업은 취소할 수 없습니다.</p>
                    <p className="text-15">
                        <b>워크스페이스 전체</b>가 삭제됩니다.
                    </p>
                </div>
                <div>
                    <button onClick={destroy} className="btn btn-error text-white no-animation btn-animation">
                        삭제하기
                    </button>
                </div>
            </div>
        </OrgSettingsListSection>
    );
});
