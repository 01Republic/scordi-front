import React, {memo, useEffect, useState} from 'react';
import {MobileInfoListItem} from '^v3/share/MobileInfoList/Item';
import {useAccounts} from '^models/Account/hook';
import {useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {currencyFormat} from '^utils/number';
import {FiChevronRight} from '^components/react-icons';
import {useModal} from '^v3/share/modals/useModal';
import {accountListModal, subjectProductOfAccountsInModalState} from '^v3/share/modals/AccountListModal/atom';
import {useSetRecoilState} from 'recoil';

export const ListItemForAccount = memo(() => {
    const {result: pagedAccounts, fetchAllAccountsBy} = useAccounts();
    const {currentSubscription} = useCurrentSubscription();
    const [isLoading, setIsLoading] = useState(false);
    const {open: accountListModalOpen} = useModal(accountListModal);
    const setSubjectProduct = useSetRecoilState(subjectProductOfAccountsInModalState);

    useEffect(() => {
        if (!currentSubscription) return;

        setIsLoading(true);
        fetchAllAccountsBy({productId: currentSubscription.productId}).finally(() => setIsLoading(false));
    }, [currentSubscription]);

    const count = pagedAccounts.pagination.totalItemCount;

    const onClick = () => {
        if (!currentSubscription) return;

        setSubjectProduct(currentSubscription.product);
        accountListModalOpen();
    };

    return (
        <MobileInfoListItem label="보관중인 계정">
            {isLoading ? (
                <p>loading...</p>
            ) : (
                <div
                    className="flex items-center justify-between gap-2 font-light cursor-pointer hover:font-semibold"
                    onClick={onClick}
                >
                    {count ? (
                        <span>{currencyFormat(count, '개', '%n %u')}</span>
                    ) : (
                        <span className="text-sm text-gray-500">계정을 안전하게 보관해보세요</span>
                    )}
                    <span>
                        <FiChevronRight />
                    </span>
                </div>
            )}
        </MobileInfoListItem>
    );
});
