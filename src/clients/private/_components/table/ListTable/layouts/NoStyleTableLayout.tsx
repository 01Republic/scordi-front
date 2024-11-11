import {memo} from 'react';
import {WithChildren} from '^types/global.type';

export const NoStyleTableLayout = memo(({children}: WithChildren) => <>{children}</>);
