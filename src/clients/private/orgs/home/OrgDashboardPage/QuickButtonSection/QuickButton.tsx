import React from 'react';
import {WithChildren} from '^types/global.type';
import {LinkTo} from '^components/util/LinkTo';

interface QuickButtonProps extends WithChildren {
    text: string;
    url?: string;
    Icon: () => JSX.Element;
    onClick?: () => void;
}

export const QuickButton = (props: QuickButtonProps) => {
    const {text, url, Icon, onClick} = props;

    return (
        <LinkTo href={url} onClick={onClick} className="btn-dashboard">
            <Icon />
            <p className="font-semibold">{text}</p>
        </LinkTo>
    );
};
