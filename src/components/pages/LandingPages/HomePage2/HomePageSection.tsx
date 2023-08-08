import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface HomePageSectionProps extends WithChildren {
    sectionClass?: string;
    containerClass?: string;
}

export const HomePageSection = memo((props: HomePageSectionProps) => {
    const {sectionClass = '', containerClass = '', children} = props;

    return (
        <section className={sectionClass}>
            <div className={`container max-w-5xl px-4 sm:px-0 py-[100px] ${containerClass}`}>{children}</div>
        </section>
    );
});
