import React, {memo, useEffect, useState} from 'react';
import {Play, RotateCw} from 'lucide-react';
import {useQuery} from '@tanstack/react-query';
import {invoiceAccountEmailItemsForAdminApi} from '^models/InvoiceAccount/api';
import {FindAllGmailItemQueryDto, GmailItemDto} from '^models/InvoiceAccount/type';
import {Paginated} from '^types/utils/paginated.dto';
import {FilterBuilder, FilterQuery, FilterType, PropertyDefinition} from '^lib/notion-like-filter';
import {ContentPanel, ContentPanelList} from '^layouts/ContentLayout';
import {GmailItemResultTable} from './GmailItemResultTable';
import {useForm, useFormContext} from 'react-hook-form';

interface Props {
    defaultValue?: string;
    onChange?: (value: string) => any;
}

// 3단계
export const ServiceDetectStep = memo((props: Props) => {
    const {defaultValue, onChange} = props;
    // const form = useForm<{filterQuery: string}>({
    //     defaultValues: {filterQuery: defaultValue},
    // });
    const [filterQuery, setFilterQuery] = useState(FilterQuery.fromUrlParams(''));
    const [isTableShow, setIsTableShow] = useState(true);

    const [qId, setQId] = useState(0);
    const [params, setParams] = useState<FindAllGmailItemQueryDto>({
        relations: ['organization', 'invoiceAccount', 'invoiceAccount.googleTokenData'],
        page: 1,
        itemsPerPage: 200,
        order: {internalDate: 'DESC'},
        // filterQuery: filterQuery.toUrlParams(),
    });

    const {data, refetch, isFetching} = useQuery({
        queryKey: ['ServiceDetectStep', 'emailItems', params, qId],
        queryFn: async () => invoiceAccountEmailItemsForAdminApi.index(params).then((res) => res.data),
        initialData: Paginated.init(),
        refetchOnMount: false,
        retryOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });

    const isDirty = defaultValue !== params.filterQuery;

    const next = () => {
        setIsTableShow(false);
        params.filterQuery && onChange && onChange(params.filterQuery);
    };

    const setFilterParam = (query: FilterQuery) => {
        setParams((p) => ({...p, filterQuery: query.toUrlParams()}));
    };

    // 수정페이지에서, 파서에 저장되어있던 값을 받아 상태 셋업
    useEffect(() => {
        if (!defaultValue) return;
        const query = FilterQuery.fromUrlParams(defaultValue);
        if (filterQuery.isEmpty() && !query.isEmpty()) setFilterQuery(query);
    }, [defaultValue]);

    useEffect(() => {
        const empty = FilterQuery.fromUrlParams('');
        if (empty.toUrlParams() === filterQuery.toUrlParams()) return;
        setFilterParam(filterQuery);
    }, [filterQuery.toUrlParams()]);

    return (
        <ContentPanel title="[3단계] 이메일 내역에서 위 서비스의 메일만 추출하는 조건을 설정합니다." stickyHeader>
            <ContentPanelList>
                <div className="p-4 space-y-4">
                    <FilterBuilder
                        filterQuery={filterQuery}
                        onFilterChange={setFilterQuery}
                        availableProperties={[
                            new PropertyDefinition('title', '메일 제목', FilterType.TEXT),
                            new PropertyDefinition('from', '발신 이메일', FilterType.TEXT),
                            new PropertyDefinition('snippet', '스니펫', FilterType.TEXT),
                            new PropertyDefinition('isAttached', '첨부파일유무', FilterType.BOOLEAN, ['있음', '없음']),
                            // new PropertyDefinition('isCompleted', '완료여부', FilterType.BOOLEAN),
                        ]}
                        onChange={(query) => {
                            const filterQuery = query.toUrlParams();
                            setParams((p) => ({...p, filterQuery}));
                            setQId((v) => v + 1);
                        }}
                        isDirty={isDirty}
                        // onSubmit={(query) => form.setValue('filterQuery', query.toUrlParams())}
                    >
                        <div className="ml-auto flex items-center gap-4">
                            {isDirty && (
                                <button type="button" className="btn btn-sm btn-white gap-2" onClick={() => next()}>
                                    <Play />
                                    <span>다음 단계로</span>
                                </button>
                            )}

                            <button
                                type="button"
                                className="btn btn-sm btn-circle btn-ghost"
                                onClick={() => {
                                    refetch();
                                    setIsTableShow(true);
                                }}
                            >
                                <RotateCw />
                            </button>

                            <button type="button" className="link text-12" onClick={() => setIsTableShow((v) => !v)}>
                                테이블 {isTableShow ? '숨김' : '보기'}
                            </button>
                        </div>
                    </FilterBuilder>

                    {isTableShow && <GmailItemResultTable data={data} isFetching={isFetching} setParams={setParams} />}
                </div>
            </ContentPanelList>
        </ContentPanel>
    );
});
