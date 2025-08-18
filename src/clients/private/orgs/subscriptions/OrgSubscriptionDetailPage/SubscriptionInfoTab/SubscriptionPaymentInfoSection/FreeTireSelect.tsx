import {IsFreeTierTagUI} from '^models/Subscription/components/IsFreeTierTagUI';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface FreeTierSelectProps {
    isFreeTier: boolean;
    onChange: (value: boolean) => any;
}

/**
 * 유/무료
 */
export const FreeTierSelect = memo((props: FreeTierSelectProps) => {
    const {t} = useTranslation('subscription');
    const {isFreeTier, onChange} = props;

    const onSelect = async (isFreeTier: boolean) => {
        onChange(isFreeTier);
    };

    return (
        <SelectColumn
            value={isFreeTier}
            getOptions={async () => [true, false]}
            onSelect={onSelect}
            ValueComponent={IsFreeTierTag}
            contentMinWidth="240px"
            optionListBoxTitle={t('detail.paymentInfo.selectOptions.freePaid') as string}
            inputDisplay={false}
        />
    );
});
FreeTierSelect.displayName = 'FreeTierSelect';

const IsFreeTierTag = memo((props: {value: boolean | string}) => {
    const {value} = props;
    return <IsFreeTierTagUI value={value as boolean} />;
});
