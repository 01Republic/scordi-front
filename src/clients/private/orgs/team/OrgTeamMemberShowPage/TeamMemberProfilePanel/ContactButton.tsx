import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {LinkTo} from '^components/util/LinkTo';

interface ContactButtonProps extends WithChildren {
    tooltipText: string;
    href: string;
    className?: string;
    disabled?: boolean;
}

export const ContactButton = memo((props: ContactButtonProps) => {
    const {tooltipText, href, disabled = false, className = '', children} = props;

    return (
        <div className="tooltip" data-tip={tooltipText}>
            <LinkTo
                href={href}
                disabled={disabled}
                className={`btn btn-sm btn-square !bg-white border border-slate-300 rounded-md hover:border-slate-400 hover:shadow transition-all ${className}`}
                displayLoading={false}
            >
                {children}
            </LinkTo>
        </div>
    );
});
ContactButton.displayName = 'ContactButton';
