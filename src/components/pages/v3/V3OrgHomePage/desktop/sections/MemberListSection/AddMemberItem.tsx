import {memo} from 'react';
import {useSetRecoilState} from 'recoil';
import {HiOutlinePlus} from 'react-icons/hi';
import {isOpenNewTeamMemberModalAtom} from '^v3/V3OrgTeam/modals/NewTeamMemberModal/atom';
import {useModal} from '^v3/share/modals/useModal';

export const AddMemberItem = memo(function AddMemberItem() {
    // const setModalShow = useSetRecoilState(teamMemberCreateModal.isShowAtom);
    const {open} = useModal({isShowAtom: isOpenNewTeamMemberModalAtom});

    return (
        <div
            onClick={() => open()}
            className="card card-compact bg-neutral-content/10 shadow p-4 flex items-center justify-center min-w-[300px] cursor-pointer transition-all hover:shadow-lg btn-animation text-gray-400 hover:text-gray-500"
        >
            <HiOutlinePlus size={40} />
        </div>
    );
});
