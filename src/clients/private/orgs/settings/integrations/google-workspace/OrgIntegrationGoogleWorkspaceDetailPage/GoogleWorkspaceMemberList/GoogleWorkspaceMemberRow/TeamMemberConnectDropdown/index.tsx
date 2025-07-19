import {memo} from 'react';
import {ChevronDown} from 'lucide-react';
import {WithChildren} from '^types/global.type';
import {IntegrationSlackMemberDto} from '^models/integration/IntegrationSlackMember/type/IntegrationSlackMember.dto';
import {ConnectedTeamMemberTag} from './ConnectedTeamMemberTag';
import {IntegrationGoogleWorkspaceMemberDto} from '^models/integration/IntegrationGoogleWorkspaceMember/type/IntegrationGoogleWorkspaceMember.dto';
import {useTranslation} from 'next-i18next';

interface TeamMemberConnectDropdownProps extends WithChildren {
    item: IntegrationGoogleWorkspaceMemberDto;
}

export const TeamMemberConnectDropdown = memo((props: TeamMemberConnectDropdownProps) => {
    const {item, children} = props;
    const {t} = useTranslation('integrations');

    return (
        <div
            className={`border border-gray-100 rounded-lg bg-gray-100 py-1 pl-1 pr-4 w-full ${
                !item.isDeleted ? 'hover:bg-gray-200/90 cursor-pointer' : 'pointer-events-none'
            } transition-all flex items-center justify-between`}
        >
            <div>
                {item.teamMemberId ? (
                    item.teamMember ? (
                        <ConnectedTeamMemberTag teamMember={item.teamMember} />
                    ) : (
                        <div className="text-gray-400">{t('loadError')}</div>
                    )
                ) : (
                    <div className="text-gray-500 opacity-40">{t('select')}</div>
                )}
            </div>

            {/*<div className="">*/}
            {/*    <ChevronDown />*/}
            {/*</div>*/}
        </div>
    );
});
TeamMemberConnectDropdown.displayName = 'TeamMemberConnectDropdown';
