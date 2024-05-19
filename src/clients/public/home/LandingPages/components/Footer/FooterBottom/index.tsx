import React, {memo} from 'react';
import {TermLinks} from './TermLinks';
import {useGetClientBrowser} from '^hooks/useClientBrowser';

export const FooterBottom = memo(function FooterBottom() {
    const browserInfo = useGetClientBrowser();

    const onClick = () => {
        if (typeof window === 'undefined') return;
        const ua = window.navigator.userAgent.toLowerCase();
        alert(`${browserInfo.os} / ${browserInfo.browser}\n------\n${ua}\n------`);
    };

    return (
        <div className="w-full text-center border-t relative z-[9]">
            <div className="container px-4 sm:px-0 md:flex justify-between items-center">
                <div className="py-2 text-xs text-gray-500">
                    <TermLinks />
                </div>
                <p className="py-2 text-xs text-gray-500">
                    Copyright ⓒ 01Republic, Inc. All Rights <span onClick={onClick}>Reserved.</span>
                </p>
            </div>
        </div>
    );
});
