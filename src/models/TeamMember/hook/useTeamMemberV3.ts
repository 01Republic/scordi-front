import {RecoilState, useRecoilState, useRecoilValue} from 'recoil';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllTeamMemberQueryDto, teamMemberApi, TeamMemberDto} from '^models/TeamMember';
import {orgIdParamState} from '^atoms/common';
import {cachePagedQuery, makeAppendPagedItemFn, makeExceptPagedItemFn} from '^hooks/usePagedResource';

export const useTeamMembersV3 = (
    resultAtom: RecoilState<Paginated<TeamMemberDto>>,
    queryAtom: RecoilState<FindAllTeamMemberQueryDto>,
    mergeMode = false,
) => {
    const defaultMergeMode = mergeMode;
    const orgId = useRecoilValue(orgIdParamState);
    const [result, setResult] = useRecoilState(resultAtom);
    const [query, setQuery] = useRecoilState(queryAtom);

    async function search(params: FindAllTeamMemberQueryDto, mergeMode = defaultMergeMode, force = false) {
        if (!orgId || isNaN(orgId)) return;
        params.where = {organizationId: orgId, ...params.where};
        const request = () => teamMemberApi.index(orgId, params);
        cachePagedQuery(setResult, setQuery, params, request, mergeMode, force);
    }

    const reload = () => search({...query}, false, true);
    const movePage = (page: number, append = false) => search({...query, page}, append);
    const resetPage = () => search({...query, page: 1}, false, true);
    const append = makeAppendPagedItemFn(setResult);
    const except = makeExceptPagedItemFn(setResult, (it, item) => it.id !== item.id);

    return {query, result, search, reload, movePage, resetPage, except};
};
