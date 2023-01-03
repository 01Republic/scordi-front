import {memo} from 'react';
import {MobileSection} from '^components/v2/MobileSection';
import {WithChildren} from '^types/global.type';

type MobileKeyValueItem = {
    label: string;
    value: string;
} & WithChildren;

export const MobileKeyValueItem = memo(({label, value}: MobileKeyValueItem) => {
    return (
        <div className="flex w-full py-2.5 items-center justify-between">
            <span>{label}</span>
            <span className="text-gray-500 font-semibold">{value}</span>
        </div>
    );
});
