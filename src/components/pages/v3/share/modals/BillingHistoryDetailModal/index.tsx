import React, {memo} from 'react';
import {useSetRecoilState} from 'recoil';
import {AttachmentModal, attachmentModalState} from '^components/pages/LandingPages/TastingPage/AttachmentModal';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {PrototypeAvatar} from '^components/pages/LandingPages/TastingPage/TastingItemDetailModal/PrototypeAvatar';
import {HeadingPrice} from '^v3/V3OrgBillingHistoryShowPage/HeadingPrice';
import {MobileInfoList} from '^v3/share/MobileInfoList';
import {MobileInfoListItem} from '^v3/share/MobileInfoList/Item';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {OutLink} from '^components/OutLink';
import {BillingHistoryContentPanel} from './BillingHistoryContentPanel';
import {useBillingHistoriesInModal, useBillingHistoryInModal, useBillingHistoryModal} from './hook';
import {AddBillingHistoryModal} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal';

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
                                        {billingHistory.paymentMethod && (
                                            <MobileInfoListItem
                                                label="결제수단"
                                                className="!items-start"
                                                value={billingHistory.getPaymentMethod()}
                                            />
                                        )}
                                        {attachments.length > 0 && (
                                            <MobileInfoListItem label="인보이스" className="!items-start">
                                                <div className="w-full overflow-auto">
                                                    {attachments.map((attachment, i) => (
                                                        <div
                                                            key={i}
                                                            className="font-light text-xs badge overflow-hidden justify-start whitespace-nowrap mb-4"
                                                            onClick={() => setAttachmentModal(attachment)}
                                                        >
                                                            <OutLink
                                                                href={attachment.url!}
                                                                text={attachment.fileName}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </MobileInfoListItem>
                                        )}
                                        <MobileInfoListItem label="이메일 원문" className="!items-start">
                                            <div className="flex gap-3">
                                                {billingHistory.getEmailContents().map((file, i) => (
                                                    <a
                                                        key={i}
                                                        className="link text-gray-400"
                                                        onClick={() => window.open(file.url, '_blank')}
                                                    >{`아카이브${i + 1}`}</a>
                                                ))}
                                            </div>
                                        </MobileInfoListItem>
                                    </MobileInfoList>
                                </div>
                            )}
                        </MobileSection.Padding>
                    </MobileSection.Item>

                    <BillingHistoryContentPanel billingHistories={pagedHistories.items} />
                </MobileSection.List>
            </Modal>
            <AttachmentModal />
            <AddBillingHistoryModal />
        </>
    );
});
