import {memo, ReactNode} from 'react';
import {WithChildren} from '^types/global.type';

interface CTASectionProps extends WithChildren {
    label?: ReactNode;
}

export const CTASection = memo((props: CTASectionProps) => {
    const {label, children} = props;

    return (
        <section className="flex flex-col gap-6">
            {label && <p className="text-2xl font-bold">{label}</p>}

            {children}
        </section>
    );
});
CTASection.displayName = 'CTASection';
