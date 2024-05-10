import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface InputSectionHeader extends WithChildren {
    title?: string;
    desc?: string;
}

export const InputSectionHeader = memo((props: InputSectionHeader) => {
    const {title = '', desc = '', children} = props;
    return (
        <div className="flex items-center justify-between mb-4">
            <div className="flex-auto">
                {title && <h4 className="text-xl tracking-[0.25px]">{title}</h4>}
                {desc && <p className="text-14 tracking-[0.25px] text-gray-500">{desc}</p>}
            </div>

            {children}
        </div>
    );
});

interface InputSectionProps extends InputSectionHeader {
    className?: string;
}

export const InputSection = memo((props: InputSectionProps & WithChildren) => {
    const {title = '', desc = '', className = 'max-w-md', children, ...res} = props;

    return (
        <div className={`mb-10 ${className}`} {...res}>
            {(title || desc) && <InputSectionHeader title={title} desc={desc} />}

            <div className="w-full">{children}</div>
        </div>
    );
});
InputSection.displayName = 'InputSection';
