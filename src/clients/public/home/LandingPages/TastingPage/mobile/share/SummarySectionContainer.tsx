import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface SummarySectionContainerProps extends WithChildren {}

export const SummarySectionContainer = memo((props: SummarySectionContainerProps) => {
    const {children} = props;

    return <div className="flex sm:hidden items-center justify-around py-6">{children}</div>;
});
