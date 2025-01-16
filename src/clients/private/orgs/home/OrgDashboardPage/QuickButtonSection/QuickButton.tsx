import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import {WithChildren} from '^types/global.type';

interface QuickButtonProps extends WithChildren {
    text: string;
    url?: string;
    Icon: () => JSX.Element;
    onClick?: () => void;
}

export const QuickButton = (props: QuickButtonProps) => {
    const {text, url, Icon, onClick} = props;

    return (
        <>
            {url ? (
                <Link
                    href={url ? url : '#'}
                    className="flex items-center gap-2 px-3 py-2 text-scordi border border-scordi-light rounded-lg hover:bg-scordi-50 hover:border-scordi-300"
                >
                    <Icon />
                    <p className="font-semibold">{text}</p>
                </Link>
            ) : (
                <button
                    onClick={onClick}
                    className="flex items-center gap-2 px-3 py-2 text-scordi border border-scordi-light rounded-lg hover:bg-scordi-50 hover:border-scordi-300"
                >
                    <Icon />
                    <p className="font-semibold">{text}</p>
                </button>
            )}
        </>
    );
};
