import React, {memo} from 'react';
import {atom} from 'recoil';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {BillingHistoriesPageBody} from '^v3/V3OrgBillingHistoriesPage/BillingHistoriesPageBody';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {BillingListPanel} from '^v3/V3OrgBillingHistoriesPage/mobile/BillingListPanel';
import {DailyBillingListPanel} from './DailyBillingListPanel';

export const dailyBillingHistoriesModal = {
    isShowAtom: atom({
        key: 'v3/dailyBillingHistoriesModal',
        default: false,
    }),
};

export const DailyBillingHistoriesModal = memo(function DailyBillingHistoriesModal() {
    const {isShow, close, Modal} = useModal(dailyBillingHistoriesModal);

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />
            <MobileSection.List>{isShow && <DailyBillingListPanel />}</MobileSection.List>
        </Modal>
    );
});

/**
 *
 * export const BillingHistoriesPageBody = memo(() => {
 *     const currentOrg = useRecoilValue(currentOrgAtom);
 *
 *     if (!currentOrg) return <></>;
 *
 *     return (
 *         <>
 *             <CalendarPanel />
 *             <BillingListPanel />
 *         </>
 *     );
 * });
 */
