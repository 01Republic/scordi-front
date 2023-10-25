import {useMultiSelect} from '^hooks/useMultiSelect';
import {Option} from '^components/util/select/MultiSelect';
import {FindAllTeamMemberQueryDto, TeamMemberDto} from '^types/team-member.type';
import {teamMemberApi} from '^api/team-member.api';
import {useRecoilState} from 'recoil';
import {teamMemberSearchParams, teamMemberSearchResults} from '^atoms/teamMembers.atom';

export const useTeamMembers = (orgId: number) => {
    const [result, setResult] = useRecoilState(teamMemberSearchResults);
    const [query, setQuery] = useRecoilState(teamMemberSearchParams);

    const load = async () => {
        const data = await teamMemberApi.index(orgId).then((res) => res.data);
        setResult(data);
        return data;
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

interface TeamMemberMultiSelectParams {
    add: (tag: TeamMemberDto) => void;
    remove: (tag: TeamMemberDto) => void;
    reset: () => void;
}
export const useTeamMemberMultiSelect = (orgId: number, props: TeamMemberMultiSelectParams) => {
    const {load, search, createByName, result} = useTeamMembers(orgId);
    const {add, remove, reset} = props;

    const mapper = (member: TeamMemberDto): Option => ({label: member.name, value: member.id});
    const defaultLoader = () => load().then((res) => res.items);
    const loader = (name: string) => search({name}).then((res) => res.items);
    const filter = (option: Option, input: string) => option.label.toLowerCase().includes(input);

    const onCreate = async (option: Option) => {
        const newMember = await createByName(option.value);
        add(newMember);
    };

    const onSelect = (option: Option) => {
        const member = result.items.find((member) => member.id === option.value);
        if (!member) return;
        add(member);
    };

    const onRemove = (option: Option) => {
        const member = result.items.find((member) => member.id === option.value);
        if (!member) return;
        remove(member);
    };

    const onClear = () => reset();

    return useMultiSelect({
        mapper,
        defaultLoader,
        loader,
        filter,
        onChangeCallbacks: {onCreate, onSelect, onRemove, onClear},
    });
};
