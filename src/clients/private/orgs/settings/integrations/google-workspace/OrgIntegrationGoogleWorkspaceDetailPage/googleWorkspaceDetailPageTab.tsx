import React from 'react';
import {WithChildren} from '^types/global.type';
import {defineTabs, TabProps} from '^components/util/tabs';
import {GoogleWorkspaceMemberList} from './GoogleWorkspaceMemberList';
import {GoogleWorkspaceSetting} from './GoogleWorkspaceSetting';

export const googleWorkspaceDetailPageTab = defineTabs(
    'googleWorkspaceDetailPageTab',
    [
        {label: '멤버', TabPane: GoogleWorkspaceMemberList},
        {label: '설정', TabPane: GoogleWorkspaceSetting},
    ],
    {TabNav, Tab},
);

function TabNav(props: WithChildren) {
    const {children} = props;

    return (
        <div className="w-full border-b border-gray-200 mt-8">
            <div className="w-full flex items-center">{children}</div>
        </div>
    );
}

function Tab({tabName, active, onClick}: TabProps) {
    return (
        <div
            onClick={onClick}
            className={`px-4 py-2 text-14 font-medium cursor-pointer relative top-[1px] min-w-[5rem] text-center border rounded-tl-lg rounded-tr-lg ${
                active ? 'text-gray-600' : 'text-gray-400 hover:text-gray-600'
            } ${
                active ? 'bg-white hover:bg-white border-gray-200 border-b-transparent' : 'border-transparent'
            } transition-all`}
        >
            {tabName}
        </div>
    );
}
