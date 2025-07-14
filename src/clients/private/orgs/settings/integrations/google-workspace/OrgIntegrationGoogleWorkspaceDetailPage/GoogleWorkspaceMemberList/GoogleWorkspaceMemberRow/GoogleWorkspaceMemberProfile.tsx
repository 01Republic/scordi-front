import React, {memo} from 'react';
import SlackLogo from '^public/logo/icons/ic_slack.png';
import {IntegrationSlackMemberDto} from '^models/integration/IntegrationSlackMember/type/IntegrationSlackMember.dto';
import {NextImage} from '^components/NextImage';
import {IntegrationGoogleWorkspaceMemberDto} from '^models/integration/IntegrationGoogleWorkspaceMember/type/IntegrationGoogleWorkspaceMember.dto';
import GoogleWorkspaceLogo from '^public/images/logo/external/logo_google_workspace.png';

interface GoogleWorkspaceMemberProfileProps {
    item: IntegrationGoogleWorkspaceMemberDto;
}

export const GoogleWorkspaceMemberProfile = memo((props: GoogleWorkspaceMemberProfileProps) => {
    const {item} = props;
    const {response} = item;
    const name = item.name;
    const symbol = item.name || item.email || response.primaryEmail;

    return (
        <div className="flex items-center gap-2 flex-1">
            {/* Logo */}
            <div className="relative">
                <div className="relative w-10 h-10 rounded-xl border border-gray-200 overflow-hidden">
                    {item.imageUrl ? (
                        <NextImage src={item.imageUrl} alt={item.googleWorkspaceId} fill />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="font-bold text-gray-600">{item.response.name.givenName.split('')[0]}</span>
                        </div>
                    )}
                </div>

                <div className="absolute -right-1 -bottom-1 bg-white p-0.5 rounded-lg">
                    <div className="relative w-3 h-3 overflow-hidden">
                        <NextImage src={GoogleWorkspaceLogo} alt="google workspace logo" />
                    </div>
                </div>
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
GoogleWorkspaceMemberProfile.displayName = 'GoogleWorkspaceMemberProfile';
