import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface IsFreeTierTagUIProps {
    value: boolean;
}

export const IsFreeTierTagUI = memo((props: IsFreeTierTagUIProps) => {
    const {value} = props;
    const {t} = useTranslation('subscription');
    const colorClass = value ? 'bg-gray-100' : 'bg-green-200';
    const text = value ? t('scope.free') : t('scope.paid');

    return <TagUI className={colorClass}>{text}</TagUI>;
});
IsFreeTierTagUI.displayName = 'IsFreeTierTagUI';
