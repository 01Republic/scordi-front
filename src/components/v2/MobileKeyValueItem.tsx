import {memo, ReactNode} from 'react';
import {MobileSection} from '^components/v2/MobileSection';
import {WithChildren} from '^types/global.type';

type MobileKeyValueItem = {
    label: string | ReactNode;
    value?: string | ReactNode | undefined;
} & WithChildren;

export const MobileKeyValueItem = memo((props: MobileKeyValueItem) => {
    const {label, value, children} = props;
    return (
        <div className="flex w-full py-2.5 items-center justify-between">
            <span>{label}</span>
            {value && <span className="text-gray-500 font-semibold">{value}</span>}
            {children}
        </div>
    );
});
