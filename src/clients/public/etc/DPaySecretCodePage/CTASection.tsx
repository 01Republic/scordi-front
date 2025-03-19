import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface CTASectionProps extends WithChildren {}

export const CTASection = memo((props: CTASectionProps) => {
    const {children} = props;

    return <div className="sm:relative bg-white/50">{children}</div>;
});
CTASection.displayName = 'CTASection';
