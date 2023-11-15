import {useEffect, useState} from 'react';
import {ProductManager} from '^models/Product/manager';
import {AccountManager} from '^models/Account/manager';
import {accountApi} from '^models/Account/api';
import {SubscriptionManager} from '^models/Subscription/manager';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {subscriptionApi} from '^models/Subscription/api';

export const useProductsOfAccounts = (isShow: boolean) => {
    const orgId = useRecoilValue(orgIdParamState);
    const [Product, setProductManager] = useState<ProductManager>();
    const [Account, setAccountManager] = useState<AccountManager>();

    // Load page
    useEffect(() => {
        if (!isShow) return;
        if (!orgId || isNaN(orgId)) return;

        accountApi.index(orgId, {itemsPerPage: 0}).then((res) => {
            setAccountManager(AccountManager.init(res.data.items));
        });

        subscriptionApi
            .index({
                where: {organizationId: orgId},
                order: {productId: 'ASC'},
                itemsPerPage: 0,
            })
            .then((res) => {
                const products = SubscriptionManager.init(res.data.items).products();
                setProductManager(products.sortBy({id: 'ASC'}));
            });
    }, [isShow, orgId]);

    return {Product, Account};
};
