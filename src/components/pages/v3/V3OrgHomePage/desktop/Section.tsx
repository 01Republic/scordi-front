import {memo} from 'react';
import {ReactNodeLike} from 'prop-types';
import {WithChildren} from '^types/global.type';
import {ComponentLike, renderAll, renderOne} from '^components/util/ComponentLike';

interface SectionProps extends WithChildren {
    title?: ReactNodeLike;
    titleButtons?: ComponentLike[];
    rightTopCaption?: ComponentLike;
    rightButtons?: ComponentLike[];
}

export const Section = memo((props: SectionProps) => {
    const {title, titleButtons = [], rightTopCaption, rightButtons = [], children} = props;
    return (
        <section className="mb-14">
            <div className="flex items-center justify-between">
                <div className="mb-4 flex gap-4">
                    {title && <h2 className="font-semibold text-gray-500">{title}</h2>}
                    {renderAll(titleButtons)}
                </div>

                <div className="flex items-center gap-2">
                    {rightTopCaption && renderOne(rightTopCaption)}
                    {renderAll(rightButtons)}
                </div>
            </div>

            {children}
        </section>
    );
});
Section.displayName = 'Section';
