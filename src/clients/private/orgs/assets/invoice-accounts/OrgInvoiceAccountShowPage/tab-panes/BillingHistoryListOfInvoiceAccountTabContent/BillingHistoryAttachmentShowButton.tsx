import React, {memo} from 'react';
import {AttachmentFile} from '^api/tasting.api';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import Tippy from '@tippyjs/react';
import {LinkTo} from '^components/util/LinkTo';
import {Dropdown} from '^v3/share/Dropdown';

interface BillingHistoryAttachmentShowButtonProps {
    billingHistory: BillingHistoryDto;
}

export const BillingHistoryAttachmentShowButton = memo((props: BillingHistoryAttachmentShowButtonProps) => {
    const {billingHistory} = props;

    const attachments = billingHistory.getAttachments();

    if (attachments.length === 0) return <BillingHistoryAttachmentEmptyButton />;

    if (attachments.length === 1) {
        const [attachment] = attachments;
        const {url, fileName} = attachment;
        return <LinkTo href={url} target="_blank" className="btn btn-sm btn-white" text="청구서 보기" />;
    }

    return (
        <Dropdown
            placement="bottom-end"
            Trigger={() => <a className={`btn btn-sm btn-white`}>청구서 보기</a>}
            Content={() => {
                return (
                    <div
                        className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-btn border border-gray-200 min-w-[13rem]"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                    >
                        <p className="text-12 mb-1.5 px-1 font-semibold">
                            첨부파일이 {attachments.length.toLocaleString()}개 있어요
                        </p>
                        {attachments.map((attachment, i) => (
                            <LinkTo
                                key={i}
                                className="cursor-pointer flex items-center justify-between group text-12 rounded-sm hover:bg-slate-100 px-1 py-0.5 gap-2.5 text-gray-500"
                                onClick={() => window.open(attachment.url)}
                            >
                                <span className="group-hover:text-scordi transition">{attachment.fileName}</span>
                                <span className="text-10 group-hover:text-black transition">보기</span>
                            </LinkTo>
                        ))}
                    </div>
                );
            }}
        />
    );
});
BillingHistoryAttachmentShowButton.displayName = 'BillingHistoryAttachmentShowButton';

const BillingHistoryAttachmentEmptyButton = () => (
    <Tippy content="첨부파일이 없는 결제내역이에요">
        <div>
            <button className={`btn btn-sm btn-white btn-disabled`}>청구서 보기</button>
        </div>
    </Tippy>
);
