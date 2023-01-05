import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {MobileSection} from '^components/v2/MobileSection';

type MobileGridSectionProps = {
    line?: boolean | undefined;
    className?: string | undefined;
} & WithChildren;

export const MobileGridSection = memo((props: MobileGridSectionProps) => {
    const {line = true, className = '', children} = props;

    return (
        <MobileSection className={className}>
            <div className={`bs-row mx-0 py-3 ${line && 'border-b-2'}`}>{children}</div>
        </MobileSection>
    );
});

type MobileGridColumnProps = {
    line?: boolean | undefined;
} & WithChildren;

export const MobileGridColumn = memo((props: MobileGridColumnProps) => {
    const {line = true, children} = props;

    return (
        <div className="bs-col py-3 px-0">
            <div className={`w-full ${line && 'border-r border-r-2'}`}>{children}</div>
        </div>
    );
});

type MobileGridColumnKeyValueBoxProps = {
    label: string;
    value: string;
} & WithChildren;

export const MobileGridColumnKeyValueBox = memo((props: MobileGridColumnKeyValueBoxProps) => {
    const {label, value, children} = props;

    return (
        <>
            <p className="text-center text-sm text-gray-500">{label}</p>
            <p className="text-center text-base font-bold">{value}</p>
            {children}
        </>
    );
});

export const MobileGrid = {
    Section: MobileGridSection,
    Column: MobileGridColumn,
    KeyValue: MobileGridColumnKeyValueBox,
};
