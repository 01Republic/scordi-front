import {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {CreditCardManager} from '^models/CreditCard/manager';
import {creditCardApi} from '^models/CreditCard/api';
import {orgIdParamState} from '^atoms/common';
import {creditCardsSearchResultAtom, getCreditCardsQueryAtom} from '^models/CreditCard/atom';
import {cachePagedQuery} from '^hooks/usePagedResource';
import {FindAllCreditCardDto} from '^models/CreditCard/type';

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

export const useCreditCards = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const [result, setResult] = useRecoilState(creditCardsSearchResultAtom);
    const [query, setQuery] = useRecoilState(getCreditCardsQueryAtom);

    async function search(params: FindAllCreditCardDto, mergeMode = false, force = false) {
        if (!orgId || isNaN(orgId)) return;

        const request = () => {
            return creditCardApi.index(orgId, {
                itemsPerPage: 0,
                relations: ['holdingMember', 'subscriptions'],
            });
        };

        return cachePagedQuery(setResult, setQuery, params, request, mergeMode, force);
    }
    const reload = () => search({...query}, false, true);

    return {search, reload, result};
};
