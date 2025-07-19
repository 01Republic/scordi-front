import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {ChevronLeft} from 'lucide-react';
import {NextImage} from '^components/NextImage';
import GoogleWorkspaceLogo from '^public/images/logo/external/logo_google_workspace.png';
import {GoogleWorkspaceMembersSyncButton} from './GoogleWorkspaceMembersSyncButton';
import {useTranslation} from 'next-i18next';

export const GoogleWorkspaceDetailPageHeader = memo((props: any) => {
    const {workspace, refetch} = props;
    const {t} = useTranslation('integrations');
    const router = useRouter();

    return (
        <div className="flex items-center">
            {/* Back button */}
            <div
                className="mr-4 text-gray-400 hover:text-gray-900 transition-all cursor-pointer"
                onClick={() => router.back()}
            >
                <ChevronLeft fontSize={20} className="" />
            </div>
            {/* Left-side contents */}
            <div className="flex-1">
                {/* Profile */}
                <div className="flex items-center gap-3">
                    {/* logo */}
                    <div className="relative w-10 h-10 max-w-[60px] max-h-[60px]">
                        <NextImage src={GoogleWorkspaceLogo} alt="google workspace logo" />
                    </div>
                    {/* info */}
                    <div>
                        {/* service name */}
                        <div className="flex items-center gap-2.5">
                            {/* service name */}
                            <h2 className="leading-none">{t('googleWorkspace')}</h2>
                            {/* connect status */}
                            <div></div>
                        </div>
                        {/* workspace name */}
                        <div className="text-gray-500" onClick={() => console.log(workspace)}>
                            {workspace?.workspaceName}
                        </div>
                    </div>
                </div>
            </div>
            {/* Right-side button group */}
            <div className="flex items-center gap-3">
                <div>
                    <div className="text-gray-400 text-14 font-medium" onClick={() => console.log(workspace)}>
                        {t('id')}: {workspace?.unitId}
                    </div>
                </div>
                <div>
                    <GoogleWorkspaceMembersSyncButton workspace={workspace} reload={() => refetch()} />
                </div>
            </div>
        </div>
    );
});
