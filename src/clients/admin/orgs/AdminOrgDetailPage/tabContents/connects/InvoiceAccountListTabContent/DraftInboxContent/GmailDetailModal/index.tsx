import React, {memo} from 'react';
import {useRecoilState} from 'recoil';
import {CgChevronDoubleRight} from '@react-icons/all-files/cg/CgChevronDoubleRight';
import {CgArrowsExpandLeft} from '@react-icons/all-files/cg/CgArrowsExpandLeft';
import {attachmentClickHandler, GmailContentReadableDto} from '^models/InvoiceAccount/type/gmail.type';
import {SlideSideModal} from '^components/modals/_shared/SlideSideModal';
import {ReactNodeElement, WithChildren} from '^types/global.type';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {getColor, palette} from '^components/util/palette';
import {Tip} from '^admin/share/Tip';
import {selectedInvoiceAccountAtom} from '../../atoms';
import {AdminOrgInvoiceAccountEmailShowPageRoute} from '^pages/admin/orgs/[id]/invoiceAccounts/[invoiceAccountId]/emails/[messageId]';
import {copyText} from '^components/util/copy';
import {toast} from 'react-hot-toast';

interface GmailDetailModalProps {
    email?: GmailContentReadableDto;
    onClose: () => any;
}

export const GmailDetailModal = memo((props: GmailDetailModalProps) => {
    const {email, onClose} = props;
    const [selectedInvoiceAccount, setSelectedInvoiceAccount] = useRecoilState(selectedInvoiceAccountAtom);

    const getUrl = () => {
        if (!selectedInvoiceAccount || !email) return;
        const {id, organizationId} = selectedInvoiceAccount;
        return AdminOrgInvoiceAccountEmailShowPageRoute.url(organizationId, id, email.id);
    };

    const onOpen = () => {
        const url = getUrl();
        url && window.open(url, '_blank');
    };

    return (
        <SlideSideModal open={!!email} onClose={onClose}>
            <div className="relative flex items-center">
                <Tip text="닫기" subtext="Escape">
                    <button
                        onClick={onClose}
                        className="btn btn-xs btn-square !bg-transparent !border-none text-gray-400 hover:text-gray-500 transition-all !outline-none"
                    >
                        <CgChevronDoubleRight size={16} className="scale-[1.5]" />
                    </button>
                </Tip>
                <Tip text="전체 페이지로 열기" subtext="⌘↵">
                    <button
                        onClick={onOpen}
                        className="btn btn-xs btn-square !bg-transparent !border-none text-gray-400 hover:text-gray-500 transition-all !outline-none"
                    >
                        <CgArrowsExpandLeft size={16} />
                    </button>
                </Tip>

                <div className="ml-auto">
                    {email && (
                        <div
                            className="flex items-center gap-4"
                            onClick={() => {
                                const url = getUrl();
                                url && copyText(url).then(() => toast('링크를 복사했어요.'));
                            }}
                        >
                            <div className="text-gray-500">ID:</div>
                            <div className="font-semibold link link-primary">{email.id}</div>
                        </div>
                    )}
                </div>
            </div>

            <br />

            <div className="flex items-end justify-between mb-4">
                <div className="">
                    {email && email.labelIds.length > 0 && (
                        <div className="">
                            {email.labelIds.map((labelId, i) => (
                                <TagUI key={i} className={getColor(i, palette.notionColors)}>
                                    {labelId}
                                </TagUI>
                            ))}
                        </div>
                    )}
                </div>

                <div className="text-right font-bold">
                    {(email?.metadata.sender || email?.metadata.fromEmail) && (
                        <div className="text-12">(발신) {email?.metadata.sender || email?.metadata.fromEmail}</div>
                    )}
                    <div className="">{email ? email.date.toLocaleString() : ''}</div>
                </div>
            </div>
            <h3 className="text-24 font-semibold mb-4" onClick={() => console.log(email)}>
                {email?.metadata.subject}
            </h3>

            <div className="max-h-[76vh] overflow-y-auto no-scrollbar">
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

                <br />
                <hr className="mb-4" />

                <div className="max-w-full overflow-auto no-scrollbar">
                    <div className="" dangerouslySetInnerHTML={{__html: email?.contents[0] || ''}} />
                </div>
            </div>
        </SlideSideModal>
    );
});
GmailDetailModal.displayName = 'GmailDetailModal';

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
