import {memo} from 'react';
import {WithChildren} from '^types/global.type';

type MobileScrollableProps = {} & WithChildren;

export const MobileScrollable = (props: MobileScrollableProps) => {
    const {children} = props;
    return <div className="w-full h-[100vh] flex flex-col">{children}</div>;
};

type MobileScrollableFixedZoneProps = {} & WithChildren;

const MobileScrollableFixedZone = memo((props: MobileScrollableFixedZoneProps) => {
    return <div className="pb-1">{props.children}</div>;
});

type MobileScrollableScrollZoneProps = {} & WithChildren;

const MobileScrollableScrollZone = memo((props: MobileScrollableScrollZoneProps) => {
    return <div className="h-fit overflow-y-scroll">{props.children}</div>;
});

MobileScrollable.FixedZone = MobileScrollableFixedZone;
MobileScrollable.ScrollZone = MobileScrollableScrollZone;
