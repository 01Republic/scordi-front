import {FindAllTeamMemberQueryDto} from '^models/TeamMember/type';
import {teamMemberApi} from '^models/TeamMember/api';
import {useRecoilState} from 'recoil';
import {teamMemberSearchParams, teamMemberSearchResults} from '^atoms/teamMembers.atom';

export const useTeamMembers = (orgId: number) => {
    const [result, setResult] = useRecoilState(teamMemberSearchResults);
    const [query, setQuery] = useRecoilState(teamMemberSearchParams);

    const load = async () => {
        return teamMemberApi.index(orgId).then((res) => res.data.items);
    };

    const search = async (params: FindAllTeamMemberQueryDto) => {
        if (JSON.stringify(query) === JSON.stringify(params)) return result;

        const data = await teamMemberApi
            .index(orgId, {
                ...params,
                itemsPerPage: 500,
            })
            .then((res) => res.data);

        setResult(data);
        setQuery(params);

        return data;
    };

    const createByName = (name: string) =>
        teamMemberApi.create(orgId, {name}).then((res) => {
            return res.data;
        });

    return {load, search, createByName, result, query};
};
