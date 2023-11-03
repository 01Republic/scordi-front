import React, {memo, useEffect, useState} from 'react';
import Select from 'react-select';
import {getProducts} from '^api/product.api';
import {ProductDto} from '^types/product.type';
import {ProductOption} from '^components/pages/v3/share/modals/AccountListModal/form/SelectProduct/ProductOption.type';
import {CardAppItem} from './CardAppItem';
import {useRecoilState, useRecoilValue} from 'recoil';
import {productIdsAtom, selectedAppsAtom, subscriptionsAtom} from '../../atom';
import {useToast} from '^hooks/useToast';
import {useMoveScroll} from '^hooks/useMoveScroll';

export const CardAppList = memo(() => {
    const [productIds, setProductIds] = useRecoilState(productIdsAtom);
    const [allAppList, setAllAppList] = useState<ProductDto[]>([]);
    const subscriptions = useRecoilValue(subscriptionsAtom);
    const [selectedApps, setSelectedApps] = useRecoilState(selectedAppsAtom);
    const {selectRef, onScroll} = useMoveScroll();
    const {toast} = useToast();

    const subscriptionProducts = subscriptions.map((subscription) => {
        return subscription.product;
    });

    // SaaS 전체 리스트 받아오기
    useEffect(() => {
        getProducts().then((res) => {
            const AllProducts = res.data.items;

            // 구독하지 않은 SaaS 리스트
            const unsubscribedProducts = AllProducts.filter((list) => {
                return !subscriptionProducts.some((product) => product.id === list.id);
            });

            // 구독한 Saas 리스트 우선 보여주기
            setAllAppList(subscriptionProducts.concat(unsubscribedProducts));
        });
    }, []);

    const selectApp = (option: ProductOption) => {
        const selectedAppId = option.value;

        const selectedApp = allAppList.find((app) => {
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
                options={allAppList.map((list) => {
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
