import {teamMemberApi} from '^models/TeamMember/api';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {atom, selector} from 'recoil';

export const inputCardHoldingMemberModal = {
    isShowAtom: atom({
        key: 'v3/inputCardHoldingMemberModal',
        default: false,
    }),
    popStateSyncKey: 'inputCardHoldingMemberModal',
};

export const allTeamMemberSelector = selector({
    key: 'allTeamMemberSelector',
    get: async () => {
        const orgId = useRouterIdParamState('orgId', orgIdParamState);

        const res = await teamMemberApi.index(orgId).then((res) => res.data.items);

        return res;
    },
});
