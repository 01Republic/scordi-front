import {useEffect, useState} from 'react';
import {UserDto} from '^models/User/types';
import {OrganizationDto} from '^types/organization.type';
import {useRecoilState} from 'recoil';
import {currentOrgAtom} from '^atoms/organizations.atom';
import {organizationApi} from '^api/organization.api';

export function useCurrentOrg(id: number) {
    const [currentOrg, setCurrentOrg] = useRecoilState(currentOrgAtom);

    useEffect(() => {
        if (!id || isNaN(id)) return;
        if (currentOrg && currentOrg.id === id) return;
        organizationApi.show(id).then((res) => setCurrentOrg(res.data));
    }, [id, currentOrg]);

    return {currentOrg, setCurrentOrg};
}
