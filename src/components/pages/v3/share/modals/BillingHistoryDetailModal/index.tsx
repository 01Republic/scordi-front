import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {AttachmentModal} from '^components/pages/LandingPages/TastingPage/AttachmentModal';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {BillingHistoryContentPanel} from './BillingHistoryContentPanel';
import {useBillingHistoriesInModal, useBillingHistoryInModal, useBillingHistoryModal} from './hook';
import {NewBillingHistoryModal} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal';
import {BillingHistoryShowBody} from '^v3/share/modals/BillingHistoryDetailModal/BillingHistoryShowBody';
import {BillingHistoryDeleteButton as DeleteButton} from '^v3/share/modals/BillingHistoryDetailModal/DeleteButton';
import {BillingHistoryEditButton as EditButton} from '^v3/share/modals/BillingHistoryDetailModal/EditButton';
import {isBillingHistoryEditModeAtom} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {BillingHistoryEditPanel} from '^v3/share/modals/BillingHistoryDetailModal/BillingHistoryEditPanel';
import {AbroadPayAmountCurrencyModal} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/PayAmountModal/AbroadPayAmountCurrencyModal';

export const BillingHistoryDetailModal = memo(() => {
    const {close, Modal} = useBillingHistoryModal();
    const {billingHistory, isLoading: isSubjectLoading} = useBillingHistoryInModal();
    const isEditMode = useRecoilValue(isBillingHistoryEditModeAtom);
    const {pagedHistories} = useBillingHistoriesInModal();

    const onBack = () => {
        close();
    };

    return (
        <>
            <Modal onClose={() => onBack()} wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
                <ModalTopbar
                    backBtnOnClick={() => onBack()}
                    title={billingHistory ? billingHistory.pageSubject : '결제 세부사항'}
                    topbarPosition="sticky"
                    rightButtons={[EditButton, DeleteButton]}
                />
                <MobileSection.List>
                    {isEditMode ? (
                        <BillingHistoryEditPanel />
                    ) : (
                        <>
                            <MobileSection.Item>
                                <MobileSection.Padding>
                                    <div className="w-full h-[40px]" />
                                    {!billingHistory ? (
                                        isSubjectLoading ? (
                                            <p>is loading ...</p>
                                        ) : (
                                            <p>done</p>
                                        )
                                    ) : (
                                        <BillingHistoryShowBody />
                                    )}
                                </MobileSection.Padding>
                            </MobileSection.Item>

                            <BillingHistoryContentPanel billingHistories={pagedHistories.items} />
                        </>
                    )}
                </MobileSection.List>
            </Modal>
            <AttachmentModal />
            <NewBillingHistoryModal />
            <AbroadPayAmountCurrencyModal />
        </>
    );
});
