import React, {memo} from 'react';
import {ReactNodeElement} from '^types/global.type';

interface TitleProps {
    text: ReactNodeElement;
    desc: ReactNodeElement;
}

export const Title = memo((props: TitleProps) => {
    const {text = '', desc = ''} = props;

    return (
        <div className="flex flex-col items-start gap-4">
            <p className="font-semibold text-2xl keep-all">{text}</p>
            <p className="text-gray-500 text-14 keep-all">{desc}</p>
        </div>
    );
});
