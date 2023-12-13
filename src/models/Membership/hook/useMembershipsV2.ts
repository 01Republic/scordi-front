import {useState} from 'react';
import {FindAllMembershipQuery, MembershipDto} from '^models/Membership/types';
import {Paginated} from '^types/utils/paginated.dto';
import {membershipApi} from '^models/Membership/api';
import {cachePagedQuery} from '^hooks/usePagedResource';
import {atom, useRecoilState} from 'recoil';

export const MembershipSearchResultAtom = atom<Paginated<MembershipDto>>({
    key: 'MembershipSearchResultAtom',
    default: {
        items: [],
        pagination: {
            totalItemCount: 0,
            currentItemCount: 0,
            totalPage: 1,
            currentPage: 1,
            itemsPerPage: 30,
        },
    },
});

// v3 > share > LeftNavBar > Header 컴포넌트 전용 api 요청 hook
// 다른데서 사용하지 않기

export const useMembershipsV2 = () => {
    const [result, setResult] = useRecoilState(MembershipSearchResultAtom);
    const [query, setQuery] = useState<FindAllMembershipQuery>({});

    const search = (params: FindAllMembershipQuery, mergeMode = false, force = false) => {
        const request = () => membershipApi.index(params);

        cachePagedQuery(setResult, setQuery, params, request, mergeMode, force);
    };

    return {search, result, query};
};
