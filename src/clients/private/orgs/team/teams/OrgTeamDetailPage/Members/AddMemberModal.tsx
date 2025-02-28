import React, {memo, useEffect} from 'react';
import {toast} from 'react-hot-toast';
import {useRecoilValue} from 'recoil';
import {FaChevronLeft} from 'react-icons/fa6';
import {orgIdParamState, teamIdParamState} from '^atoms/common';
import {teamMembershipApi} from '^models/TeamMembership/api';
import {TeamMemberSelectItem} from '^models/TeamMember/components/TeamMemberSelectItem';
import {TeamMemberDto, useAddableTeamMemberListInAddTeamMemberModal} from '^models/TeamMember';
import {ModalProps} from '^components/modals/_shared/Modal.types';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {LoadableBox} from '^components/util/loading';

interface AddMemberModalProps extends ModalProps {
    //
}

export const AddMemberModal = memo(function AddMemberModal(props: AddMemberModalProps) {
    const orgId = useRecoilValue(orgIdParamState);
    const teamId = useRecoilValue(teamIdParamState);
    const {isOpened, onClose} = props;
    const {result, search, reset, isLoading} = useAddableTeamMemberListInAddTeamMemberModal();
    const [selected, setSelected] = React.useState<TeamMemberDto[]>([]);

    const fetchAddableTeamMembers = () => {
        if (!orgId || isNaN(orgId)) return;
        if (!teamId || isNaN(teamId)) return;

        search({
            relations: ['teams'],
            where: {organizationId: orgId},
            itemsPerPage: 0,
            order: {id: 'DESC'},
        });
    };

    const onSave = () => {
        const requests = selected.map(({id: teamMemberId}) => {
            return teamMembershipApi.create(orgId, {teamId, teamMemberId});
        });

        Promise.allSettled(requests)
            .then(() => toast.success('구성원을 연결했어요.'))
            .then(() => setSelected([]))
            .then(() => onClose());
    };

    const availableTeamMembers = result.items.filter(({teams = []}) => {
        return teams.every((team) => team.id !== teamId);
    });

    const onCloseModal = () => {
        setSelected([]);
        onClose();
    };

    const onClick = (teamMember: TeamMemberDto) => {
        if (selected.includes(teamMember)) {
            setSelected(selected.filter((item) => item !== teamMember));
        } else {
            setSelected([...selected, teamMember]);
        }
    };

    useEffect(() => {
        isOpened ? fetchAddableTeamMembers() : reset();
    }, [isOpened]);

    return (
        <SlideUpModal open={isOpened} onClose={onClose} size="md" modalClassName="rounded-none sm:rounded-t-box p-0">
            <div className="flex items-center">
                <div className="p-6 text-gray-400 hover:text-black transition-all cursor-pointer" onClick={onClose}>
                    <FaChevronLeft fontSize={16} />
                </div>
            </div>
            <div className="px-6 bg-white flex items-center justify-between">
                {availableTeamMembers.length ? (
                    <div className="">
                        <p className="text-12 text-scordi">이미 연결된 구성원은 제외했어요.</p>
                        <h3 className="text-18">팀에 연결할 구성원을 모두 선택해주세요.</h3>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-18">추가 할 수 있는 팀원이 없어요</h3>
                    </div>
                )}
            </div>
            <div className="px-6 py-6">
                <div className="-mx-6 px-6 sm:max-h-[60vh] sm:min-h-[40vh] overflow-auto no-scrollbar">
                    <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
                        {availableTeamMembers.map((teamMember, i) => (
                            <TeamMemberSelectItem
                                teamMember={teamMember}
                                onClick={onClick}
                                isSelected={selected.includes(teamMember)}
                            />
                        ))}
                    </LoadableBox>
                </div>
            </div>
            <div className="px-6 pb-4">
                {!selected.length ? (
                    <button type="button" className="btn btn-scordi btn-block btn-disabled2">
                        구성원을 선택해주세요
                    </button>
                ) : (
                    <button type="button" className="btn btn-scordi btn-block" onClick={onSave}>
                        {`${selected.length.toLocaleString()}명의 선택된 구성원 연결하기`}
                    </button>
                )}
            </div>
        </SlideUpModal>
    );
});
