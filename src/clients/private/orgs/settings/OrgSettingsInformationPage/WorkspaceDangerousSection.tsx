import React, {memo} from 'react';
import {OrgSettingsListSection} from '^clients/private/_layouts/OrgSettingsLayout';
import {organizationApi} from '^models/Organization/api';
import {useCurrentOrg} from '^models/Organization/hook';
import {toast} from 'react-hot-toast';
import {useRouter} from 'next/router';
import {useTranslation} from 'next-i18next';

interface WorkspaceDangerousSectionProps {
    orgId: number;
}

export const WorkspaceDangerousSection = memo((props: WorkspaceDangerousSectionProps) => {
    const {orgId} = props;
    const router = useRouter();
    const {currentOrg} = useCurrentOrg(orgId);
    const {t} = useTranslation('workspaceSettings');

    const checkPrompt = (msg: string, orgName: string, limit: number): boolean => {
        const text = window.prompt(msg);
        if (text === null) return false;
        if (text === orgName) return true;
        if (limit < 1) return false;
        return checkPrompt(t('danger.promptRetry', {text, orgName}), orgName, limit - 1);
    };

    const destroy = async () => {
        if (!currentOrg) return;
        const orgName = currentOrg.name;

        const checked = checkPrompt(t('danger.prompt', {orgName}), orgName, 3);
        if (!checked) {
            toast(t('danger.cancel'));
            return;
        }

        organizationApi
            .destroy(orgId)
            .then(() => toast.success(t('danger.success')))
            .then(() => router.replace('/'));
    };

    return (
        <OrgSettingsListSection
            className="!border-red-300 !bg-red-50 text-red-400"
            title={<span className="">{t('danger.title')}</span>}
        >
            <div className="flex items-start justify-between">
                <div className="text-15">
                    <p className="text-15">{t('danger.desc1')}</p>
                    <p className="text-15">
                        <b>{t('danger.desc2')}</b>
                        {t('danger.desc3')}
                    </p>
                </div>
                <div>
                    <button onClick={destroy} className="btn btn-error text-white no-animation btn-animation">
                        {t('danger.deleteBtn')}
                    </button>
                </div>
            </div>
        </OrgSettingsListSection>
    );
});
