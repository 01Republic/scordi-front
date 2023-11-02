import React, {memo} from 'react';
import {TermLinks} from './TermLinks';

export const FooterBottom = memo(function FooterBottom() {
    return (
        <div className="w-full text-center border-t">
            <div className="container px-4 sm:px-0 md:flex justify-between items-center">
                <div className="py-2 text-xs text-gray-500">
                    <TermLinks />
                </div>
                <p className="py-2 text-xs text-gray-500">Copyright ⓒ 01Republic, Inc. All Rights Reserved</p>
            </div>
        </div>
    );
});
