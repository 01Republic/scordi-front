import {useModal} from '^v3/share/modals/useModal';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {TeamMemberDto} from '^models/TeamMember/type';
import {currentTeamMemberState} from '^models/TeamMember/atom';
import {isTeamMemberEditModeAtom, teamMemberShowModal} from './atom';
import {navTabIndex} from './TeamMemberShowBody/tabs/TabView';
import {useTeamMembers} from '^models/TeamMember';

/**
 * 팀 멤버 상세 모달이 모달로서 동작하기위한 메소드를 모두 구현하고 책임집니다.
 * 동시에 각 동작별로 일관되게 챙겨야 하는 상태들의 처리 등 비즈니스로직을 이 곳에서 모아 정의하고 관리합니다.
 */
export const useTeamMemberShowModal = () => {
    const {open, close, ...modal} = useModal(teamMemberShowModal);
    const setEditMode = useSetRecoilState(isTeamMemberEditModeAtom);
    const setTabIndex = useSetRecoilState(navTabIndex);
    const [subjectTeamMember, setSubjectTeamMember] = useRecoilState(currentTeamMemberState);
    const TeamMembers = useTeamMembers();

    const show = (teamMember: TeamMemberDto) => {
        open();
        setSubjectTeamMember(teamMember);
    };

    const hide = () => {
        close();
        setEditMode(false); // reset edit mode
        setTabIndex(0); // reset tab active index

        // 멤버 리스트 갱신
        TeamMembers.reload().then(() => {
            // setSubjectTeamMember(null); // reset subject
        }); // Follow-up executed transactions inside of Modal
    };

    return {show, hide, ...modal, close, subject: subjectTeamMember};
};
