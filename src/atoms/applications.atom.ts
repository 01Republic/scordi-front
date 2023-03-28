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

export const getCurrentApplicationQueryTrigger = atom({
    key: 'getCurrentApplicationQueryTrigger',
    default: 0,
});

export const getCurrentApplicationQuery = selector({
    key: 'getCurrentApplicationQuery',
    get: async ({get}) => {
        get(getCurrentApplicationQueryTrigger);
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
        set(getCurrentApplicationQueryTrigger, (v) => v + 1);
    },
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

export const fetchApplicationQueryById = selectorFamily({
    key: 'fetchApplicationQueryById',
    get: (id: number) => async () => {
        try {
            const res = await getApplication(id);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
});
