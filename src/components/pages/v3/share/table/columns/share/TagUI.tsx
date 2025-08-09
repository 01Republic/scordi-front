import {CSSProperties, memo} from 'react';
import {WithChildren} from '^types/global.type';

interface TagUIProps extends WithChildren {
    className?: string;
    onClick?: () => any;
    style?: CSSProperties;
    noMargin?: boolean;
}

export const TagUI = memo((props: TagUIProps) => {
    const {children, className = '', onClick, style = {}, noMargin = false} = props;

    return (
        <div className={`inline-flex items-center ${noMargin ? '' : 'mr-1.5'}`}>
            <div
                onClick={onClick}
                className={`${className} text-12 font-normal cursor-pointer flex items-center justify-center h-[20px] min-w-0 max-w-full rounded-[3px] px-[6px] m-0 overflow-hidden whitespace-nowrap`}
                style={{
                    lineHeight: '120%',
                    textOverflow: 'ellipsis',
                    ...style,
                }}
            >
                {children}
            </div>
        </div>
    );
});
TagUI.displayName = 'TagUI';
