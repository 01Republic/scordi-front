import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface MethodsSectionProps extends WithChildren {
    id: string;
    title: string;
    description?: string;
}

export const MethodsSection = memo((props: MethodsSectionProps) => {
    const {id, title, description, children} = props;

    return (
        <section className="relative mb-20">
            <div id={id} className="absolute top-[-280px]"></div>

            <div className="mb-10">
                <h3 className="text-2xl font-bold mb-4">{title}</h3>
                {description && <p className="text-16 text-gray-500">{description}</p>}
            </div>

            {children}
        </section>
    );
});
MethodsSection.displayName = 'MethodsSection';
