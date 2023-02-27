import {atom, selector} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {getOrganization} from '^api/organization.api';
import {errorNotify} from '^utils/toast-notify';
import {OrganizationDto} from '^types/organization.type';

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
            const res = await getOrganization(id);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
    set: ({set}) => {
        set(getOrgQueryTrigger, (v) => v + 1);
    },
});
