import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import Tippy from '@tippyjs/react';
import {Placement} from 'tippy.js';

interface TipProps extends WithChildren {
    text?: string;
    subtext?: string;
    content?: React.ReactNode;
    placement?: Placement;
}

export const Tip = memo((props: TipProps) => {
    const {text, subtext = '', placement, content, children} = props;

    return (
        <Tippy
            className="!text-12 !bg-slate-700"
            placement={placement || 'bottom'}
            content={
                content || (
                    <div className="flex flex-col gap-[2px]">
                        <div className="text-white leading-none">{text}</div>
                        {subtext && <div className="text-gray-400 leading-none">{subtext}</div>}
                    </div>
                )
            }
        >
            <div>{children}</div>
        </Tippy>
    );
});
Tip.displayName = 'Tip';
