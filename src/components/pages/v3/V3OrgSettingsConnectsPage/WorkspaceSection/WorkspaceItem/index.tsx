import {ToolType} from '^v3/V3OrgSettingsConnectsPage/type';
import React, {memo} from 'react';
import {useToast} from '^hooks/useToast';
import {FcGoogle} from 'react-icons/fc';
import {BsMicrosoftTeams} from 'react-icons/bs';
import {SiNaver} from 'react-icons/si';
import {VscPlug} from 'react-icons/vsc';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {useOrganization} from '^models/Organization/hook';
import {useRecoilValue} from 'recoil';
import {Avatar} from '^components/Avatar';
import {currentOrgAtom} from '^models/Organization/atom';

interface WorkspaceItemProps {
    tool: ToolType;
}

export const WorkspaceItem = memo((props: WorkspaceItemProps) => {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const {toast} = useToast();
    const {tool} = props;

    if (!currentOrg) return <></>;

    const lastSyncAccount = currentOrg?.lastGoogleSyncHistory?.googleTokenData;

    const getLogo = (tool: ToolType) => {
        switch (tool) {
            case ToolType.google:
                return <FcGoogle size={28} />;
            case ToolType.microsoft:
                return <BsMicrosoftTeams size={26} className="text-indigo-500" />;
            case ToolType.naver:
                return <SiNaver size={22} className="text-green-500" />;
        }
    };

    return (
        <div className="flex justify-between px-5 border rounded-2xl mb-2 min-h-[74px] items-center">
            <p className="flex gap-3 self-center font-base">
                {getLogo(tool)} {tool}
            </p>

            {tool === ToolType.google && currentOrg && (
                <div className="!w-auto gap-4 flex">
                    <Avatar
                        src={lastSyncAccount?.picture}
                        className="w-9 h-9 outline outline-offset-1 outline-slate-100 mt-1"
                    />
                    <div className="flex-1">
                        <p>{lastSyncAccount?.name || <UnknownText />}</p>
                        <p className="text-sm font-extralight">
                            {lastSyncAccount?.email || <UnknownText text="xxx@xxx.xxx" />}
                        </p>
                    </div>
                </div>
            )}

            {tool === ToolType.google && !currentOrg && <GoogleLoginBtn className="!btn-md" logoSize="w-4 h-4" />}

            {tool !== ToolType.google && (
                <button
                    onClick={() => toast.info('준비중입니다.')}
                    className="btn btn-sm border font-normal w-fit px-5"
                >
                    <VscPlug size={18} className="mr-1" />
                    연동하기
                </button>
            )}
        </div>
    );
});

const UnknownText = memo(({text = '알 수 없음'}: {text?: string}) => {
    return <span className="italic text-gray-400 whitespace-nowrap">{text}</span>;
});
