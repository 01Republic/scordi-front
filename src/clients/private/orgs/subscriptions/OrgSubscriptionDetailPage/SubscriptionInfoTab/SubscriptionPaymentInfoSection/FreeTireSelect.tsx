import {memo} from 'react';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {IsFreeTierTagUI} from '^models/Subscription/components/IsFreeTierTagUI';

interface FreeTierSelectProps {
    isFreeTier: boolean;
    onChange: (value: boolean) => any;
}

/**
 * 유/무료
 */
export const FreeTierSelect = memo((props: FreeTierSelectProps) => {
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
            optionListBoxTitle="유/무료 여부를 변경합니다"
            inputDisplay={false}
        />
    );
});
FreeTierSelect.displayName = 'FreeTierSelect';

const IsFreeTierTag = memo((props: {value: boolean | string}) => {
    const {value} = props;
    return <IsFreeTierTagUI value={value as boolean} />;
});
