import {atom, selector} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {errorNotify} from '^utils/toast-notify';
import {OrganizationDto} from '^types/organization.type';
import {organizationApi} from '^api/organization.api';

export const currentOrgAtom = atom<OrganizationDto | null>({
    key: 'currentOrgAtom',
    default: null,
});

/**
 * [Show]
 */
export const getOrgQueryTrigger = atom({
    key: 'getOrganizationQueryTrigger',
    default: 0,
});

export const getOrgQuery = selector({
    key: 'getOrganizationQuery',
    get: async ({get}) => {
        get(getOrgQueryTrigger);
        const id = get(orgIdParamState);
        if (isNaN(id)) return;
        try {
            const res = await organizationApi.show(id);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
    set: ({set}) => {
        set(getOrgQueryTrigger, (v) => v + 1);
    },
});
