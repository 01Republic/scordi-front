import {memo} from 'react';
import {IntegrationSlackMemberDto} from '^models/integration/IntegrationSlackMember/type/IntegrationSlackMember.dto';
import {SlackMemberProfile} from './SlackMemberProfile';
import {TeamMemberConnectDropdown} from './TeamMemberConnectDropdown';
import {SlackWorkspaceMemberMoreDropdown} from './SlackWorkspaceMemberMoreDropdown';
import {useTranslation} from 'next-i18next';

interface SlackWorkspaceMemberRowProps {
    item: IntegrationSlackMemberDto;
    reload?: () => any;
}

export const SlackWorkspaceMemberRow = memo((props: SlackWorkspaceMemberRowProps) => {
    const {item, reload} = props;
    const {t} = useTranslation('integrations');

    const getLevelNameKey = (levelName: string) => {
        switch (levelName) {
            case '워크스페이스 소유자':
                return 'slack.level.owner';
            case '워크스페이스 관리자':
                return 'slack.level.admin';
            case '단일 채널 게스트':
                return 'slack.level.singleChannelGuest';
            case '멀티 채널 게스트':
                return 'slack.level.multiChannelGuest';
            case '정식 멤버':
            default:
                return 'slack.level.member';
        }
    };

    return (
        <div
            onClick={() => console.log(item)}
            className={`py-3 px-6 border-b border-gray-100 bg-white flex flex-row items-center ${
                !item.isActive ? 'text-gray-300 !bg-gray-100/25' : ''
            }`}
        >
            <SlackMemberProfile item={item} />

            <div className="flex items-center text-14">
                <div className="flex items-center text-14 mr-8">
                    <div className="">{t(getLevelNameKey(item.levelName))}</div>
                    <span className="mx-1.5">&middot;</span>
                    <div className="">{item.isActive ? t('active') : t('inactive')}</div>
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
