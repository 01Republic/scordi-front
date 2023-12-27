import React, {memo, useEffect, useState} from 'react';
import Select from 'react-select';
import {ProductOption} from '^components/pages/v3/share/modals/AccountListModal/form/SelectProduct/ProductOption.type';
import {CardAppItem} from './CardAppItem';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useToast} from '^hooks/useToast';
import {useMoveScroll} from '^hooks/useMoveScroll';
import {allProductsSelector, productIdsAtom, selectedAppsAtom, subscriptionsAtom, sortedProductsAtom} from './atom';
import {ProductManager} from '^models/Product/manager';
import {SubscriptionManager} from '^models/Subscription/manager';
import {productApi} from '^models/Product/api';

export const CardAppList = memo(() => {
    const [isLoaded, setIsLoaded] = useState(false);
    const subscriptions = useRecoilValue(subscriptionsAtom);
    const [allProducts, setAllProducts] = useRecoilState(sortedProductsAtom);
    const [productIds, setProductIds] = useRecoilState(productIdsAtom);
    const [selectedApps, setSelectedApps] = useRecoilState(selectedAppsAtom);
    const {selectRef, onScroll} = useMoveScroll();
    const {toast} = useToast();
    // const allProducts = useRecoilValue(allProductsSelector);

    useEffect(() => {
        if (isLoaded) return;
        productApi.sortBySubscription().then((products) => {
            console.log(products);
            setAllProducts(products);
        });
        setIsLoaded(true);
    }, [isLoaded]);

    const selectApp = (option: ProductOption) => {
        const selectedAppId = option.value;

        const selectedApp = allProducts.find((app) => {
            return app.id === selectedAppId;
        });

        if (productIds.includes(option.value)) {
            toast.error('이미 선택된 앱입니다.');
            return;
        }

        if (!selectedApp) return;

        setSelectedApps([...selectedApps, selectedApp]);
        setProductIds([...productIds, option.value]);
    };

    return (
        <div ref={selectRef} onClick={onScroll}>
            <Select
                options={allProducts.map((list) => {
                    return {
                        value: list.id,
                        label: list.nameEn,
                    };
                })}
                onChange={(option) => option && selectApp(option)}
                className="select-underline input-underline"
                placeholder="전체"
            />
            <span></span>
            <ul className="max-h-96 sm:max-h-60 overflow-y-auto">
                {selectedApps.map((product, index) => (
                    <CardAppItem key={index} item={product} />
                ))}
            </ul>
        </div>
    );
});
