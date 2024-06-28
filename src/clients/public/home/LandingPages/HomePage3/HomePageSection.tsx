import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface HomePageSectionProps extends WithChildren {
    sectionClass?: string;
    containerClass?: string;
    activeBgColorClass?: boolean | string;
}

export const HomePageSection = memo((props: HomePageSectionProps) => {
    const {sectionClass = '', containerClass = '', activeBgColorClass = false, children} = props;

    const activeBgColor = (() => {
        if (activeBgColorClass === false) return '';
        if (activeBgColorClass === true || activeBgColorClass === '') return 'bg-scordi-light-100';
        return activeBgColorClass;
    })();

    return (
        <section className={`${sectionClass} ${activeBgColor}`}>
            <div className={`container max-w-5xl px-4 sm:px-0 py-[60px] ${containerClass}`}>{children}</div>
        </section>
    );
});
