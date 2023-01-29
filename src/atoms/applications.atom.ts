import {atom, selector, selectorFamily} from 'recoil';
import {ApplicationDto, FindAllAppsQuery} from '^types/application.type';
import {applicationIdParamState} from '^atoms/common';
import {getApplication, getApplications} from '^api/application.api';
import {errorNotify} from '^utils/toast-notify';
import {Paginated} from '^types/utils/paginated.dto';

export const applicationsState = atom({
    key: 'applicationsState',
    default: [] as ApplicationDto[],
});

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

// @ts-ignore
export const getApplicationsQueryWithParams = selectorFamily<Paginated<ApplicationDto>, FindAllAppsQuery>({
    key: 'getApplicationsQueryWithParams',
    get:
        (params: FindAllAppsQuery) =>
        async ({get}) => {
            params ||= get(getApplicationsParamsState);
            if (!params.where?.organizationId) return;

            try {
                const res = await getApplications(params);
                return res.data;
            } catch (e) {
                errorNotify(e);
            }
        },
    set: () => {},
});

export const getApplicationQueryTrigger = atom({
    key: 'getApplicationQueryTrigger',
    default: 0,
});

export const getApplicationQuery = selector({
    key: 'getApplicationQuery',
    get: async ({get}) => {
        get(getApplicationQueryTrigger);
        const id = get(applicationIdParamState);
        if (isNaN(id)) return;
        try {
            const res = await getApplication(id);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
    set: ({get, set}) => {
        set(getApplicationQueryTrigger, (v) => v + 1);
    },
});
