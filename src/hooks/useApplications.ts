import {ApplicationDto} from '^types/application.type';
import {useRecoilState, useRecoilValue} from 'recoil';
import {getApplicationQuery, getApplicationsQuery, getCurrentApplicationQuery} from '^atoms/applications.atom';
import {getApplications} from '^api/application.api';
import {makePaginatedListHookWithAtoms} from '^hooks/util/makePaginatedListHook';

export const useCurrentApplication = () => {
    const [currentApplication, reload] = useRecoilState(getCurrentApplicationQuery);
    return {currentApplication, reload: () => reload((v) => v)};
};

export const useApplications = () => useRecoilValue(getApplicationsQuery);
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

export const {paginatedListHook: useApplicationList} = makePaginatedListHookWithAtoms<number, ApplicationDto>({
    subject: 'PaginatedApplicationList',
    buildParams: (organizationId, page, pagination) => ({
        where: {organizationId},
        order: {id: 'DESC'},
        page,
        itemsPerPage: 300,
    }),
    request: (_, params) => getApplications(params),
});
