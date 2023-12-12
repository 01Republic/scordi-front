import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {subjectProductOfAccountsInModalState} from '^v3/share/modals/AccountListModal/atom';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ProductSelector} from '^v3/share/modals/AccountListModal/ProductSelector';
import {useAccounts} from '^models/Account/hook';
import {FcLock} from '^components/react-icons';

export const HeaderPanel = memo(() => {
    const {result: pagedAccounts} = useAccounts();
    const product = useRecoilValue(subjectProductOfAccountsInModalState);

    const accountCount = pagedAccounts.items.length;

    const title = accountCount ? `${accountCount}개를 보관중이에요` : '세상에서 가장 쉬운 계정관리';

    return (
        <MobileSection.Item className="sticky top-[50px] bg-white z-10">
            <MobileSection.Padding>
                <div className="flex items-center space-x-2 mb-2">
                    <h3 className="h2 flex-1 flex gap-2 items-center">
                        <FcLock /> {title}
                    </h3>
                </div>
                <div className="flex pt-6 px-1.5">
                    <ProductSelector product={product} />
                </div>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
