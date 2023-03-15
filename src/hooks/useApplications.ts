import {errorNotify} from '^utils/toast-notify';
import {useRouter} from 'next/router';
import {ApplicationDto} from './../types/application.type';
import {useState, useEffect} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {
    getApplicationQuery,
    getApplicationsQuery,
    getApplicationsQueryWithParams,
    getCurrentApplicationQuery,
} from '^atoms/applications.atom';
import {FindAllAppsQuery} from '^types/application.type';
import {getApplication} from '^api/application.api';

export const useCurrentApplication = () => {
    const [currentApplication, reload] = useRecoilState(getCurrentApplicationQuery);
    return {currentApplication, reload};
};

export const useApplications = () => useRecoilValue(getApplicationsQuery);
export const useApplicationsWithParams = (params: FindAllAppsQuery) =>
    useRecoilValue(getApplicationsQueryWithParams(params));
export const useApplication = () => useRecoilValue(getApplicationQuery);
// export const useApplication = () => {
//     const router = useRouter();
//     const appId = router.query.appId;
//     const [application, setApplication] = useState<ApplicationDto | null>(null);
//
//     useEffect(() => {
//         if (!appId || isNaN(appId)) return;
//
//         getApplication(appId)
//             .then((res) => {
//                 setApplication(res.data);
//             })
//             .catch(errorNotify);
//     }, [appId]);
//
//     return application;
// };
