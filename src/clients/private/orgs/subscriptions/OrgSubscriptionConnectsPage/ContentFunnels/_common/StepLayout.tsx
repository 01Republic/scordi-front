import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface StepLayoutProps extends WithChildren {
    title?: string;
    desc?: string;
}

export const StepLayout = memo((props: StepLayoutProps) => {
    const {title = '', desc = '', children} = props;

    return (
        <div className="pt-10">
            {title && (
                <div className="mb-6">
                    <h2 className={`tracking-[0.25px] ${desc ? 'mb-2' : 'mb-4'}`}>{title}</h2>
                    {desc && <p className="tracking-[0.5px] text-gray-400 text-16 mb-4">{desc}</p>}
                </div>
            )}

            {children}
        </div>
    );
});
StepLayout.displayName = 'StepLayout';
