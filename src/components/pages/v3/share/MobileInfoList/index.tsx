import {memo} from 'react';
import {WithChildren} from '^types/global.type';

export const MobileInfoList = memo(({children}: WithChildren) => {
    return <ul className="py-0">{children}</ul>;
});
