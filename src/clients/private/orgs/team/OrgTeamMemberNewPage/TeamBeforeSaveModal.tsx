import React, {memo, ReactNode} from 'react';
import {ModalProps} from '^components/modals/_shared/Modal.types';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {IconType} from '@react-icons/all-files';
import {FaChevronRight} from 'react-icons/fa6';
import {FcDataRecovery, FcInvite} from 'react-icons/fc';
import {CreateTeamMemberDto, teamMemberApi} from '^models/TeamMember';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {toast} from 'react-hot-toast';

interface BeforeSaveModalProps extends ModalProps {
    dto: CreateTeamMemberDto;
}

export const TeamBeforeSaveModal = memo((props: BeforeSaveModalProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const {isOpened, onClose, dto} = props;

    const createMember = () => teamMemberApi.create(orgId, dto).then((res) => res.data);

    return (
        <SlideUpModal open={isOpened} onClose={onClose} size="md">
            <h3 className="font-bold text-xl">초대하기</h3>

            <div className="py-4 flex flex-col gap-3">
                <MethodOption
                    Icon={FcInvite}
                    title="초대 메일 보내기"
                    desc="구성원을 등록하고 입력된 이메일로 초대장을 전송해요"
                    onClick={() => {
                        console.log(dto);
                    }}
                />
                <MethodOption
                    Icon={FcDataRecovery}
                    title="나중에 초대하기"
                    desc={
                        <span>
                            초대하지 않고 구성원 정보만 등록해요. <br /> 구성원 초대 현황에서 나중에 초대 할 수 있어요
                        </span>
                    }
                    onClick={() => {
                        createMember().then(() => {
                            toast.success('구성원을 등록했어요!');
                        });
                    }}
                />
            </div>
        </SlideUpModal>
    );
});
TeamBeforeSaveModal.displayName = 'BeforeSaveModal';

interface Props {
    Icon: IconType;
    title: string;
    desc: ReactNode;
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
                <Icon size={24} />
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
