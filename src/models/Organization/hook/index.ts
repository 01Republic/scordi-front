import {useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {currentOrgAtom, getOrgQuery} from '^models/Organization/atom';
import {organizationApi} from '^models/Organization/api';

export const useOrganization = () => useRecoilValue(getOrgQuery);

// side effect 발생으로 페이지 컴포넌트에서만 사용하기
export function useCurrentOrg(id: number) {
    const [currentOrg, setCurrentOrg] = useRecoilState(currentOrgAtom);

    useEffect(() => {
        if (!id || isNaN(id)) return;
        if (currentOrg && currentOrg.id === id) return;
        organizationApi
            .show(id, {
                relations: ['lastGoogleSyncHistory', 'lastGoogleSyncHistory.googleTokenData'],
            })
            .then((res) => setCurrentOrg(res.data));
    }, [id, currentOrg]);

    return {currentOrg, setCurrentOrg};
}
