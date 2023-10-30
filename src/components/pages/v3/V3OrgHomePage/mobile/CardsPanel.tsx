import React, {memo, useEffect} from 'react';
import {useRouter} from 'next/router';
import {V3OrgCardShowPageRoute} from '^pages/v3/orgs/[orgId]/cards';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {AddButton} from './AddButton';
import {creditCardApi} from '^api/credit-cards.api';
import {CardItem} from './CardItem';
import {useRecoilState} from 'recoil';
import {creditCardListAtom} from '^v3/V3OrgCardShowPage/atom';
import {useModal} from '^v3/share/modals/useModal';
import {ContentEmpty} from '^v3/V3OrgHomePage/mobile/ContentEmpty';
import {inputCardNumberModal} from '^v3/V3OrgCardShowPage/modals/atom';

export const CardsPanel = memo(() => {
    const router = useRouter();
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const [creditCardList, setCreditCardList] = useRecoilState(creditCardListAtom);
    const length = creditCardList.length;
    const {open: addCreditCardModalShow} = useModal(inputCardNumberModal);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        creditCardApi.index(orgId).then((res) => setCreditCardList(res.data.items));
    }, [orgId]);

    const onAddButtonClick = () => addCreditCardModalShow();

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <MobileSection.Heading title={`${length}개의 등록중인 카드`}>
                    <div className="text-sm text-gray-500">
                        <div className="cursor-pointer" onClick={onAddButtonClick}>
                            {length ? '카드 추가' : '카드 없음'}
                        </div>
                    </div>
                </MobileSection.Heading>

                {length ? (
                    <>
                        {creditCardList.map((card) => (
                            <CardItem card={card} setCreditCardList={setCreditCardList} />
                        ))}
                        <AddButton title="더 보기" onClick={() => router.push(V3OrgCardShowPageRoute.path(orgId))} />
                    </>
                ) : (
                    <ContentEmpty text="연결된 카드가 없어요" subtext="눌러서 카드 추가" onClick={onAddButtonClick} />
                )}
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
