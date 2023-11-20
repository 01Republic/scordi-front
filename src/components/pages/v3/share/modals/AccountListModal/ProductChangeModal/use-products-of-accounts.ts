import {useEffect, useState} from 'react';
import {ProductManager} from '^models/Product/manager';
import {AccountManager} from '^models/Account/manager';
import {accountApi} from '^models/Account/api';
import {SubscriptionManager} from '^models/Subscription/manager';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {subscriptionApi} from '^models/Subscription/api';
import {getAccountsQuery} from '^models/Account/atom';
import {getProjectQuery, getSubscriptionsParamsState, getSubscriptionsQuery} from '^models/Subscription/atom';

export const useProductsOfAccounts = (isShow: boolean) => {
    const orgId = useRecoilValue(orgIdParamState);
    const [Product, setProductManager] = useState<ProductManager>();
    const [Account, setAccountManager] = useState<AccountManager>();

    const allAccount = useRecoilValue(getAccountsQuery);
    const allProduct = useRecoilValue(getProjectQuery);

    // Load page
    useEffect(() => {
        if (!isShow) return;
        if (!orgId || isNaN(orgId)) return;

        setAccountManager(AccountManager.init(allAccount?.items));

        const products = SubscriptionManager.init(allProduct?.items).products();
        setProductManager(products.sortBy({id: 'ASC'}));
    }, [isShow, orgId]);

    return {Product, Account};
};
