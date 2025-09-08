import {memo} from 'react';
import {IntegrationGoogleWorkspaceMemberDto} from '^models/integration/IntegrationGoogleWorkspaceMember/type/IntegrationGoogleWorkspaceMember.dto';
import {GoogleWorkspaceMemberProfile} from './GoogleWorkspaceMemberProfile';
import {GoogleWorkspaceTeamMemberConnectDropdown} from './TeamMemberConnectDropdown';
import {GoogleWorkspaceMemberMoreDropdown} from './GoogleWorkspaceMemberMoreDropdown';

interface GoogleWorkspaceMemberRowProps {
    item: IntegrationGoogleWorkspaceMemberDto;
    reload?: () => any;
}

export const GoogleWorkspaceMemberRow = memo((props: GoogleWorkspaceMemberRowProps) => {
    const {item, reload} = props;

    return (
        <div
            onClick={() => console.log(item)}
            className={`py-3 px-6 border-b border-gray-100 bg-white flex flex-row items-center ${
                !item.isActive ? 'text-gray-300 !bg-gray-100/25' : ''
            }`}
        >
            <GoogleWorkspaceMemberProfile item={item} />

            <div className="flex items-center text-14">
                <div className="flex items-center text-14 mr-8">
                    <div className="">{item.levelName}</div>
                    <span className="mx-1.5">&middot;</span>
                    <div className="">{item.isActive ? '활성' : '비활성'}</div>
                </div>

                <div className="min-w-[10rem] flex items-center justify-end mr-2">
                    <GoogleWorkspaceTeamMemberConnectDropdown item={item} reload={reload} />
                </div>

                <div className="flex items-center">
                    <GoogleWorkspaceMemberMoreDropdown item={item} reload={reload} />
                </div>
            </div>
        </div>
    );
});
GoogleWorkspaceMemberRow.displayName = 'GoogleWorkspaceMemberRow';
