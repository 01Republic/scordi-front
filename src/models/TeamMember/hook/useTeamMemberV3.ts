import {RecoilState, useRecoilState, useRecoilValue} from 'recoil';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllTeamMemberQueryDto, teamMemberApi, TeamMemberDto} from '^models/TeamMember';
import {orgIdParamState} from '^atoms/common';

export const useTeamMembersV3 = (
    resultAtom: RecoilState<Paginated<TeamMemberDto>>,
    queryAtom: RecoilState<FindAllTeamMemberQueryDto>,
    mergeMode = false,
) => {
    const defaultMergeMode = mergeMode;
    const orgId = useRecoilValue(orgIdParamState);
    const [result, setResult] = useRecoilState(resultAtom);
    const [query, setQuery] = useRecoilState(queryAtom);

    async function search(params: FindAllTeamMemberQueryDto, mergeMode = defaultMergeMode) {
        if (!orgId) return;

        params.where = {organizationId: orgId, ...params.where};

        setQuery((oldQuery) => {
            if (JSON.stringify(oldQuery) === JSON.stringify(params)) return oldQuery;

            teamMemberApi
                .index(orgId, params)
                .then((res) => res.data)
                .then((data) => {
                    if (mergeMode) {
                        setResult((oldResult) => {
                            const items = [...oldResult.items, ...data.items];
                            const pagination = data.pagination;
                            pagination.currentItemCount = items.length;
                            return {items, pagination};
                        });
                    } else {
                        setResult(data);
                    }
                });

            return params;
        });
    }

    const movePage = (page: number, append = false) => search({...query, page}, append);
    const resetPage = () => search({...query, page: 1}, false);

    const append = (subs: TeamMemberDto[]) => {
        setResult((oldResult) => {
            const items = [...subs, ...oldResult.items];
            const pagination = {...oldResult.pagination};
            const diff = subs.length;
            pagination.currentItemCount += diff;
            pagination.totalItemCount += diff;
            return {items, pagination};
        });
    };

    const except = (item: TeamMemberDto) => {
        setResult((oldResult) => {
            const items = oldResult.items.filter((it) => it.id !== item.id);
            const pagination = {...oldResult.pagination};
            const diff = oldResult.pagination.currentItemCount - items.length;
            pagination.currentItemCount -= diff;
            pagination.totalItemCount -= diff;
            return {items, pagination};
        });
    };

    return {query, result, search, movePage, resetPage, except};
};
