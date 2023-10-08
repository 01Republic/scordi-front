import React, {memo, useEffect} from 'react';
import {useInvoiceAccounts} from '^hooks/useInvoiceAccounts';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ContentEmpty} from './ContentEmpty';
import {InvoiceAccountItem} from './InvoiceAccountItem';
import {useRouter} from 'next/router';
import {AddButton} from '^v3/V3OrgHomePage/mobile/AddButton';
import {newInvoiceAccountModal} from '^v3/V3OrgHomePage/NewInvoiceAccountModal/atom';
import {useModal} from '^v3/share/modals/useModal';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';

export const InvoiceAccountsPanel = memo(() => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const {result, search} = useInvoiceAccounts();
    const {open: newInvoiceAccountModalShow} = useModal(newInvoiceAccountModal);
    const {items} = result;

    useEffect(() => {
        if (!router.isReady) return;
        if (!orgId || isNaN(orgId)) return;
        search({relations: ['subscriptions'], order: {id: 'DESC'}, itemsPerPage: 0});
    }, [router.isReady, orgId]);

    const onAddButtonClick = () => {
        console.log(result);
        newInvoiceAccountModalShow();
    };

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <MobileSection.Heading title="결제 수신 계정">
                    <div className="text-sm text-gray-500">
                        <div>{items.length ? `${items.length}개 연동 중` : '계정 없음'}</div>
                    </div>
                </MobileSection.Heading>

                {items.length ? (
                    <>
                        {items.map((item, i) => (
                            <InvoiceAccountItem invoiceAccount={item} key={i} />
                        ))}
                        <AddButton title="계정 더 추가하기" onClick={onAddButtonClick} />
                    </>
                ) : (
                    <ContentEmpty text="연결된 계정이 없어요" subtext="눌러서 계정 추가" onClick={onAddButtonClick} />
                )}
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
