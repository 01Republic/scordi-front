import {LinkTo} from '^components/util/LinkTo';
import React from 'react';

interface Props {
    text: string;
    href: string;
    active?: boolean;
    disabled?: boolean;
}

export const SubjectLink = (props: Props) => {
    const {text, href, active = false, disabled = false} = props;

    if (disabled) {
        return <span className="cursor-not-allowed text-gray-300">{text}</span>;
    }

    if (active) {
        return <span className="cursor-pointer text-black">{text}</span>;
    }

    return (
        <LinkTo
            href={href}
            className={`cursor-pointer text-gray-300 hover:text-black transition-all`}
            displayLoading={false}
        >
            {text}
        </LinkTo>
    );
};
