import {atom, selector} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {errorNotify} from '^utils/toast-notify';
import {OrganizationDto} from '^models/Organization/type';
import {organizationApi} from '^models/Organization/api';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

export const currentOrgAtom = atom<OrganizationDto | null>({
    key: 'currentOrgAtom',
    default: null,
});

export const getCurrentOrgQueryAtom = atom<FindAllQueryDto<OrganizationDto>>({
    key: 'getCurrentOrgQueryAtom',
    default: {},
});

export const currentOrgIsLoadingAtom = atom({
    key: 'currentOrgIsLoadingAtom',
    default: false,
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
