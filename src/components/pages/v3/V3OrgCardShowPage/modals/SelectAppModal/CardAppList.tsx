import React, {Dispatch, memo, useEffect, useState} from 'react';
import Select from 'react-select';
import {getProducts} from '^api/product.api';
import {cardIdParamState, useRouterIdParamState} from '^atoms/common';
import {ProductDto} from '^types/product.type';
import {ProductOption} from '^components/pages/v3/share/modals/AccountListModal/form/SelectProduct/ProductOption.type';
import {CardAppItem} from './CardAppItem';
import {creditcardAtom} from '../atom';
import {useRecoilState} from 'recoil';
import {selectedAppsAtom} from '../../atom';

export const CardAppList = memo(() => {
    const [selectedApps, setSelectedApps] = useRecoilState(selectedAppsAtom);

    const cardId = useRouterIdParamState('orgId', cardIdParamState);
    const [cardDetailInfo, setCardDetailInfo] = useRecoilState(creditcardAtom);

    const [allAppList, setAllAppList] = useState<ProductDto[]>([]);

    // select options 받아오기
    useEffect(() => {
        if (!cardId) return;
        getProducts().then((res) => setAllAppList(res.data.items));
    }, []);

    // TODO: 카드 등록 후 에러 -> 수정 예정
    // useEffect(() => {
    //     if (!cardDetailInfo.productIds) return;

    //     const cardProductId = allAppList.filter((app) => {
    //         return cardDetailInfo.productIds?.includes(app.id);
    //     });

    //     setSelectedApps(cardProductId);
    // }, [cardId]);

    const selectApp = (e: ProductOption) => {
        const selectedAppId = e.value;

        const selectedApp = allAppList.find((app) => {
            return app.id === selectedAppId;
        });

        if (!selectedApp) return;
        setSelectedApps([...selectedApps, selectedApp]);
    };

    return (
        <div>
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
                {selectedApps.map((app, i) => (
                    <CardAppItem key={i} app={app} setSelectedApps={setSelectedApps} />
                ))}
            </ul>
        </div>
    );
});
