import React, {memo} from 'react';
import {FcDataBackup, FcDataRecovery} from 'react-icons/fc';
import {IconType} from '@react-icons/all-files';
import {FaChevronRight} from 'react-icons/fa6';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {GoogleAdminOAuthButton} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {useGoogleLoginForWorkspaceConnect} from './useGoogleLoginForWorkspaceConnect';
import {ExcelIcon} from '^components/react-icons';

interface TeamMemberCreateMethodModalProps {
    isOpened: boolean;
    onClose: () => any;
    onSelect: (method: 'auto' | 'manual' | 'by-excel', code?: string) => any;
}

export const TeamMemberCreateMethodModal = memo((props: TeamMemberCreateMethodModalProps) => {
    const {isOpened, onClose, onSelect} = props;
    const {setCode: setGsuiteAuthCode, resetCode: resetGsuiteAuthCode} = useGoogleLoginForWorkspaceConnect();

    return (
        <SlideUpModal open={isOpened} onClose={onClose} size="md">
            <h3 className="font-bold text-xl">어떤 방법으로 추가할까요?</h3>

            <div className="py-4 flex flex-col gap-3">
                <GoogleAdminOAuthButton
                    onCode={(code) => {
                        setGsuiteAuthCode(code);
                        onSelect('auto', code);
                    }}
                >
                    <MethodOption
                        Icon={FcDataBackup}
                        title="구성원 불러오기"
                        desc="구글워크스페이스 로그인으로 한 번에 불러와요."
                        onClick={resetGsuiteAuthCode}
                    />
                </GoogleAdminOAuthButton>
                <MethodOption
                    Icon={FcDataRecovery}
                    title="직접 입력하기"
                    desc="멤버를 수기로 입력해요"
                    onClick={() => {
                        onClose();
                        onSelect('manual');
                    }}
                />
                <MethodOption
                    Icon={ExcelIcon}
                    title="엑셀로 대량 등록하기"
                    desc="템플릿에 구성원 정보를 일괄 작성한 뒤 등록해요."
                    onClick={() => {
                        onClose();
                        onSelect('by-excel');
                    }}
                />
            </div>
        </SlideUpModal>
    );
});
TeamMemberCreateMethodModal.displayName = 'TeamMemberCreateMethodModal';

interface Props {
    Icon: IconType;
    title: string;
    desc: string;
    onClick: () => any;
}

const MethodOption = memo((props: Props) => {
    const {Icon, title, desc, onClick} = props;

    return (
        <div
            className="flex items-center -mx-3 px-3 py-3 rounded-box cursor-pointer group hover:bg-scordi-50 transition-all"
            onClick={onClick}
        >
            <div className="">
                <Icon fontSize={24} />
            </div>

            <div className="flex-auto px-3">
                <p className="text-14">{title}</p>
                <p className="text-12 text-gray-400">{desc}</p>
            </div>

            <div>
                <FaChevronRight className="text-gray-400 group-hover:text-black transition-all" />
            </div>
        </div>
    );
});
