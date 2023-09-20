import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {useModal} from '^v3/share/modals/useModal';
import {ModalLikeTopbar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeTopbar';
import {MobileSection} from '../share/sections/MobileSection';
import {billingHistoryShowModal} from './atom';
import {useBillingHistoriesInModal, useBillingHistoryInModal} from './useBillingHistoryModal';
import {PrototypeAvatar} from '^components/pages/LandingPages/TastingPage/TastingItemDetailModal/PrototypeAvatar';
import {MobileInfoList} from '../share/MobileInfoList';
import {HeadingPrice} from './HeadingPrice';
import {BillingHistoryContentPanel} from '^v3/V3OrgAppShowPage/BillingHistoryContentPanel';
import {MobileInfoListItem} from '^v3/share/MobileInfoList/Item';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {OutLink} from '^components/OutLink';
import {useSetRecoilState} from 'recoil';
import {attachmentModalState} from '^components/pages/LandingPages/TastingPage/AttachmentModal';

export const BillingHistoryShowModal = memo(() => {
    const {close, Modal} = useModal(billingHistoryShowModal);
    const setAttachmentModal = useSetRecoilState(attachmentModalState);
    const {billingHistory, isLoading: isSubjectLoading} = useBillingHistoryInModal();
    const {billingHistoriesPage, isLoading: isSiblingsLoading} = useBillingHistoriesInModal();

    const onBack = () => {
        close();
    };

    console.log('billingHistory', billingHistory);
    const attachments = billingHistory ? billingHistory.getAttachments() : [];

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalLikeTopbar backBtnOnClick={onBack} topbarPosition="sticky" />
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
                                <PrototypeAvatar proto={billingHistory.subscription.product} />
                                <HeadingPrice price={billingHistory.payAmount} />

                                <MobileInfoList>
                                    <MobileInfoListItem label="제목" className="!items-start">
                                        <div className="font-light mb-4 keep-all">{billingHistory.title}</div>
                                    </MobileInfoListItem>
                                    <MobileInfoListItem label="발신" className="!items-start">
                                        <div className="font-light mb-4 keep-all">{billingHistory.from()}</div>
                                    </MobileInfoListItem>
                                    <MobileInfoListItem
                                        label="발신일시"
                                        className="!items-start"
                                        value={yyyy_mm_dd_hh_mm(billingHistory.issuedAt)}
                                    />
                                    <MobileInfoListItem
                                        label="결제수단"
                                        className="!items-start"
                                        value={billingHistory.paymentMethod}
                                    />
                                    {attachments.length > 0 && (
                                        <MobileInfoListItem label="인보이스" className="!items-start">
                                            <div className="w-full overflow-auto">
                                                {attachments.map((attachment, i) => (
                                                    <div
                                                        key={i}
                                                        className="font-light text-xs badge overflow-hidden justify-start whitespace-nowrap mb-4"
                                                        onClick={() => setAttachmentModal(attachment)}
                                                    >
                                                        <OutLink href={attachment.url!} text={attachment.fileName} />
                                                    </div>
                                                ))}
                                            </div>
                                        </MobileInfoListItem>
                                    )}
                                </MobileInfoList>
                            </div>
                        )}
                    </MobileSection.Padding>
                </MobileSection.Item>

                <BillingHistoryContentPanel billingHistories={billingHistoriesPage.items} />
            </MobileSection.List>
        </Modal>
    );
});
