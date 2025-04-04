import {memo} from 'react';
import {IntegrationSlackMemberDto} from '^models/integration/IntegrationSlackMember/type/IntegrationSlackMember.dto';
import {SlackMemberProfile} from './SlackMemberProfile';
import {TeamMemberConnectDropdown} from './TeamMemberConnectDropdown';
import {SlackWorkspaceMemberMoreDropdown} from './SlackWorkspaceMemberMoreDropdown';

interface SlackWorkspaceMemberRowProps {
    item: IntegrationSlackMemberDto;
    reload?: () => any;
}

export const SlackWorkspaceMemberRow = memo((props: SlackWorkspaceMemberRowProps) => {
    const {item, reload} = props;

    return (
        <div
            onClick={() => console.log(item)}
            className={`py-3 px-6 border border-b border-gray-100 bg-white flex flex-row items-center ${
                !item.isActive ? 'text-gray-300 !bg-gray-100/25' : ''
            }`}
        >
            <SlackMemberProfile item={item} />

            <div className="flex items-center text-14">
                <div className="flex items-center text-14 mr-8">
                    <div className="">{item.levelName}</div>
                    <span className="mx-1.5">&middot;</span>
                    <div className="">{item.isActive ? '활성' : '비활성'}</div>
                </div>

                <div className="min-w-[10rem] flex items-center justify-end mr-2">
                    <TeamMemberConnectDropdown item={item} />
                </div>

                <div className="flex items-center">
                    <SlackWorkspaceMemberMoreDropdown item={item} reload={reload} />
                </div>
            </div>
        </div>
    );
});
SlackWorkspaceMemberRow.displayName = 'SlackWorkspaceMemberRow';
