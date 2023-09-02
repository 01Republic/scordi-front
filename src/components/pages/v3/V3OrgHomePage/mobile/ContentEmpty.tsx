import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface ContentEmptyProps {
    text: string;
    subtext?: string;
    onClick?: () => any;
}

export const ContentEmpty = memo((props: ContentEmptyProps) => {
    const {text, subtext, onClick} = props;

    return (
        <div
            className="w-full transition-all border-dashed border-slate-300 hover:border-slate-400 border-[2px] py-8 rounded-box cursor-pointer hover:bg-slate-50"
            onClick={onClick}
        >
            <p className="text-xs w-full text-center text-slate-500">
                {text}
                <small className="block">{subtext}</small>
            </p>
        </div>
    );
});
