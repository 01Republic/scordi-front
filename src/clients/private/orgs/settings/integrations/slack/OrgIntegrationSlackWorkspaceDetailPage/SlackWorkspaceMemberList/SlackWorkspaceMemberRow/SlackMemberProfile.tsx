import {memo} from 'react';
import {IntegrationSlackMemberDto} from '^models/integration/IntegrationSlackMember/type/IntegrationSlackMember.dto';
import {NextImage} from '^components/NextImage';

interface SlackMemberProfileProps {
    item: IntegrationSlackMemberDto;
}

export const SlackMemberProfile = memo((props: SlackMemberProfileProps) => {
    const {item} = props;
    const {response} = item;
    const {profile} = response;
    const name = profile?.display_name || response.name || item.name;
    const symbol = item.name || item.email || item.slackId;

    return (
        <div className="flex items-center gap-2 flex-1">
            {/* Logo */}
            <div className="relative w-10 h-10 rounded-xl border border-gray-200 overflow-hidden">
                {item.imageUrl ? (
                    <NextImage src={item.imageUrl} alt={item.slackId} fill />
                ) : (
                    <div className="w-full h-full inline-block" style={{backgroundColor: item.response.color}}>
                        <span>{symbol.split('')[0]}</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex items-center text-14">
                    <span className="font-medium">{name}</span>
                    <span className="mx-1.5">&middot;</span>
                    <span className={item.isActive ? `text-gray-500` : 'text-gray-300'}>{item.name}</span>
                </div>
                <div className={`text-12 ${item.isActive ? 'text-gray-400' : 'text-gray-300'}`}>{item.email}</div>
            </div>
        </div>
    );
});
SlackMemberProfile.displayName = 'SlackMemberProfile';
