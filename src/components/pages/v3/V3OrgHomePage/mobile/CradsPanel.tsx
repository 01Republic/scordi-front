import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {useCards} from '^hooks/useCards';
import {V3OrgCardShowPageRoute} from '^pages/v3/orgs/[orgId]/cards';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {CardItem} from './CardItem';
import {ContentEmpty} from './ContentEmpty';
import {AddButton} from './AddButton';

export const CardsPanel = memo(() => {
    const length = 0;
    const router = useRouter();
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const {result} = useCards();
    const {items} = result;

    console.log(items);

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <MobileSection.Heading title={`${length}개의 등록중인 카드`}>
                    <div className="text-sm text-gray-500">
                        <div className="cursor-pointer">{length ? '카드 추가' : '카드 없음'}</div>
                    </div>
                </MobileSection.Heading>
                {items.length ? (
                    <>
                        {items.map((item, i) => (
                            <CardItem key={i} card={item} />
                        ))}
                    </>
                ) : (
                    <ContentEmpty text="등록된 카드가 없어요" subtext="눌러서 카드 추가" />
                )}

                <AddButton title="더 보기" onClick={() => router.push(V3OrgCardShowPageRoute.path(orgId))} />
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
