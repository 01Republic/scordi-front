import React, {memo, useEffect} from 'react';
import {ModalProps} from '^components/modals/_shared/Modal.types';
import {orgIdParamState, teamIdParamState} from '^atoms/common';
import {useRecoilValue} from 'recoil';
import {TeamMemberDto, useTeamMembersInTeamMembersTable} from '^models/TeamMember';
import {teamMembershipApi} from '^models/TeamMembership/api';
import {TeamMembershipDto} from '^models/TeamMembership/type';
import {TeamMemberSelectItem} from '^v3/share/modals/AppShowPageModal/TeamMemberSelectModal/TeamMemberSelectItem';
import {toast} from 'react-hot-toast';

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
            toast.success('새로운 멤버를 연결 했어요');
            setSelected([]);
            onClose();
        });
    };

    const entries = result.items.filter(
        (item) => !props.preItems?.map((item) => item.teamMember?.id).includes(item.id),
    );

    const onCloseModal = () => {
        setSelected([]);
        onClose();
    };

    useEffect(() => {
        !!orgId && !!teamId && reload();
    }, [orgId, teamId]);

    return (
        <div
            data-modal="TeamMemberSelectModal-for-AppShowModal"
            className={`modal modal-bottom ${isOpened ? 'modal-open' : ''}`}
            onClick={onCloseModal}
        >
            <div
                className="modal-box max-w-lg p-0"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
            >
                <div className="p-4 bg-scordi">
                    <h3 className="font-bold text-lg text-white">팀에 등록할 팀 멤버를 선택해 주세요</h3>
                    <p className="text-sm text-white opacity-70">이미 추가된 멤버는 뺐어요</p>
                </div>
                <div className="px-4 pb-4 flex flex-col h-[50vh] overflow-y-auto no-scrollbar">
                    <div className="flex-1 py-4 px-2 text-sm">
                        <ul>
                            {entries.map((teamMember, i) => (
                                <li key={i}>
                                    <TeamMemberSelectItem
                                        item={teamMember}
                                        onClick={() => {
                                            if (selected.includes(teamMember)) {
                                                setSelected(selected.filter((item) => item !== teamMember));
                                            } else {
                                                setSelected([...selected, teamMember]);
                                            }
                                        }}
                                        isModalShown={isOpened}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="p-4 bg-white">
                    <button
                        disabled={selected.length < 1}
                        className="btn btn-lg btn-scordi btn-block rounded-box disabled:border-indigo-100 disabled:bg-indigo-100 disabled:text-indigo-300"
                        onClick={onSave}
                    >
                        {selected.length < 1 ? '선택한 항목이 없습니다' : `${selected.length}개의 선택된 항목`}
                    </button>
                </div>
            </div>
        </div>
    );
});
