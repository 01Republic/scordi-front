import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {teamMemberApi, TeamMemberDto} from '^models/TeamMember';

export const teamMemberSubjectAtom = atom<TeamMemberDto | null>({
    key: 'OrgTeamMemberShowPage/teamMemberSubjectAtom',
    default: null,
});

export const useCurrentTeamMember = () => {
    const [currentTeamMember, setCurrentTeamMember] = useRecoilState(teamMemberSubjectAtom);

    const findTeamMember = async (orgId: number, id: number) => {
        return teamMemberApi.show(orgId, id).then((res) => {
            setCurrentTeamMember(res.data);
            return res.data;
        });
    };

    const reload = async () => {
        if (!currentTeamMember) return;
        return findTeamMember(currentTeamMember.organizationId, currentTeamMember.id);
    };

    const clear = () => setCurrentTeamMember(null);

    return {currentTeamMember, setCurrentTeamMember, findTeamMember, reload, clear};
};
