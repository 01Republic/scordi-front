import React, {memo, useEffect} from 'react';
import {ModalProps} from '^components/modals/_shared/Modal.types';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {orgIdParamState, teamIdParamState} from '^atoms/common';
import {useRecoilValue} from 'recoil';
import {FaCheck} from 'react-icons/fa6';
import {teamInvoiceAccountApi} from '^models/TeamInvoiceAccount/api';
import {TeamMemberDto, useTeamMember, useTeamMembersInTeamMembersTable} from '^models/TeamMember';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {teamMembershipApi} from '^models/TeamMembership/api';
import {TeamMembershipDto} from '^models/TeamMembership/type';
import {FiCheckCircle} from 'react-icons/fi';

interface AddMemberModalProps extends ModalProps {
    preItems?: TeamMembershipDto[];
}

export const AddMemberModal = memo(function AddMemberModal(props: AddMemberModalProps) {
    const orgId = useRecoilValue(orgIdParamState);
    const teamId = useRecoilValue(teamIdParamState);
    const {isOpened, onClose} = props;
    const {result, search, reload} = useTeamMembersInTeamMembersTable();
    const [selected, setSelected] = React.useState<TeamMemberDto[]>([]);

    const onSave = () => {
        const requests = selected.map((member) =>
            teamMembershipApi.create(orgId, {teamId: teamId, teamMemberId: member.id}),
        );
        const req = Promise.allSettled(requests);
        req.then(() => {
            setSelected([]);
            onClose();
        });
    };

    const entries = result.items.filter(
        (item) => !props.preItems?.map((item) => item.teamMember?.id).includes(item.id),
    );

    useEffect(() => {
        !!orgId && !!teamId && reload();
    }, [orgId, teamId]);

    return (
        <SlideUpModal open={isOpened} onClose={onClose} size="lg">
            <h3 className="font-bold text-xl">팀에 등록할 팀 멤버를 선택해 주세요</h3>
            <p className={'text-gray-500 mb-3'}>이미 추가된 멤버는 뺐어요</p>

            <div className="py-4 space-y-1 max-h-96 overflow-y-scroll">
                {entries.map((member, i) => (
                    <div
                        tabIndex={0}
                        key={i}
                        className={`px-4 py-2.5 cursor-pointer group hover:bg-gray-100 flex items-center justify-between rounded-box btn-animation ${
                            selected.includes(member) && 'bg-gray-50'
                        }`}
                        onClick={() => {
                            if (selected.includes(member)) {
                                setSelected(selected.filter((item) => item !== member));
                            } else {
                                setSelected([...selected, member]);
                            }
                        }}
                    >
                        <div className={'flex gap-3 items-center'}>
                            <TeamMemberAvatar teamMember={member} className="w-8 h-8" />
                            <p className="font-medium text-16">
                                {member.name}
                                <br />
                                <span className={'text-gray-400 text-sm'}>{member.email}</span>
                            </p>
                        </div>
                        <div>{selected.includes(member) && <FiCheckCircle className="text-scordi text-xl" />}</div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end gap-3">
                <button type="button" className="btn btn-link !no-underline text-scordi-500" onClick={onClose}>
                    취소
                </button>
                <button className="btn btn-scordi-500" onClick={onSave}>
                    저장하기
                </button>
            </div>
        </SlideUpModal>
    );
});
