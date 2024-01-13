import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {CreditCardManager} from '^models/CreditCard/manager';
import {creditCardApi} from '^models/CreditCard/api';
import {orgIdParamState} from '^atoms/common';
import {creditCardListResultAtom} from '^models/CreditCard/atom';
import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {CreditCardDto, FindAllCreditCardDto} from '^models/CreditCard/type';

export const useCreditCardsOfOrganization = (isShow: boolean) => {
    const orgId = useRecoilValue(orgIdParamState);
    const [CreditCard, setCreditCardManager] = useState<CreditCardManager>();

    useEffect(() => {
        if (!isShow) return;
        if (!orgId || isNaN(orgId)) return;

        const req = creditCardApi.index(orgId, {
            itemsPerPage: 0,
            relations: ['holdingMember', 'subscriptions'],
        });
        req.then((res) => {
            setCreditCardManager(CreditCardManager.init(res.data.items));
        });
    }, [isShow, orgId]);

    return {CreditCard};
};

export const useCreditCards = () => useCreditCardsV3(creditCardListResultAtom);

const useCreditCardsV3 = (atoms: PagedResourceAtoms<CreditCardDto, FindAllCreditCardDto>, mergeMode = false) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => creditCardApi.index(orgId, params),
        buildQuery: (params) => ({
            itemsPerPage: 0,
            relations: ['holdingMember', 'subscriptions'],
            ...params,
        }),
        getId: 'id',
        mergeMode,
    });
};
