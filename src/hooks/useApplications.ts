import {useRecoilValue} from 'recoil';
import {getApplicationQuery, getApplicationsQuery} from '^atoms/applications.atom';

export const useApplications = () => useRecoilValue(getApplicationsQuery);
export const useApplication = () => useRecoilValue(getApplicationQuery);
