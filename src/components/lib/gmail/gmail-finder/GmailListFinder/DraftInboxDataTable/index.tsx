import React, {memo} from 'react';
import {CardTablePanel} from '^admin/share';
import Tippy from '@tippyjs/react';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {attachmentClickHandler, GmailContentReadableDto} from '^models/InvoiceAccount/type/gmail.type';
import {hh_mm, yyyy_mm_dd} from '^utils/dateTime';
import {LoadableBox} from '^components/util/loading';

interface DraftInboxDataTableProps {
    isLoading: boolean;
    entries: GmailContentReadableDto[];
    onClick: (entry: GmailContentReadableDto) => any;
}

export const DraftInboxDataTable = memo((props: DraftInboxDataTableProps) => {
    const {isLoading, entries, onClick} = props;

    return (
        <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
            <CardTablePanel
                gridClass={'grid-cols-12'}
                entries={entries}
                columns={[
                    {
                        th: '보낸이',
                        className: 'text-12 col-span-2',
                        render: (email) => {
                            return (
                                <div className="leading-tight">
                                    <div className="font-semibold whitespace-nowrap overflow-hidden">
                                        {email.metadata.fromName}
                                    </div>
                                    <div className="text-gray-400 text-10 whitespace-nowrap overflow-hidden">
                                        {email.metadata.fromEmail}
                                    </div>
                                </div>
                            );
                        },
                    },
                    {
                        th: '제목',
                        className: 'text-12 col-span-7',
                        render: (email) => {
                            return (
                                <div className="cursor-pointer group" onClick={() => onClick(email)}>
                                    <Tippy className="text-10" content={<span>{email.id}</span>}>
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="whitespace-nowrap font-semibold group-hover:text-indigo-500 transition-all">
                                                {email.metadata.subject}
                                            </div>
                                            <div className="whitespace-nowrap font-light text-gray-400 group-hover:text-indigo-500 transition-all">
                                                {email.snippet}
                                            </div>
                                        </div>
                                    </Tippy>
                                </div>
                            );
                        },
                    },
                    {
                        th: '첨부파일',
                        className: 'text-12 text-center',
                        render: (email) => {
                            if (!email.attachments.length) {
                                return (
                                    <button className="btn btn-white btn-xs" disabled={!email.attachments.length}>
                                        보기
                                    </button>
                                );
                            }

                            return (
                                <MoreDropdown
                                    placement="bottom-end"
                                    Trigger={() => <button className="btn btn-white btn-xs">보기</button>}
                                    offset={[2, 4]}
                                >
                                    <div className="card card-bordered card-compact rounded-md shadow-lg bg-white text-12 min-w-[100px]">
                                        {email.attachments.map((attachment, i) => (
                                            <MoreDropdown.MenuItem
                                                key={i}
                                                className="!text-11 whitespace-nowrap overflow-hidden"
                                                onClick={() => attachmentClickHandler(attachment)}
                                            >
                                                {attachment.filename}
                                            </MoreDropdown.MenuItem>
                                        ))}
                                    </div>
                                </MoreDropdown>
                            );
                        },
                    },
                    {
                        th: '받은시각',
                        className: 'text-12 text-right',
                        render: (email) => {
                            const date = email.date;
                            const ymd = yyyy_mm_dd(date);
                            const hm = hh_mm(date);
                            const todayYmd = yyyy_mm_dd(new Date());
                            return (
                                <div className="font-semibold">
                                    {ymd === todayYmd ? (
                                        `오늘 ${hm}`
                                    ) : (
                                        <div>
                                            <div className="leading-none whitespace-nowrap">{ymd}</div>
                                            <div className="leading-none text-10 text-gray-500">{hm}</div>
                                        </div>
                                    )}
                                </div>
                            );
                        },
                    },
                    {
                        th: '',
                        className: 'text-12',
                        render: (email) => {
                            return <div></div>;
                        },
                    },
                ]}
            />
        </LoadableBox>
    );
});
DraftInboxDataTable.displayName = 'DraftInboxDataTable';
