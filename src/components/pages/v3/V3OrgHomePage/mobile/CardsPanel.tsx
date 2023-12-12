import React, {memo, useEffect} from 'react';
import {useRouter} from 'next/router';
import {V3OrgCardListPageRoute} from '^pages/v3/orgs/[orgId]/cards';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {orgIdParamState} from '^atoms/common';
import {AddButton} from './AddButton';
import {creditCardApi} from '^models/CreditCard/api';
import {CardItem} from './CardItem';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useModal} from '^v3/share/modals/useModal';
import {ContentEmpty} from '^v3/V3OrgHomePage/mobile/ContentEmpty';
import {inputCardNumberModal} from '../../V3OrgCardListPage/modals/CardNumberModal/atom';
import {creditCardListAtom} from '^models/CreditCard/atom';

export const CardsPanel = memo(() => {
    const router = useRouter();
    const [creditCardList, setCreditCardList] = useRecoilState(creditCardListAtom);
    const orgId = useRecoilValue(orgIdParamState);
    const cardNumberModal = useModal(inputCardNumberModal);
    const length = creditCardList.length;

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        creditCardApi.index(orgId).then((res) => setCreditCardList(res.data.items));
    }, [orgId]);

    const onAddButtonClick = () => cardNumberModal.open();

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
                        {creditCardList.map((card, i) => (
                            <CardItem key={i} card={card} />
                        ))}
                        <AddButton title="더 보기" onClick={() => router.push(V3OrgCardListPageRoute.path(orgId))} />
                    </>
                ) : (
                    <ContentEmpty text="연결된 카드가 없어요" subtext="눌러서 카드 추가" onClick={onAddButtonClick} />
                )}
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
