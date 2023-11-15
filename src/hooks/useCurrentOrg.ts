import {useEffect, useState} from 'react';
import {UserDto} from '^models/User/types';
import {OrganizationDto} from '^models/Organization/type';
import {useRecoilState} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {organizationApi} from '^models/Organization/api';

export function useCurrentOrg(id: number) {
    const [currentOrg, setCurrentOrg] = useRecoilState(currentOrgAtom);

    useEffect(() => {
        if (!id || isNaN(id)) return;
        if (currentOrg && currentOrg.id === id) return;
        organizationApi.show(id).then((res) => setCurrentOrg(res.data));
    }, [id, currentOrg]);

    return {currentOrg, setCurrentOrg};
}
