import {BillingHistoryDto} from '^models/BillingHistory/type';
import React, {memo} from 'react';
import {MobileInfoListItem} from '^v3/share/MobileInfoList/Item';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {OutLink} from '^components/OutLink';
import {MobileInfoList} from '^v3/share/MobileInfoList';
import {useSetRecoilState} from 'recoil';
import {attachmentModalState} from '^tasting/AttachmentModal';
import {CreditCardProfileOption} from '^models/CreditCard/hook/components/CreditCardProfile';

interface EmailInvoiceBillingHistoryProps {
    billingHistory: BillingHistoryDto;
}

export const EmailInvoiceBillingHistoryInfoPanel = memo(function EmailInvoiceBillingHistory(
    props: EmailInvoiceBillingHistoryProps,
) {
    const setAttachmentModal = useSetRecoilState(attachmentModalState);

    const {billingHistory} = props;
    const attachments = billingHistory.getAttachments();

    return (
        <MobileInfoList>
            <MobileInfoListItem label="제목" className="!items-start">
                <div className="font-light mb-4 keep-all overflow-hidden overflow-ellipsis">{billingHistory.title}</div>
            </MobileInfoListItem>
            <MobileInfoListItem label="발신" className="!items-start">
                <div className="font-light mb-4 keep-all overflow-hidden overflow-ellipsis">
                    {billingHistory.from()}
                </div>
            </MobileInfoListItem>
            <MobileInfoListItem
                label="발신일시"
                className="!items-start"
                value={yyyy_mm_dd_hh_mm(billingHistory.issuedAt)}
            />
            {billingHistory.paymentMethod && (
                <MobileInfoListItem label="결제수단" className="!items-start">
                    {billingHistory.creditCard ? (
                        <CreditCardProfileOption item={billingHistory.creditCard} />
                    ) : (
                        `❗${billingHistory.paymentMethod}`
                    )}
                </MobileInfoListItem>
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
                                <OutLink href={attachment.url!} text={attachment.fileName} />
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
    );
});
