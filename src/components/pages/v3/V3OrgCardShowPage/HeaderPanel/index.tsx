import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {ProductSelector} from '../../share/modals/AccountListModal/ProductSelector';
import {subjectProductOfAccountsInModalState} from '../../share/modals/AccountListModal/atom';
import {MobileSection} from '../../share/sections/MobileSection';
import {creditCardListAtom} from '../atom';

export const HeaderPanel = memo(() => {
    const product = useRecoilValue(subjectProductOfAccountsInModalState);
    const creditCardList = useRecoilValue(creditCardListAtom);
    const accountCount = creditCardList.length;
    const title = accountCount ? `${accountCount}개를 등록중이에요` : '세상에서 가장 쉬운 카드관리';

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <div className="flex items-center space-x-2 mb-2">
                    <h3 className="h2 flex-1 flex gap-2 items-center">💳 {title}</h3>
                </div>
                {/* TODO: 어떤 기준으로 필터링할건지 정해야 함 */}
                <div className="flex pt-6 px-1.5">
                    <ProductSelector product={product} />
                </div>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
