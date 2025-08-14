import React, {memo, useEffect, useState} from 'react';
import {GmailItemDto} from '^models/InvoiceAccount/type';
import {Tip} from '^admin/share/Tip';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {copyText} from '^components/util/copy';
import {toast} from 'react-hot-toast';
import {GmailContentDisplayByUrl} from '^components/lib/gmail/gmail-finder/GmailDetailPage/GmailContentDisplay';
import {PaginationMetaData} from '^types/utils/paginated.dto';
import {AdminOrgInvoiceAccountEmailShowPageRoute} from '^pages/admin/orgs/[id]/invoiceAccounts/[invoiceAccountId]/emails/[messageId]';
import {lpp} from '^utils/dateTime';
import {ReactNodeElement, WithChildren} from '^types/global.type';
import {useEventListener} from '^hooks/useEventListener';

interface EmailViewerProps {
    email: GmailItemDto;
    content?: string;
    focusedIndex: number;
    prev: () => any;
    next: () => any;
    pagination: PaginationMetaData;
    overflow?: boolean;
}

export const EmailViewer = memo((props: EmailViewerProps) => {
    const {email, content, focusedIndex, prev, next, pagination, overflow = false} = props;
    const [html, setHtml] = useState('');
    const invoiceAccount = email?.invoiceAccount;

    const getUrl = () => {
        if (!invoiceAccount || !email) return;
        const {id, organizationId} = invoiceAccount;
        return AdminOrgInvoiceAccountEmailShowPageRoute.url(organizationId, id, email.mailId);
    };

    const loadContent = () => email.loadContent().then(setHtml);

    useEffect(() => {
        if (content) setHtml(content);
    }, [content]);

    useEventListener({
        eventName: 'keydown',
        deps: [focusedIndex],
        listener: (evt) => {
            if (evt.ctrlKey && evt.shiftKey && evt.key === 'ArrowRight') {
                evt.preventDefault();
                evt.stopPropagation();
                focusedIndex + 1 < pagination.totalItemCount && next();
            }
            if (evt.ctrlKey && evt.shiftKey && evt.key === 'ArrowLeft') {
                evt.preventDefault();
                evt.stopPropagation();
                focusedIndex > 0 && prev();
            }
        },
    });

    return (
        <div>
            <div className="relative flex items-center gap-2">
                <div className="flex items-center">
                    <Tip text="이전" subtext="Ctrl+K">
                        <button
                            type="button"
                            onClick={() => prev()}
                            className="btn btn-xs btn-square !bg-transparent !border-none text-gray-400 hover:text-gray-500 transition-all !outline-none"
                            disabled={focusedIndex <= 0}
                        >
                            <ChevronLeft size={16} className="scale-[1.5]" />
                        </button>
                    </Tip>
                    <Tip text="다음" subtext="Ctrl+J">
                        <button
                            type="button"
                            onClick={() => next()}
                            className="btn btn-xs btn-square !bg-transparent !border-none text-gray-400 hover:text-gray-500 transition-all !outline-none"
                            disabled={focusedIndex + 1 >= pagination.totalItemCount}
                        >
                            <ChevronRight size={16} className="scale-[1.5]" />
                        </button>
                    </Tip>
                </div>

                <div className="ml-auto">
                    {email && (
                        <div
                            className="flex items-center gap-4 text-12"
                            onClick={() => {
                                const url = getUrl();
                                url && copyText(url).then(() => toast('링크를 복사했어요.'));
                            }}
                        >
                            <div className="text-gray-500">ID:</div>
                            <div className="font-semibold link link-primary">{email.mailId}</div>
                        </div>
                    )}
                </div>
            </div>

            <br />

            <div className="flex items-end justify-between mb-4">
                <div className="font-bold">
                    {(email?.metadata.sender || email?.metadata.fromEmail) && (
                        <div className="text-12">(발신) {email?.metadata.sender || email?.metadata.fromEmail}</div>
                    )}
                    <div className="text-14">{email ? lpp(email.receivedAt) : ''}</div>
                </div>
            </div>
            <h3 className="text-20 font-semibold mb-4" onClick={() => console.log(email)}>
                {email?.metadata.subject}
            </h3>

            <div className={overflow ? `max-h-[76vh] overflow-y-auto no-scrollbar` : ''}>
                <p className="text-gray-400 mb-8 text-13">{email?.snippet}</p>

                <div className="flex flex-col text-14">
                    <Section label="보낸이 (From)">{email?.metadata.from}</Section>
                    <Section label="받는이 (To)">{email?.metadata.to}</Section>
                    <Section label="받은이 (Receiver)" className="pb-4">
                        {email?.metadata.receiver}
                    </Section>

                    <Section label="첨부파일">
                        {/*{email?.attachments.length ? (*/}
                        {/*    email.attachments.map((attachment, i) => {*/}
                        {/*        return (*/}
                        {/*            <div key={i}>*/}
                        {/*                <button*/}
                        {/*                    className="btn btn-xs btn-white rounded-full normal-case no-animation btn-animation"*/}
                        {/*                    onClick={() => attachmentClickHandler(attachment)}*/}
                        {/*                >*/}
                        {/*                    {i + 1}. {attachment.filename}*/}
                        {/*                </button>*/}
                        {/*            </div>*/}
                        {/*        );*/}
                        {/*    })*/}
                        {/*) : (*/}
                        {/*    <EmptyText />*/}
                        {/*)}*/}
                    </Section>
                </div>

                <br />
                <hr className="mb-4" />

                <div
                    className="max-w-full no-scrollbar group cursor-pointer relative"
                    onClick={() => console.log(email)}
                >
                    {html ? (
                        <GmailContentDisplayByUrl srcDoc={html} />
                    ) : (
                        <div className="flex items-center justify-center">
                            <button
                                type="button"
                                className="btn btn-xs btn-white no-animation btn-animation"
                                onClick={loadContent}
                            >
                                본문 보기
                            </button>
                        </div>
                    )}

                    {html && (
                        <div
                            className="opacity-0 group-hover:opacity-100 transition-all absolute top-0 left-0 w-full h-full bg-black/50 text-white flex items-center justify-center"
                            onClick={() => window.open(email.contentUrl, '_blank')}
                        >
                            <div className="text-center h-[5rem]">
                                <div className="text-xl font-semibold">새 창에서 이메일 본문 열기</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

const Section = (
    props: {
        label: ReactNodeElement;
        value?: ReactNodeElement;
        className?: string;
    } & WithChildren,
) => {
    const {label, value, className = '', children} = props;

    return (
        <section className={`sticky top-0 bg-white grid grid-cols-12 ${className}`}>
            <div className="col-span-4 py-1 font-semibold">{label}</div>
            <div className="col-span-8 py-1 text-right">{children || value || <EmptyText />}</div>
        </section>
    );
};

const EmptyText = () => <span className="text-gray-300 text-14">비어있음</span>;
