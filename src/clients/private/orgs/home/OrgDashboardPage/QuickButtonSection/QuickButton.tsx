import Link from 'next/link';
import {WithChildren} from '^types/global.type';
import {AddCreditCardDropdown} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardListPage/AddCreditCardDropdown';
import React from 'react';
import {ReactComponentLike} from 'prop-types';

interface QuickButtonProps extends WithChildren {
    text: string;
    url?: string;
    Icon: () => JSX.Element;
    onClick?: () => any;
}

export const QuickButton = (props: QuickButtonProps) => {
    const {text, url, Icon, onClick} = props;

    return (
        <>
            {url ? (
                <Link
                    href={url ? url : '#'}
                    className="flex items-center gap-2 px-3 py-2 text-scordi border border-scordi-light rounded-lg"
                >
                    <Icon />
                    <p className="font-semibold">{text}</p>
                </Link>
            ) : (
                <button
                    onClick={onClick}
                    className="flex items-center gap-2 px-3 py-2 text-scordi border border-scordi-light rounded-lg"
                >
                    <Icon />
                    <p className="font-semibold">{text}</p>
                </button>
            )}
        </>
    );
};
