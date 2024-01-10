import React, {memo, useEffect} from 'react';
import {useResetRecoilState} from 'recoil';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {payMethodModalState} from '^v3/share/modals/NewBillingHistoryModal/atoms';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useCreditCards} from '^models/CreditCard/hook';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {createBillingHistoryAtom} from '^v3/share/modals/NewBillingHistoryModal/atoms/createBillingHistoryAtom';
import {NewCardModalV2} from '^v3/share/modals/NewCardModal/NewCardModalV2';
import {PayMethodModalTitle} from '^v3/share/modals/NewBillingHistoryModal/PayMethodModal/PayMethodModalTitle';
import {CardSelect} from '^v3/share/modals/NewBillingHistoryModal/PayMethodModal/CardSelect';
import {DateSelectInput} from '^v3/share/modals/NewBillingHistoryModal/PayMethodModal/DateSelectInput';
import {CTAButton} from '^v3/share/modals/NewBillingHistoryModal/PayMethodModal/CTAButton';
import {useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';

export const PayMethodModal = memo(() => {
    const {Modal, isShow, close} = useModal(payMethodModalState);
    const {search: getCreditCards} = useCreditCards();
    const resetCreateBillingHistory = useResetRecoilState(createBillingHistoryAtom);
    const {currentSubscription} = useCurrentSubscription();

    useEffect(() => {
        resetCreateBillingHistory();
        getCreditCards({
            itemsPerPage: 0,
            relations: ['holdingMember', 'subscriptions'],
        });
    }, [isShow]);

    return (
        <>
            <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
                <ModalTopbar
                    backBtnOnClick={close}
                    topbarPosition="sticky"
                    title={currentSubscription?.product.nameKo || '결제 내역 추가'}
                />
                <MobileSection.Padding>
                    <PayMethodModalTitle />

                    <section className="flex flex-col gap-5">
                        {/*카드 선택 select*/}
                        <CardSelect />

                        {/*결제 일시 input*/}
                        <DateSelectInput />
                    </section>
                </MobileSection.Padding>

                <ModalLikeBottomBar className="left-0">
                    <CTAButton />
                </ModalLikeBottomBar>
            </Modal>

            <NewCardModalV2 />
        </>
    );
});
