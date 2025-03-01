import React, {memo} from 'react';
import {copyText} from '^components/util/copy';
import {toast} from 'react-hot-toast';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {getColor, palette} from '^components/util/palette';
import {attachmentClickHandler, GmailContentReadableDto} from '^models/InvoiceAccount/type';
import {EmptyText} from '^components/lib/gmail/gmail-finder/common/EmptyText';
import {LoadableBox} from '^components/util/loading';
import {GmailHeaderItem} from './GmailHeaderItem';

interface GmailHeaderInfoProps {
    isLoading?: boolean;
    email?: GmailContentReadableDto;
    url?: string;
}

export const GmailHeaderInfo = memo((props: GmailHeaderInfoProps) => {
    const {isLoading = false, email, url = ''} = props;

    return (
        <LoadableBox isLoading={isLoading} loadingType={2} noPadding spinnerPos="center">
            <section className="relative flex items-center">
                <div className="text-left font-bold">
                    {(email?.metadata.sender || email?.metadata.fromEmail) && (
                        <div className="text-12">(발신) {email?.metadata.sender || email?.metadata.fromEmail}</div>
                    )}
                    <div className="">{email ? email.date.toLocaleString() : ''}</div>
                </div>

                <div className="ml-auto">
                    {email && (
                        <div
                            className="flex items-center gap-4"
                            onClick={() => copyText(url).then(() => toast('링크를 복사했어요.'))}
                        >
                            <div className="text-gray-500">ID:</div>
                            <div className="font-semibold link link-primary">{email.id}</div>
                        </div>
                    )}
                </div>
            </section>

            <br />

            <section className="flex items-end justify-between mb-4">
                {email && email.labelIds.length > 0 && (
                    <div className="">
                        {email.labelIds.map((labelId, i) => (
                            <TagUI key={i} className={getColor(i, palette.notionColors)}>
                                {labelId}
                            </TagUI>
                        ))}
                    </div>
                )}
            </section>

            <section>
                <h3 className="text-24 font-semibold mb-4" onClick={() => console.log(email)}>
                    {email?.metadata.subject}
                </h3>
            </section>

            <section>
                <p className="text-gray-400 mb-8">{email?.snippet}</p>

                <div className="flex flex-col text-14">
                    <GmailHeaderItem label="보낸이 (From)">{email?.metadata.from}</GmailHeaderItem>
                    <GmailHeaderItem label="받는이 (To)">{email?.metadata.to}</GmailHeaderItem>
                    <GmailHeaderItem label="받은이 (Receiver)">{email?.metadata.receiver}</GmailHeaderItem>

                    <GmailHeaderItem label="첨부파일" className="mt-4">
                        {email?.attachments.length ? (
                            email.attachments.map((attachment, i) => {
                                return (
                                    <div key={i}>
                                        <button
                                            className="btn btn-xs btn-white rounded-full normal-case no-animation btn-animation"
                                            onClick={() => attachmentClickHandler(attachment)}
                                        >
                                            {i + 1}. {attachment.filename}
                                        </button>
                                    </div>
                                );
                            })
                        ) : (
                            <EmptyText />
                        )}
                    </GmailHeaderItem>
                </div>
            </section>
        </LoadableBox>
    );
});
GmailHeaderInfo.displayName = 'GmailHeaderInfo';
