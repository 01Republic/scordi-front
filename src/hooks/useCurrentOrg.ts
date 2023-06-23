import {useEffect, useState} from 'react';
import {UserDto} from '^types/user.type';
import {getUserSession} from '^api/session.api';
import {getOrganization} from '^api/organization.api';
import {OrganizationDto} from '^types/organization.type';
import {useRecoilState} from 'recoil';
import {currentOrgAtom} from '^atoms/organizations.atom';

export function useCurrentOrg(id: number) {
    const [currentOrg, setCurrentOrg] = useRecoilState(currentOrgAtom);

    useEffect(() => {
        if (!id || isNaN(id)) return;
        if (currentOrg && currentOrg.id === id) return;
        getOrganization(id).then((res) => setCurrentOrg(res.data));
    }, [id, currentOrg]);

    return {currentOrg, setCurrentOrg};
}
