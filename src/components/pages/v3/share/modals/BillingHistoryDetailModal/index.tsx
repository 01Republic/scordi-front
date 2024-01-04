import React, {memo} from 'react';
import {useSetRecoilState} from 'recoil';
import {AttachmentModal, attachmentModalState} from '^components/pages/LandingPages/TastingPage/AttachmentModal';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {PrototypeAvatar} from '^components/pages/LandingPages/TastingPage/TastingItemDetailModal/PrototypeAvatar';
import {HeadingPrice} from '^v3/V3OrgBillingHistoryShowPage/HeadingPrice';
import {BillingHistoryContentPanel} from './BillingHistoryContentPanel';
import {useBillingHistoriesInModal, useBillingHistoryInModal, useBillingHistoryModal} from './hook';
import {NewBillingHistoryModal} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal';
import {BillingHistoryShowBody} from '^v3/share/modals/BillingHistoryDetailModal/BillingHistoryShowBody';
import {BillingHistoryDeleteButton as DeleteButton} from '^v3/share/modals/BillingHistoryDetailModal/DeleteButton';
import {BillingHistoryEditButton as EditButton} from '^v3/share/modals/BillingHistoryDetailModal/EditButton';

export const BillingHistoryDetailModal = memo(() => {
    const {close, Modal} = useBillingHistoryModal();
    const setAttachmentModal = useSetRecoilState(attachmentModalState);
    const {billingHistory, isLoading: isSubjectLoading} = useBillingHistoryInModal();
    const {pagedHistories, isLoading: isSiblingsLoading} = useBillingHistoriesInModal();

    const onBack = () => close();
    const attachments = billingHistory ? billingHistory.getAttachments() : [];

    return (
        <>
            <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
                <ModalTopbar
                    backBtnOnClick={onBack}
                    title={billingHistory ? billingHistory.pageSubject : '결제 세부사항'}
                    topbarPosition="sticky"
                    rightButtons={[EditButton, DeleteButton]}
                />
                <MobileSection.List>
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
                                <div>
                                    <PrototypeAvatar proto={billingHistory.subscription?.product} />
                                    <HeadingPrice price={billingHistory.payAmount} />

                                    <BillingHistoryShowBody />
                                </div>
                            )}
                        </MobileSection.Padding>
                    </MobileSection.Item>

                    <BillingHistoryContentPanel billingHistories={pagedHistories.items} />
                </MobileSection.List>
            </Modal>
            <AttachmentModal />
            <NewBillingHistoryModal />
        </>
    );
});
