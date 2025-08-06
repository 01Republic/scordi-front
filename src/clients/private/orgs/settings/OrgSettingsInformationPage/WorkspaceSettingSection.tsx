import {OrgSettingsListSection} from '^clients/private/_layouts/OrgSettingsLayout';
import {SelectDropdown} from '^v3/share/Select';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {memo} from 'react';

interface WorkspaceSettingSectionProps {
    orgId: number;
}

export const WorkspaceSettingSection = memo((props: WorkspaceSettingSectionProps) => {
    const {orgId} = props;
    const {t} = useTranslation('workspaceSettings');
    const router = useRouter();

    const handleLanguageChange = (option: {value?: string}) => {
        const value = option.value;
        if (value) {
            router.push(router.asPath, router.asPath, {locale: value});
        }
    };

    console.log('Current locale:', router.locale);
    console.log('Current pathname:', router.pathname);
    console.log('Current asPath:', router.asPath);

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
                                {value: 'ko', text: t('setting.korean'), selected: router.locale === 'ko'},
                                {value: 'en', text: t('setting.english'), selected: router.locale === 'en'},
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
