import {memo} from 'react';
import {WithChildren} from '^types/global.type';

type MobileTopNavRightProps = {} & WithChildren;

export const MobileTopNavRight = memo(({children}: MobileTopNavRightProps) => {
    return <div className="flex h-full space-x-1.5 items-center">{children}</div>;
});
