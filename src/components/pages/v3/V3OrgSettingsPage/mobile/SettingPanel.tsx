import React, {Dispatch, SetStateAction, memo} from 'react';
import {Settings} from 'lucide-react';

interface SettingPanelProps {
    isOrganization: boolean;
    setIsOrganization: Dispatch<SetStateAction<boolean>>;
}

export const SettingPanel = memo((props: SettingPanelProps) => {
    const {isOrganization, setIsOrganization} = props;

    return (
        <div
            onClick={() => {
                setIsOrganization((prev) => !prev);
            }}
            className="btn btn-block btn-like border border-gray-300 btn-lg no-selectable bg-white"
        >
            <div className="w-full h-full flex justify-center items-center">
                <Settings size={20} className="text-slate-500 mr-2.5" />
                <h1 className="text-lg">{isOrganization ? '내 프로필 설정하기' : '워크스페이스 관리하기'}</h1>
            </div>
        </div>
    );
});
