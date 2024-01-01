import React, {memo, useEffect, useState} from 'react';
import Select from 'react-select';
import {ProductOption} from '^components/pages/v3/share/modals/AccountListModal/form/SelectProduct/ProductOption.type';
import {CardAppItem} from './CardAppItem';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useMoveScroll} from '^hooks/useMoveScroll';
import {productIdsAtom, selectedAppsAtom, sortedProductsAtom, selectAppModal} from './atom';
import {SelectProduct} from '^v3/share/modals/NewSubscriptionModalManually/FormForGeneralInfoModal/SelectProduct';
import {ProductDto} from '^models/Product/type';

export const CardAppList = memo(() => {
    const [selectedApps, setSelectedApps] = useRecoilState(selectedAppsAtom);
    const {selectRef, onScroll} = useMoveScroll();
    const isSelectAppModalShow = useRecoilValue(selectAppModal.isShowAtom);

    const selectApp = (selectedProduct: ProductDto) => {
        if (!selectedProduct) return;
        setSelectedApps([...selectedApps, selectedProduct]);
    };

    return (
        <div ref={selectRef} onClick={onScroll}>
            {isSelectAppModalShow && <SelectProduct onChange={(product) => selectApp(product)} labelHidden />}
            {/*<Select*/}
            {/*    options={*/}
            {/*        allProducts?.map((list) => {*/}
            {/*            return {*/}
            {/*                value: list.id,*/}
            {/*                label: list.nameEn,*/}
            {/*            };*/}
            {/*        }) ?? []*/}
            {/*    }*/}
            {/*    onChange={(option) => option && selectApp(option)}*/}
            {/*    className="select-underline input-underline"*/}
            {/*    placeholder="전체"*/}
            {/*/>*/}

            <ul className="max-h-96 sm:max-h-60 overflow-y-auto">
                {selectedApps.map((product, index) => (
                    <CardAppItem key={index} item={product} />
                ))}
            </ul>
        </div>
    );
});
