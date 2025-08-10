import {memo, useEffect, useState} from 'react';
import {ContentPanel, ContentPanelBody, ContentPanelHeading, ContentPanelList} from '^layouts/ContentLayout';
import {useFormContext} from 'react-hook-form';
import {FilterQuery} from '^lib/notion-like-filter';
import {FindAllGmailItemQueryDto} from '^models/InvoiceAccount/type';
import {useQuery} from '@tanstack/react-query';
import {invoiceAccountEmailItemsForAdminApi} from '^models/InvoiceAccount/api';
import {Paginated} from '^types/utils/paginated.dto';
import {EmailViewer} from './EmailViewer';
import {
    TargetPropertyTextItem,
    TargetPropertyMoneyItem,
    TargetPropertyDateItem,
    TargetPropertyNumberItem,
    TargetPropertyBooleanItem,
    TargetPropertyEnumItem,
} from './TargetPropertyItem';
import {EmailParserFormData} from './EmailParserFormData';

interface ParsingOCRSettingStepProps {}

export const ParsingOCRSettingStep = memo((props: ParsingOCRSettingStepProps) => {
    const {} = props;
    const form = useFormContext<{filterQuery: string; parserData: EmailParserFormData}>();
    const defaultValue = form.watch('filterQuery');
    const [filterQuery, setFilterQuery] = useState(FilterQuery.fromUrlParams(defaultValue || ''));
    const [params, setParams] = useState<FindAllGmailItemQueryDto>({
        relations: ['organization', 'invoiceAccount', 'invoiceAccount.googleTokenData'],
        page: 1,
        itemsPerPage: 200,
        order: {internalDate: 'DESC'},
        filterQuery: filterQuery.toUrlParams(),
    });

    const {data, refetch, isFetching} = useQuery({
        queryKey: ['ParsingOCRSettingStep', 'emailItems', params],
        queryFn: async () => invoiceAccountEmailItemsForAdminApi.index(params).then((res) => res.data),
        initialData: Paginated.init(),
        refetchOnMount: false,
        retryOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [html, setHtml] = useState<string>();

    const email = data.items[focusedIndex];

    useEffect(() => {
        email && email.loadContent().then(setHtml);
    }, [email]);

    return (
        <ContentPanel bodyWrap={false}>
            <ContentPanelHeading
                stickyHeader
                title={
                    <span onClick={() => console.log(form.getValues())}>
                        [4단계] 이메일로부터 값을 추출하는 방법을 구성합니다.
                    </span>
                }
            >
                <div className="ml-auto flex items-center gap-2">
                    <button
                        type="button"
                        className={`btn btn-white btn-xs no-animation btn-animation ${isFetching ? 'loading' : ''}`}
                        onClick={() => refetch()}
                    >
                        3단계 데이터 불러오기
                    </button>
                </div>
            </ContentPanelHeading>

            <ContentPanelBody>
                <ContentPanelList>
                    <div className="p-4 space-y-4 border-b border-gray-200">
                        {data.items.length > 0 ? (
                            <div className="flex items-center overflow-scroll no-scrollbar gap-3">
                                {data.items.map((emailItem, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className={`py-1 px-2 text-12 flex items-center gap-2 border border-gray-200 ${
                                                focusedIndex === i
                                                    ? 'bg-indigo-100 border-indigo-300'
                                                    : 'bg-white text-gray-500 hover:bg-gray-100 hover:border-gray-300'
                                            } rounded-full cursor-pointer transition-all`}
                                            onClick={() => setFocusedIndex(i)}
                                        >
                                            <div>{emailItem.mailId}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-gray-500 text-13">불러온 데이터가 없습니다.</div>
                        )}
                    </div>

                    {email && html && (
                        <div className="p-4 border-b border-gray-200 grid grid-cols-5">
                            <div className="col-span-2 border-r border-gray-200 pr-2">
                                <EmailViewer
                                    email={email}
                                    content={html}
                                    focusedIndex={focusedIndex}
                                    next={() => setFocusedIndex((i) => i + 1)}
                                    prev={() => setFocusedIndex((i) => i - 1)}
                                    pagination={data.pagination}
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
                                />
                                <TargetPropertyTextItem
                                    title="청구서 파일 주소"
                                    emailItem={email}
                                    content={html}
                                    defaultValue={form.getValues('parserData.invoiceUrlParser')}
                                    onChange={(value) => form.setValue('parserData.invoiceUrlParser', value)}
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
                                />
                                <TargetPropertyDateItem
                                    title="결제완료일시"
                                    emailItem={email}
                                    content={html}
                                    defaultValue={form.getValues('parserData.paidAtParser')}
                                    onChange={(value) => form.setValue('parserData.paidAtParser', value)}
                                />
                                <TargetPropertyTextItem
                                    title="워크스페이스명"
                                    emailItem={email}
                                    content={html}
                                    defaultValue={form.getValues('parserData.workspaceNameParser')}
                                    onChange={(value) => form.setValue('parserData.workspaceNameParser', value)}
                                    optional
                                />
                                <TargetPropertyTextItem
                                    title="플랜명"
                                    emailItem={email}
                                    content={html}
                                    defaultValue={form.getValues('parserData.planNameParser')}
                                    onChange={(value) => form.setValue('parserData.planNameParser', value)}
                                    optional
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
                    )}
                </ContentPanelList>
            </ContentPanelBody>
        </ContentPanel>
    );
});
ParsingOCRSettingStep.displayName = 'ParsingOCRSettingStep';
