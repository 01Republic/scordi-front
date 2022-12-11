import {useEffect, useState} from 'react';
import {UserDto} from '^types/user.type';
import {getUserSession} from '^api/session.api';
import {getOrganization} from '^api/organization.api';
import {OrganizationDto} from '^types/organization.type';

export function useCurrentOrg(id: number) {
    const [currentOrg, setCurrentOrg] = useState<OrganizationDto | null>(null);

    useEffect(() => {
        if (id) {
            getOrganization(id).then((res) => setCurrentOrg(res.data));
        }
    }, [id]);

    return {currentOrg, setCurrentOrg};
}
