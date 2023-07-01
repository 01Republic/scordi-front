import React, {memo} from 'react';
import {useSetRecoilState} from 'recoil';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {OutLink} from '^components/OutLink';
import {GmailItem} from '^api/tasting.api';
import {MobileInfoListItem} from '../MobileInfoListItem';
import {attachmentModalState} from '../AttachmentModal';

interface HeadingContentProps {
    item: GmailItem;
}

export const HeadingContent = memo((props: HeadingContentProps) => {
    const {item} = props;
    const setAttachmentModal = useSetRecoilState(attachmentModalState);
    const {title, metadata, attachments} = item;

    return (
        <ul className="py-0">
            <MobileInfoListItem label="제목" className="!items-start">
                <div className="font-light mb-4">{title}</div>
            </MobileInfoListItem>
            <MobileInfoListItem label="발신" className="!items-start">
                <div className="font-light mb-4">{metadata.from}</div>
            </MobileInfoListItem>
            <MobileInfoListItem label="발신일시" className="!items-start" value={yyyy_mm_dd_hh_mm(metadata.date)} />
            {attachments.length > 0 && (
                <MobileInfoListItem label="첨부파일" className="!items-start">
                    <div className="w-full overflow-auto">
                        {attachments.map((attachment, i) => (
                            <div
                                key={i}
                                className="font-light text-xs badge overflow-hidden justify-start whitespace-nowrap mb-4"
                                onClick={() => {
                                    setAttachmentModal(attachment);
                                    console.log(attachment.url);
                                }}
                            >
                                <OutLink href={attachment.url} text={attachment.fileName} />
                            </div>
                        ))}
                    </div>
                </MobileInfoListItem>
            )}
        </ul>
    );
});
