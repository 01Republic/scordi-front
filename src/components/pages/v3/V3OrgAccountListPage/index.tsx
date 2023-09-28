import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^atoms/organizations.atom';
import {useTranslation} from 'next-i18next';
import {useOnResize2} from '^components/util/onResize2';
import {V3MainLayoutMobile} from '^v3/layouts/V3MainLayout.mobile';
import {BottomTabIndex} from '^v3/share/BottomNavMobile';
import {AccountCreateModal} from '^v3/share/modals/AccountListModal/AccountCreateModal';
import {AccountEditModal} from '^v3/share/modals/AccountListModal/AccountEditModal';
import {ProductChangeModal, useAccountProductChangeModal} from '^v3/share/modals/AccountListModal/ProductChangeModal';
import {useAccountCreateModal} from '^v3/share/modals/AccountListModal/AccountCreateModal/hook';
import {useAccounts} from '^hooks/useAccounts';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {subjectProductOfAccountsInModalState} from '^v3/share/modals/AccountListModal/atom';
import {AccountList} from '^v3/share/modals/AccountListModal/AccountList';
import {HeaderPanel} from '^v3/V3OrgAccountListPage/HeaderPanel';
import {BsPlus} from '^components/react-icons';
import {useAccountEditModal} from '^v3/share/modals/AccountListModal/AccountEditModal/hook';
import {SelectProductModal} from '^v3/share/modals/AccountListModal/SelectProductModal';

export const V3OrgAccountListPage = memo(() => {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const {t} = useTranslation('org-home');
    const {isDesktop} = useOnResize2();
    const product = useRecoilValue(subjectProductOfAccountsInModalState);
    const {result: pagedAccounts, search} = useAccounts();
    const {isShow: isCreateModalShow, show: openCreateModal} = useAccountCreateModal();
    const {isShow: isEditModalShow} = useAccountEditModal();
    const {isShow: isProductChangeModalShow, setHasAllOption} = useAccountProductChangeModal();

    useEffect(() => {
        setHasAllOption(true);
    }, []);

    /**
     * product 를 변경하면, 그에 맞는 계정내역을 조회합니다.
     * ---
     * 모달과는 달리, 페이지는 구독을 특정하지 않은채 진입하므로, 전체 옵션을 운영해야 합니다.
     * 위 이유로 모달과 공유하는 컴포넌트인 HeaderPanel 에 로직을 두지 않고
     * 대신에 껍데기 컨테이너에 해당하는 페이지 컴포넌트에서 이 로직을 운영합니다.
     */
    useEffect(() => {
        const productId = product ? product.id : undefined;
        search({where: {productId}, itemsPerPage: 0});
    }, [product]);

    return (
        <V3MainLayoutMobile
            title="Credentails"
            activeTabIndex={BottomTabIndex.ACCOUNTS}
            modals={[AccountCreateModal, AccountEditModal, SelectProductModal, ProductChangeModal]}
        >
            <HeaderPanel />

            <MobileSection.Item className="border-none">
                <AccountList accounts={pagedAccounts.items} />
            </MobileSection.Item>

            {/* 모든 모달이 꺼진 상태일 때에만 생성모달 플로팅 버튼이 활성화됩니다. */}
            {[!isCreateModalShow, !isEditModalShow, !isProductChangeModalShow].every((e) => e) && (
                <button onClick={openCreateModal} className="btn btn-lg btn-scordi btn-circle btn-floating">
                    <BsPlus size={48} />
                </button>
            )}
        </V3MainLayoutMobile>
    );
});
