import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {CreditCardManager} from '^models/CreditCard/manager';
import {creditCardApi} from '^models/CreditCard/api';
import {orgIdParamState} from '^atoms/common';

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
