import React, {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {Icon} from '^components/Icon';
import {MobileSection} from '^v3/share/sections/MobileSection';

export const ProfilePanel = memo(() => {
    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <div className="flex items-center gap-6 px-3 py-2.5 -mx-3 bg-base-100 text-gray-700 cursor-pointer hover:bg-neutral">
                    <Avatar className="w-16 h-16 outline outline-offset-1 outline-slate-100" />
                    <div className="flex-1">
                        <h1 className="text-xl text-500">이진경</h1>
                        <p className="text-[16px]">
                            <small className="mr-0.5">Coo</small>
                        </p>
                    </div>
                    <Icon.ChevronRight />
                </div>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
