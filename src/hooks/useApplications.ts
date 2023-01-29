import {useRecoilValue} from 'recoil';
import {getApplicationQuery, getApplicationsQuery, getApplicationsQueryWithParams} from '^atoms/applications.atom';
import {FindAllAppsQuery} from '^types/application.type';

export const useApplications = () => useRecoilValue(getApplicationsQuery);
export const useApplicationsWithParams = (params: FindAllAppsQuery) =>
    useRecoilValue(getApplicationsQueryWithParams(params));
export const useApplication = () => useRecoilValue(getApplicationQuery);
