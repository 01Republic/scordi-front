import React, {memo, useEffect, useState} from 'react';
import Select from 'react-select';
import {getProducts} from '^api/product.api';
import {ProductDto} from '^types/product.type';
import {ProductOption} from '^components/pages/v3/share/modals/AccountListModal/form/SelectProduct/ProductOption.type';
import {CardAppItem} from './CardAppItem';
import {useRecoilState, useRecoilValue} from 'recoil';
import {selectedAppsAtom, subscriptionsAtom} from '../../atom';
import {FieldValues, UseFieldArrayReturn, UseFormReturn} from 'react-hook-form';

interface CardApplistProps {
    form: UseFormReturn<FieldValues, any>;
    fieldArray: UseFieldArrayReturn<FieldValues, 'productIds', 'id'>;
}

export const CardAppList = memo((props: CardApplistProps) => {
    const {form, fieldArray} = props;
    const [allAppList, setAllAppList] = useState<ProductDto[]>([]);
    const subscriptions = useRecoilValue(subscriptionsAtom);
    const [selectedApps, setSelectedApps] = useRecoilState(selectedAppsAtom);

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

    const selectApp = (e: ProductOption) => {
        const selectedAppId = e.value;

        const selectedApp = allAppList.find((app) => {
            return app.id === selectedAppId;
        });

        if (!selectedApp) return;

        setSelectedApps([selectedApp, ...selectedApps]);
        fieldArray.append({productId: e.value});
    };

    return (
        <div>
            <input type="hidden" {...form.register('productId')} />
            <Select
                options={allAppList.map((list) => {
                    return {
                        value: list.id,
                        label: list.nameEn,
                    };
                })}
                onChange={(e) => e && selectApp(e)}
                className="select-underline input-underline"
                placeholder="전체"
            />
            <span></span>
            <ul>
                {selectedApps.map((product, i) => (
                    <CardAppItem key={i} item={product} form={form} fieldArray={fieldArray} />
                ))}
            </ul>
        </div>
    );
});
