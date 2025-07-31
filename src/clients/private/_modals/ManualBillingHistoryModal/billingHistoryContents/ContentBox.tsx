import {memo, ReactNode} from 'react';

interface ContentBoxProps {
    label: string;
    children: ReactNode;
    required?: boolean;
}

export const ContentBox = memo((props: ContentBoxProps) => {
    const {label, children, required = true} = props;
    return (
        <label htmlFor={label} className="flex flex-col gap-1 w-full overflow-hidden whitespace-nowrap">
            <div className="flex items-center gap-1">
                <span className="pl-1">{label}</span>
                <span className={`text-red-500 mt-1 ${required ? '' : 'invisible'}`}>*</span>
            </div>
            {children}
        </label>
    );
});
