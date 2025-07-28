import React, {memo, useState} from 'react';
import {RotateCw} from 'lucide-react';
import {useQuery} from '@tanstack/react-query';
import {invoiceAccountEmailItemsForAdminApi} from '^models/InvoiceAccount/api';
import {FindAllGmailItemQueryDto} from '^models/InvoiceAccount/type';
import {Paginated} from '^types/utils/paginated.dto';
import {FilterBuilder, FilterQuery, FilterType, PropertyDefinition} from '^lib/notion-like-filter';
import {ContentPanel, ContentPanelList} from '^layouts/ContentLayout';
import {GmailItemResultTable} from './GmailItemResultTable';

interface ServiceDetectStepProps {
    defaultValue?: string;
    onChange: (filterQuery: string) => any;
}

export const ServiceDetectStep = memo((props: ServiceDetectStepProps) => {
    const {defaultValue, onChange} = props;

    const [filterQuery, setFilterQuery] = useState(FilterQuery.fromUrlParams(defaultValue || ''));

    const [qId, setQId] = useState(0);
    const [params, setParams] = useState<FindAllGmailItemQueryDto>({
        relations: ['organization', 'invoiceAccount', 'invoiceAccount.googleTokenData'],
        page: 1,
        itemsPerPage: 200,
        order: {internalDate: 'DESC'},
        filterQuery: filterQuery.toUrlParams(),
    });

    const {data, refetch, isFetching} = useQuery({
        queryKey: ['ServiceDetectStep', 'emailItems', params, qId],
        queryFn: async () => invoiceAccountEmailItemsForAdminApi.index(params).then((res) => res.data),
        initialData: Paginated.init(),
        // refetchOnMount: false,
        // retryOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });

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
                        isDirty={defaultValue !== params.filterQuery}
                        onSubmit={(query) => onChange(query.toUrlParams())}
                    >
                        <div className="ml-auto flex items-center gap-4">
                            <button type="button" className="btn btn-sm btn-circle btn-ghost" onClick={() => refetch()}>
                                <RotateCw />
                            </button>
                        </div>
                    </FilterBuilder>

                    <GmailItemResultTable data={data} isFetching={isFetching} setParams={setParams} />
                </div>
            </ContentPanelList>
        </ContentPanel>
    );
});
