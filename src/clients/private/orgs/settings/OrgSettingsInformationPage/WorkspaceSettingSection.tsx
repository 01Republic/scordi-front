import React, {memo} from 'react';
import {SelectDropdown} from '^v3/share/Select';
import {OrgSettingsListSection} from '^clients/private/_layouts/OrgSettingsLayout';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';

interface WorkspaceSettingSectionProps {
    orgId: number;
}

export const WorkspaceSettingSection = memo((props: WorkspaceSettingSectionProps) => {
    const {orgId} = props;
    const {t} = useTranslation('workspaceSettings');
    const router = useRouter();

    const handleLanguageChange = (option: {value?: string}) => {
        const value = option.value;
        const currentPath = router.asPath;
        if (value === 'en') {
            if (!currentPath.startsWith('/en')) {
                router.push('/en' + currentPath);
            }
        } else {
            if (currentPath.startsWith('/en')) {
                router.push(currentPath.replace(/^\/en/, '') || '/');
            }
        }
    };

    return (
        <OrgSettingsListSection
            title={t('setting.title')}
            items={[
                {
                    title: <span className="text-15">{t('setting.language')}</span>,
                    desc: (
                        <SelectDropdown
                            placeholder={t('setting.languagePlaceholder') ?? ''}
                            options={[
                                {value: 'kr', text: t('setting.korean'), selected: !router.asPath.startsWith('/en')},
                                {value: 'en', text: t('setting.english'), selected: router.asPath.startsWith('/en')},
                            ]}
                            onChange={handleLanguageChange}
                        />
                    ),
                },
            ]}
        />
    );
});
WorkspaceSettingSection.displayName = 'WorkspaceSettingSection';
