import {PagedResourceAtoms} from '^hooks/usePagedResource';
import {subscriptionApi} from '^models/Subscription/api';
import {usePagedResource2} from '^hooks/usePagedResource/usePagedResource2';
import {FindAllSubscriptionSeatQueryDto, SubscriptionSeatDto} from '^models/SubscriptionSeat/type';

export const useSubscriptionSeats = (
    atoms: PagedResourceAtoms<SubscriptionSeatDto, FindAllSubscriptionSeatQueryDto>,
    mergeMode = false,
) => {
    return usePagedResource2(atoms, {
        useOrgId: true,
        endpoint: (params, orgId, subscriptionId) =>
            subscriptionApi.seatsApi.index(orgId, subscriptionId, {
                ...params,
                relations: ['teamMember', 'teamMember.teams'],
            }),
        buildQuery: (params, orgId, subscriptionId) => {
            params.where = {...params.where};
            return params;
        },
        getId: 'id',
        mergeMode,
    });
};
