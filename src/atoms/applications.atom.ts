import {atom, selector} from 'recoil';
import {ApplicationDto, FindAllAppsQuery} from '^types/application.type';
import {applicationIdParamState} from '^atoms/common';
import {getApplication, getApplications} from '^api/application.api';
import {errorNotify} from '^utils/toast-notify';

// export const applicationsAtom = atom({
//     key: 'applications',
//     default: [] as ApplicationDto[],
// });
//
// export const applicationAtom = atom({
//     key: 'application',
//     default: null as ApplicationDto | null,
// });

export const getApplicationsParamsState = atom<FindAllAppsQuery>({
    key: 'getApplicationsParamsState',
    default: {},
});

export const getApplicationsQuery = selector({
    key: 'getApplicationsQuery',
    get: async ({get}) => {
        const params = get(getApplicationsParamsState);
        if (!params.where?.organizationId) return;

        try {
            const res = await getApplications(params);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
});

export const getApplicationQuery = selector({
    key: 'getApplicationQuery',
    get: async ({get}) => {
        const id = get(applicationIdParamState);
        if (isNaN(id)) return;
        try {
            const res = await getApplication(id);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
    set: ({get, set}) => {},
});
