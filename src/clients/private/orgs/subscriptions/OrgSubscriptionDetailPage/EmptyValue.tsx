import {useTranslation} from 'next-i18next';

export const EmptyValue = () => {
    const {t} = useTranslation('common');
    return <div className="text-13 text-gray-300">{t('empty')}</div>;
};
