import React, {memo, useEffect} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ProductSelector} from '^v3/share/modals/AccountListModal/ProductSelector';
import {useRecoilValue} from 'recoil';
import {subjectProductOfAccountsInModalState} from '^v3/share/modals/AccountListModal/atom';

export const HeaderPanel = memo(() => {
    const product = useRecoilValue(subjectProductOfAccountsInModalState);

    return (
        <MobileSection.Item className="sticky top-[50px] bg-white z-10">
            <MobileSection.Padding>
                <div className="flex items-center space-x-2 mb-2">
                    <h3 className="h2 flex-1">보관중인 계정</h3>
                </div>
                <div className="flex pt-6">
                    <ProductSelector product={product} />
                </div>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
