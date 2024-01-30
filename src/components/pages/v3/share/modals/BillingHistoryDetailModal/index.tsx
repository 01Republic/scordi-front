import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {AttachmentModal} from '^components/pages/LandingPages/TastingPage/AttachmentModal';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {BillingHistoryContentPanel} from './BillingHistoryContentPanel';
import {useBillingHistoryInModal, useBillingHistoryModal} from './hook';
import {BillingHistoryShowBody} from '^v3/share/modals/BillingHistoryDetailModal/BillingHistoryShowBody';
import {BillingHistoryDeleteButton as DeleteButton} from '^v3/share/modals/BillingHistoryDetailModal/DeleteButton';
import {BillingHistoryEditButton as EditButton} from '^v3/share/modals/BillingHistoryDetailModal/EditButton';
import {isBillingHistoryEditModeAtom} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {BillingHistoryEditPanel} from '^v3/share/modals/BillingHistoryDetailModal/BillingHistoryEditPanel';
import {useBillingHistoryListInSiblings, useBillingHistoryListOfSubscription} from '^models/BillingHistory/hook';
import {useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {ModalInfoSkeleton} from '^v3/share/Skeletons';

interface BillingHistoryDetailModalProps {
    onFinish?: () => any;
}

export const BillingHistoryDetailModal = memo((props: BillingHistoryDetailModalProps) => {
    const {close, Modal} = useBillingHistoryModal();
    const isEditMode = useRecoilValue(isBillingHistoryEditModeAtom);
    const {currentSubscription, loadCurrentSubscription} = useCurrentSubscription();
    const {billingHistory, isLoading: isSubjectLoading, loadData: reloadBillingHistory} = useBillingHistoryInModal();
    const {reload: reloadBillingHistoriesOfSubscription} = useBillingHistoryListOfSubscription();
    const {result: pagedHistories} = useBillingHistoryListInSiblings();
    const productName = billingHistory?.subscription?.product?.name();

    const {onFinish} = props;

    const onBack = () => {
        if (currentSubscription) loadCurrentSubscription(currentSubscription.organizationId, currentSubscription.id);
        if (billingHistory) reloadBillingHistory(billingHistory.id);
        reloadBillingHistoriesOfSubscription();
        close();
    };

    return (
        <>
            <Modal onClose={() => onBack()} wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
                <ModalTopbar
                    backBtnOnClick={() => onBack()}
                    title={billingHistory ? `${productName}의 ${billingHistory.pageSubject}` : '결제 세부사항'}
                    topbarPosition="sticky"
                    rightButtons={[EditButton, () => <DeleteButton onFinish={onFinish} />]}
                    isLoading={isSubjectLoading}
                />
                <MobileSection.List>
                    {isEditMode && <BillingHistoryEditPanel onFinish={onFinish} />}
                    {!isEditMode && isSubjectLoading ? (
                        <ModalInfoSkeleton />
                    ) : (
                        <MobileSection.Item>
                            <MobileSection.Padding>
                                <div className="w-full h-[40px]" />

                                <BillingHistoryShowBody />
                            </MobileSection.Padding>
                        </MobileSection.Item>
                    )}

                    <BillingHistoryContentPanel billingHistories={pagedHistories.items} />
                </MobileSection.List>
            </Modal>
            <AttachmentModal />
        </>
    );
});
