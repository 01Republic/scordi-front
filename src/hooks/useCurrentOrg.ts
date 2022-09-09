import { useEffect, useState } from 'react';
import { UserDto } from '^types/userTypes';
import { getUserSession } from '^api/sessionApi';
import { getOrganization } from '^api/organizationApi';
import { OrganizationDto } from '^types/organizationTypes';

export function useCurrentOrg(id: number) {
  const [currentOrg, setCurrentOrg] = useState<OrganizationDto | null>(null);

  useEffect(() => {
    if (id) {
      getOrganization(id).then(res => setCurrentOrg(res.data));
    }
  }, [id]);

  return { currentOrg, setCurrentOrg };
}
