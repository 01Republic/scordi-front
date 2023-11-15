import {useRecoilValue} from 'recoil';
import {getOrgQuery} from '^models/Organization/atom';

export const useOrganization = () => useRecoilValue(getOrgQuery);
