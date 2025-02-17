import React, {memo, useState} from 'react';
import {useRecoilState} from 'recoil';
import {IoIosClose} from 'react-icons/io';
import {selectedInvoiceAccountAtom} from '../atoms';
import {PagePerSelect} from '^components/Paginator';
import {LoadableBox} from '^components/util/loading';
import {CardTablePanel, CardTableTH} from '^admin/share';
import {TabPaneProps} from '^components/util/tabs';
import {invoiceAccountGmailTestApi} from '^models/InvoiceAccount/api';
import {useQuery} from '@tanstack/react-query';
import {GmailMessageListFetchParamQueryDto} from '^models/InvoiceAccount/type/invoiceAccountGmailTextApi.type';
import {useForm} from 'react-hook-form';
import Tippy from '@tippyjs/react';
import {FaSearch} from '@react-icons/all-files/fa/FaSearch';
import {FaChevronLeft} from '@react-icons/all-files/fa/FaChevronLeft';
import {FaChevronRight} from '@react-icons/all-files/fa/FaChevronRight';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {hh_mm, yyyy_mm_dd} from '^utils/dateTime';
import {GmailDetailModal} from './GmailDetailModal';
import {attachmentClickHandler, GmailContentReadableDto} from '^models/InvoiceAccount/type/gmail.type';

export const DraftInboxContent = memo((props: TabPaneProps) => {
    const {moveTab = console.log} = props;
    const [selectedInvoiceAccount, setSelectedInvoiceAccount] = useRecoilState(selectedInvoiceAccountAtom);
    const invoiceAccountId = selectedInvoiceAccount?.id;
    const [detailModalEmail, setDetailModalEmail] = useState<GmailContentReadableDto>();
    const [prevPageTokens, setPrevPageTokens] = useState<string[]>(['']);
    const form = useForm<GmailMessageListFetchParamQueryDto>({
        defaultValues: {
            maxResults: 20,
            readable: true,
            pageToken: '',
        },
    });
    const params = form.watch();
    const currentPageNum = prevPageTokens.findIndex((token) => token === params.pageToken) + 1;

    const {data, isLoading} = useQuery({
        queryKey: ['DraftInboxContent.index', invoiceAccountId, params],
        queryFn: () => invoiceAccountGmailTestApi.index(invoiceAccountId!, params),
        enabled: !!invoiceAccountId,
    });
    // const {items, pagination} = result;

    return (
        <div>
            {selectedInvoiceAccount && (
                // Filter Section
                <section className="flex items-center text-12 gap-4 mb-4">
                    {/* Filter: InvoiceAccount */}
                    <div className="flex items-center">
                        <div className="mr-2">선택된 계정:</div>
                        <div
                            className="flex items-center group cursor-pointer"
                            onClick={() => {
                                setSelectedInvoiceAccount(undefined);
                                moveTab(0);
                            }}
                        >
                            <div className="text-gray-400 group-hover:text-gray-800 transition-all">
                                {selectedInvoiceAccount.email}
                            </div>
                            <IoIosClose size={20} className="text-gray-400 group-hover:text-gray-800 transition-all" />
                        </div>
                    </div>
                </section>
            )}

            <div className="flex items-center justify-between text-14">
                <div className="w-3/6 relative">
                    <div className="absolute top-0 bottom-0 left-2.5 flex items-center justify-center">
                        <FaSearch fontSize={12} className="" />
                    </div>
                    <input
                        type="text"
                        className="input w-full input-bordered input-sm pl-8"
                        placeholder={`from:someuser@example.com is:unread`}
                        defaultValue={params.q}
                        onKeyUp={(e) => {
                            const value = e.target.value;
                            if (e.code === 'Enter') {
                                setPrevPageTokens(['']);
                                form.setValue('pageToken', '');
                                form.setValue('maxResults', 20);
                                form.setValue('q', value);
                            }
                        }}
                    />
                    {/*총 {pagination.totalItemCount}개의 결과, {pagination.totalPage}p 중 {pagination.currentPage}p*/}
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <div
                            className=""
                            onClick={() => {
                                console.log('prevPageTokens', prevPageTokens);
                                console.log('params.pageToken', params.pageToken);
                            }}
                        >
                            현재 {currentPageNum}p /
                        </div>
                        <div>이동</div>
                        {prevPageTokens.map((pageToken, i) => (
                            <div
                                key={pageToken}
                                className="link link-primary underline-offset-2"
                                onClick={() => form.setValue('pageToken', pageToken)}
                            >
                                {i + 1}p
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            className="btn btn-sm btn-ghost btn-circle"
                            disabled={currentPageNum == 1}
                            onClick={() => {
                                const currentPageIndex = currentPageNum - 1;
                                const pageToken = prevPageTokens[currentPageIndex - 1];
                                if (pageToken) {
                                    form.setValue('pageToken', pageToken);
                                }
                            }}
                        >
                            <FaChevronLeft />
                        </button>

                        <button
                            className="btn btn-sm btn-ghost btn-circle"
                            disabled={!data?.nextPageToken}
                            onClick={() => {
                                const pageToken = data?.nextPageToken;
                                if (pageToken) {
                                    setPrevPageTokens((tokens) => {
                                        return tokens.includes(pageToken) ? [...tokens] : [...tokens, pageToken];
                                    });
                                    form.setValue('pageToken', pageToken);
                                }
                            }}
                        >
                            <FaChevronRight />
                        </button>
                    </div>

                    <PagePerSelect
                        className="select-sm"
                        defaultValue={params.maxResults || 20}
                        changePageSize={(size) => {
                            setPrevPageTokens(['']);
                            form.setValue('pageToken', '');
                            form.setValue('maxResults', size);
                        }}
                        perValues={[10, 20, 30, 50, 100]}
                    />
                </div>
            </div>

            <br />

            <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
                <CardTablePanel
                    gridClass={'grid-cols-12'}
                    entries={data?.messages || []}
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
                                    <div className="cursor-pointer group" onClick={() => setDetailModalEmail(email)}>
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
                                            {email.attachments.map((attachment, i) => {
                                                return (
                                                    <MoreDropdown.MenuItem
                                                        key={i}
                                                        className="!text-11 whitespace-nowrap overflow-hidden"
                                                        onClick={() => attachmentClickHandler(attachment)}
                                                    >
                                                        {attachment.filename}
                                                    </MoreDropdown.MenuItem>
                                                );
                                            })}
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
                                                <div className="leading-none">{ymd}</div>
                                                <div className="leading-none text-10 text-gray-500">{hm}</div>
                                            </div>
                                        )}
                                    </div>
                                );
                            },
                        },
                        {
                            th: 'ID',
                            className: 'text-12',
                            render: (email) => {
                                return <div></div>;
                            },
                        },
                    ]}
                />
            </LoadableBox>

            <GmailDetailModal email={detailModalEmail} onClose={() => setDetailModalEmail(undefined)} />
        </div>
    );
});
