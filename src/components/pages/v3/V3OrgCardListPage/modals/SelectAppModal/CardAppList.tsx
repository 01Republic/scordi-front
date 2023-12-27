import React, {memo, useEffect, useState} from 'react';
import Select from 'react-select';
import {ProductOption} from '^components/pages/v3/share/modals/AccountListModal/form/SelectProduct/ProductOption.type';
import {CardAppItem} from './CardAppItem';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useToast} from '^hooks/useToast';
import {useMoveScroll} from '^hooks/useMoveScroll';
import {productIdsAtom, selectedAppsAtom, sortedProductsAtom, selectAppModal} from './atom';
import {productApi} from '^models/Product/api';
import {orgIdParamState} from '^atoms/common';

export const CardAppList = memo(() => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [allProducts, setAllProducts] = useRecoilState(sortedProductsAtom);
    const [productIds, setProductIds] = useRecoilState(productIdsAtom);
    const [selectedApps, setSelectedApps] = useRecoilState(selectedAppsAtom);
    const {selectRef, onScroll} = useMoveScroll();
    const {toast} = useToast();
    const orgId = useRecoilValue(orgIdParamState);
    const isSelectAppModalShow = useRecoilValue(selectAppModal.isShowAtom);

    useEffect(() => {
        // api 요청이 모달 열렸을 때만 동작하도록
        if (!isSelectAppModalShow) return;

        if (isLoaded) return;
        productApi.sortBySubscription(orgId).then((res) => setAllProducts(res.data.items));
        setIsLoaded(true);
    }, [isSelectAppModalShow, isLoaded]);

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
                options={
                    allProducts?.map((list) => {
                        return {
                            value: list.id,
                            label: list.nameEn,
                        };
                    }) ?? []
                }
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
