import React, {memo} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {OutLink} from '^components/OutLink';
import {GmailParsedItem} from '^api/tasting.api';
import {useTranslation} from 'next-i18next';
import {MobileInfoListItem} from '../MobileInfoListItem';
import {attachmentModalState} from '../AttachmentModal';
import {CurrencyToggle} from '../CurrencyToggle';
import {displayCurrencyAtom} from '../pageAtoms';

interface HeadingContentProps {
    item: GmailParsedItem;
}

export const HeadingContent = memo((props: HeadingContentProps) => {
    const setAttachmentModal = useSetRecoilState(attachmentModalState);
    const {t} = useTranslation('publicTasting');
    const {item} = props;
    const {title, metadata, attachments} = item;

    return (
        <ul className="py-0">
            <MobileInfoListItem label={t('email_title')} className="!items-start">
                <div className="font-light mb-4" style={{wordBreak: 'keep-all'}}>
                    {title}
                </div>
            </MobileInfoListItem>
            <MobileInfoListItem label={t('sent_from')} className="!items-start">
                <div className="font-light mb-4" style={{wordBreak: 'keep-all'}}>
                    {metadata.from}
                </div>
            </MobileInfoListItem>
            <MobileInfoListItem label={t('sent_at')} className="!items-start" value={yyyy_mm_dd_hh_mm(metadata.date)} />
            {attachments.length > 0 && (
                <MobileInfoListItem label={t('attachments')} className="!items-start">
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
        </ul>
    );
});
