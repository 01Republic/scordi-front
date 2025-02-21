import React, {memo, useState} from 'react';
import {toast} from 'react-hot-toast';
import {ReactNodeElement, WithChildren} from '^types/global.type';
import {useQuery} from '@tanstack/react-query';
import {BsCodeSlash} from '@react-icons/all-files/bs/BsCodeSlash';
import {invoiceAccountGmailTestApi} from '^models/InvoiceAccount/api';
import {attachmentClickHandler} from '^models/InvoiceAccount/type';
import {AdminOrgInvoiceAccountEmailShowPageRoute} from '^pages/admin/orgs/[id]/invoiceAccounts/[invoiceAccountId]/emails/[messageId]';
import {Tip} from '^admin/share/Tip';
import {copyText} from '^components/util/copy';
import {getColor, palette} from '^components/util/palette';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {EmptyText} from '../common/EmptyText';

interface GmailDetailPageProps {
    orgId: number;
    invoiceAccountId: number;
    messageId: string;
}

export const GmailDetailPage = memo((props: GmailDetailPageProps) => {
    const {orgId, invoiceAccountId, messageId} = props;
    const {data: email} = useQuery({
        queryKey: ['AdminOrgInvoiceAccountEmailShowPage', orgId, invoiceAccountId, messageId],
        queryFn: () => invoiceAccountGmailTestApi.show(invoiceAccountId, messageId, {readable: true}),
        enabled: !!orgId && !!invoiceAccountId && !!messageId,
    });

    // raw_data
    const {data} = useQuery({
        queryKey: ['AdminOrgInvoiceAccountEmailShowPage.raw_data', orgId, invoiceAccountId, messageId],
        queryFn: () => invoiceAccountGmailTestApi.show(invoiceAccountId, messageId, {readable: false}),
        enabled: !!orgId && !!invoiceAccountId && !!messageId,
    });
    const [isDataMode, setIsDataMode] = useState(false);

    const url = AdminOrgInvoiceAccountEmailShowPageRoute.url(orgId, invoiceAccountId, messageId);

    return (
        <div className="bg-white grid grid-cols-5 h-screen">
            <div className="col-span-3 bg-gray-50 relative">
                <section className="absolute left-0 right-0 top-0 flex items-center p-1.5 z-10">
                    <div className="ml-auto">
                        <Tip text={isDataMode ? '이메일 보기' : `데이터 보기`}>
                            <button
                                className={`btn btn-xs btn-square transition-all no-animation btn-animation ${
                                    isDataMode ? 'btn-scordi' : 'btn-ghost'
                                }`}
                                onClick={() => setIsDataMode((val) => !val)}
                            >
                                <BsCodeSlash />
                            </button>
                        </Tip>
                    </div>
                </section>

                <section
                    className={`h-full max-h-screen overflow-auto ${
                        isDataMode ? 'bg-gray-800 text-white' : 'no-scrollbar'
                    }`}
                >
                    {!isDataMode ? (
                        <div
                            className="p-8 whitespace-pre"
                            dangerouslySetInnerHTML={{__html: email?.contents[0] || ''}}
                        />
                    ) : (
                        <div className="w-full whitespace-pre p-8">{JSON.stringify(data, null, 4)}</div>
                    )}
                </section>
            </div>

            <div className="col-span-2 px-8 py-8">
                <section className="relative flex items-center">
                    {/*<Tip text="닫기" subtext="Escape">*/}
                    {/*    <button*/}
                    {/*        onClick={onClose}*/}
                    {/*        className="btn btn-xs btn-square !bg-transparent !border-none text-gray-400 hover:text-gray-500 transition-all !outline-none"*/}
                    {/*    >*/}
                    {/*        <CgChevronDoubleRight size={16} className="scale-[1.5]" />*/}
                    {/*    </button>*/}
                    {/*</Tip>*/}
                    {/*<Tip text="전체 페이지로 열기" subtext="⌘↵">*/}
                    {/*    <button*/}
                    {/*        onClick={onOpen}*/}
                    {/*        className="btn btn-xs btn-square !bg-transparent !border-none text-gray-400 hover:text-gray-500 transition-all !outline-none"*/}
                    {/*    >*/}
                    {/*        <CgArrowsExpandLeft size={16} />*/}
                    {/*    </button>*/}
                    {/*</Tip>*/}
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
                        <Section label="보낸이 (From)">{email?.metadata.from}</Section>
                        <Section label="받는이 (To)">{email?.metadata.to}</Section>
                        <Section label="받은이 (Receiver)">{email?.metadata.receiver}</Section>

                        <Section label="첨부파일" className="mt-4">
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
                        </Section>
                    </div>
                </section>

                <br />
                <hr className="mb-4" />
            </div>
        </div>
    );
});
GmailDetailPage.displayName = 'GmailDetailPage';

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
