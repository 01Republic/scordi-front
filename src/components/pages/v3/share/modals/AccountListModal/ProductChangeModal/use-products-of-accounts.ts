import {useEffect, useState} from 'react';
import {ProductManager} from '^models/Product/manager';
import {AccountManager} from '^models/Account/manager';
import {accountApi} from '^models/Account/api';
import {SubscriptionManager} from '^models/Subscription/manager';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {subscriptionApi} from '^models/Subscription/api';
import {subjectProductOfAccountsInModalState} from '^v3/share/modals/AccountListModal/atom';

export const useProductsOfAccounts = (isShow: boolean) => {
    const orgId = useRecoilValue(orgIdParamState);
    const product = useRecoilValue(subjectProductOfAccountsInModalState);
    const [Product, setProductManager] = useState<ProductManager>();
    const [Account, setAccountManager] = useState<AccountManager>();

    const loadAccounts = (productId: number) => {
        if (!orgId || isNaN(orgId)) return;
        accountApi
            .index(orgId, {
                relations: ['product'],
                where: {productId},
                itemsPerPage: 0,
                order: {id: 'DESC'},
            })
            .then((res) => {
                setAccountManager(AccountManager.init(res.data.items));
            });
    };

    const loadSubscriptions = () => {
        if (!orgId || isNaN(orgId)) return;
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
    };

    return {Product, Account, loadAccounts, loadSubscriptions};
};
