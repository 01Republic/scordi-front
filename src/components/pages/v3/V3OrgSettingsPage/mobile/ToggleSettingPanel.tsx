import React, {memo} from 'react';
import {IoSettingsOutline} from 'react-icons/io5';

export const ToggleSettingPanel = memo(() => {
    return (
        <div className="btn btn-block btn-like border border-gray-300 btn-lg no-selectable bg-white">
            <div className="w-full h-full flex justify-center items-center">
                <IoSettingsOutline size={20} className="text-slate-500 mr-2.5" />
                <h1 className="text-lg">워크스페이스 관리하기</h1>
            </div>
        </div>
    );
});
