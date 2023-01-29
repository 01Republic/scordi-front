import {useRecoilValue} from 'recoil';
import {getOrgQuery} from '^atoms/organizations.atom';

export const useOrganization = () => useRecoilValue(getOrgQuery);
