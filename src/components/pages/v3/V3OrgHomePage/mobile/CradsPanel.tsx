import React, {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {V3OrgCardShowPageRoute} from '^pages/v3/orgs/[orgId]/cards';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {AddButton} from './AddButton';
import {creditCardApi} from '^api/credit-crads.api';
import {CardItem} from './CardItem';
import {useRecoilState} from 'recoil';
import {creditCardListAtom} from '../../V3OrgCardShowPage/atom';

export const CardsPanel = memo(() => {
    const router = useRouter();
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const [creditCardList, setCreditCardList] = useRecoilState(creditCardListAtom);
    const length = creditCardList.length;

    useEffect(() => {
        creditCardApi.index(orgId).then((res) => setCreditCardList(res.data.items));
    }, []);

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <MobileSection.Heading title={`${length}개의 등록중인 카드`}>
                    <div className="text-sm text-gray-500">
                        <div className="cursor-pointer">{length ? '카드 추가' : '카드 없음'}</div>
                    </div>
                </MobileSection.Heading>

                {creditCardList.map((card) => (
                    <CardItem card={card} setCreditCardList={setCreditCardList} />
                ))}

                <AddButton title="더 보기" onClick={() => router.push(V3OrgCardShowPageRoute.path(orgId))} />
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
