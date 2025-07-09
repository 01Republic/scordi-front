import React, {memo, useState} from 'react';
import {OrgSettingsListSection} from '^clients/private/_layouts/OrgSettingsLayout';
import {ChangeOrgInformationModal} from './ChangeOrgInformationModal';
import {useCurrentOrg} from '^models/Organization/hook';
import {useTranslation} from 'next-i18next';

interface OrgBasicInfoSectionProps {
    orgId: number;
}

export const OrgBasicInfoSection = memo((props: OrgBasicInfoSectionProps) => {
    const {orgId} = props;
    const {currentOrg, reload, isLoading} = useCurrentOrg(orgId);
    const [isChangeOrgInformationModalOpened, setIsChangeOrgInformationModalOpened] = useState(false);
    const {t} = useTranslation('workspaceSettings');

    const onCloseModal = () => {
        setIsChangeOrgInformationModalOpened(false);
        reload();
    };

    return (
        <>
            <OrgSettingsListSection
                title={t('basic')}
                buttonOnClick={() => setIsChangeOrgInformationModalOpened(true)}
                isLoading={isLoading}
                items={[
                    {title: t('workspaceName'), desc: currentOrg?.name || ''},
                    {
                        title: t('address'),
                        desc: currentOrg?.address ? (
                            `${currentOrg?.address || ''} ${currentOrg?.addressDetail || ''}`
                        ) : (
                            <span className={'text-gray-400'}>{t('registerAddress')}</span>
                        ),
                    },
                    {title: t('member'), desc: `${currentOrg?.memberCount.toLocaleString() || ''} ${t('memberUnit')}`},
                ]}
            />
            <ChangeOrgInformationModal isOpened={isChangeOrgInformationModalOpened} onClose={onCloseModal} />
        </>
    );
});
OrgBasicInfoSection.displayName = 'OrgBasicInfoSection';
