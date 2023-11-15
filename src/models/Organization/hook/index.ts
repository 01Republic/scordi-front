import {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {currentOrgAtom, getOrgQuery} from '^models/Organization/atom';
import {organizationApi} from '^models/Organization/api';

export const useOrganization = () => useRecoilValue(getOrgQuery);

export function useCurrentOrg(id: number) {
    const [currentOrg, setCurrentOrg] = useRecoilState(currentOrgAtom);

    useEffect(() => {
        if (!id || isNaN(id)) return;
        if (currentOrg && currentOrg.id === id) return;
        organizationApi.show(id).then((res) => setCurrentOrg(res.data));
    }, [id, currentOrg]);

    return {currentOrg, setCurrentOrg};
}
