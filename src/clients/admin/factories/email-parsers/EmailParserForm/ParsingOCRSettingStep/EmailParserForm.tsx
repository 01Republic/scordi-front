import {useFormContext} from 'react-hook-form';
import {FetchedAttachmentFile, GmailItemDto} from '^models/InvoiceAccount/type';
import {EmailParserFormData} from '^models/EmailParser/types';
import {EmailViewer} from './EmailViewer';
import {
    TargetPropertyBooleanItem,
    TargetPropertyDateItem,
    TargetPropertyEnumItem,
    TargetPropertyMoneyItem,
    TargetPropertyNumberItem,
    TargetPropertyTextItem,
} from './TargetPropertyItem';

interface EmailParserFormProps {
    email: GmailItemDto;
    html: string;
    attachments: FetchedAttachmentFile[];
    focusedIndex: number;
    totalItemCount: number;
    onPrev: () => any;
    onNext: () => any;
}

export const EmailParserForm = (props: EmailParserFormProps) => {
    const {email, html, attachments, totalItemCount, focusedIndex, onPrev, onNext} = props;
    const form = useFormContext<{filterQuery: string; parserData: EmailParserFormData}>();

    return (
        <div className="p-4 border-b border-gray-200 grid grid-cols-5">
            <div className="col-span-2 border-r border-gray-200 pr-2">
                <EmailViewer
                    email={email}
                    content={html}
                    attachments={attachments}
                    focusedIndex={focusedIndex}
                    totalItemCount={totalItemCount}
                    prev={onPrev}
                    next={onNext}
                />
            </div>

            {/*<div className="border-r border-gray-200 pr-2"></div>*/}

            <div className="col-span-3 pl-2 text-14">
                <TargetPropertyMoneyItem
                    title="국내 결제금액"
                    emailItem={email}
                    content={html}
                    defaultValue={form.getValues('parserData.payAmountParser')}
                    onChange={(value) => form.setValue('parserData.payAmountParser', value)}
                />
                <TargetPropertyMoneyItem
                    title="해외 결제금액"
                    emailItem={email}
                    content={html}
                    defaultValue={form.getValues('parserData.abroadPayAmountParser')}
                    onChange={(value) => form.setValue('parserData.abroadPayAmountParser', value)}
                />
                <TargetPropertyMoneyItem
                    title="부가세"
                    emailItem={email}
                    content={html}
                    defaultValue={form.getValues('parserData.vatAmountParser')}
                    onChange={(value) => form.setValue('parserData.vatAmountParser', value)}
                />
                <TargetPropertyTextItem
                    title="결제수단(카드번호)"
                    emailItem={email}
                    content={html}
                    defaultValue={form.getValues('parserData.payMethodParser')}
                    onChange={(value) => form.setValue('parserData.payMethodParser', value)}
                    question="결제수단(카드번호)"
                />
                <TargetPropertyTextItem
                    title="청구서 파일 주소"
                    emailItem={email}
                    content={html}
                    defaultValue={form.getValues('parserData.invoiceUrlParser')}
                    onChange={(value) => form.setValue('parserData.invoiceUrlParser', value)}
                    question="Invoice File URL"
                />
                <TargetPropertyDateItem
                    title="청구일시"
                    emailItem={email}
                    content={html}
                    defaultValue={form.getValues('parserData.issuedAtParser')}
                    onChange={(value) => form.setValue('parserData.issuedAtParser', value)}
                />
                <TargetPropertyBooleanItem
                    title="결제완료여부"
                    emailItem={email}
                    content={html}
                    defaultValue={form.getValues('parserData.isPaidParser')}
                    onChange={(value) => form.setValue('parserData.isPaidParser', value)}
                    question="결제완료여부"
                />
                <TargetPropertyDateItem
                    title="결제완료일시"
                    emailItem={email}
                    content={html}
                    defaultValue={form.getValues('parserData.paidAtParser')}
                    onChange={(value) => form.setValue('parserData.paidAtParser', value)}
                    question="Paid Date"
                />
                <TargetPropertyTextItem
                    title="워크스페이스명"
                    emailItem={email}
                    content={html}
                    defaultValue={form.getValues('parserData.workspaceNameParser')}
                    onChange={(value) => form.setValue('parserData.workspaceNameParser', value)}
                    optional
                    question="Workspace Name"
                />
                <TargetPropertyTextItem
                    title="플랜명"
                    emailItem={email}
                    content={html}
                    defaultValue={form.getValues('parserData.planNameParser')}
                    onChange={(value) => form.setValue('parserData.planNameParser', value)}
                    optional
                    question="Plan or Subscription Name"
                />
                <TargetPropertyEnumItem
                    title="결제주기"
                    emailItem={email}
                    content={html}
                    defaultValue={form.getValues('parserData.billingCycleParser')}
                    onChange={(value) => form.setValue('parserData.billingCycleParser', value)}
                />
                <TargetPropertyDateItem
                    title="다음결제예정일"
                    emailItem={email}
                    content={html}
                    defaultValue={form.getValues('parserData.nextBillingDateParser')}
                    onChange={(value) => form.setValue('parserData.nextBillingDateParser', value)}
                />
                <TargetPropertyNumberItem
                    title="결제 계정수(시트수)"
                    emailItem={email}
                    content={html}
                    defaultValue={form.getValues('parserData.paidMemberCountParser')}
                    onChange={(value) => form.setValue('parserData.paidMemberCountParser', value)}
                    optional
                />
            </div>
        </div>
    );
};
