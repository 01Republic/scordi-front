import React, {memo, useState} from 'react';
import {FilterBuilder, FilterQuery, FilterType, PropertyDefinition} from '^lib/notion-like-filter';
import {ContentPanel, ContentPanelList} from '^layouts/ContentLayout';
import {useQuery} from '@tanstack/react-query';
import {invoiceAccountEmailItemsForAdminApi} from '^models/InvoiceAccount/api';
import {FindAllGmailItemQueryDto, InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {Paginated} from '^types/utils/paginated.dto';
import {GmailItemRow} from '^admin/factories/email-parsers/EmailParserNewPage/ServiceDetectStep/GmailItemRow';
import {LoadableBox} from '^components/util/loading';
import {RotateCw, X} from 'lucide-react';
import {ListTablePaginator} from '^_components/table/ListTable';
import {PagePerSelect, Paginator} from '^components/Paginator';
import {useKeyPressIn} from '^hooks/useEventListener';
import {InvoiceAccountProfileCompact} from '^models/InvoiceAccount/components';
import {OrganizationDto} from '^models/Organization/type';

interface ServiceDetectStepProps {
    //
}

export const ServiceDetectStep = memo((props: ServiceDetectStepProps) => {
    const {} = props;
    const [params, setParams] = useState<FindAllGmailItemQueryDto>({
        relations: ['organization', 'invoiceAccount', 'invoiceAccount.googleTokenData'],
        page: 1,
        itemsPerPage: 200,
        order: {internalDate: 'DESC'},
    });
    const {data, refetch, isFetching} = useQuery({
        queryKey: ['ServiceDetectStep', 'emailItems', params],
        queryFn: async () => invoiceAccountEmailItemsForAdminApi.index(params).then((res) => res.data),
        initialData: Paginated.init(),
        // refetchOnMount: false,
        // retryOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });

    const [filterQuery, setFilterQuery] = useState(new FilterQuery());
    const [showInfo, setShowInfo] = useState(false);
    const [selectedInvoiceAccount, setSelectedInvoiceAccount] = useState<InvoiceAccountDto>();
    const [selectedOrg, setSelectedOrg] = useState<OrganizationDto>();

    const {pagination, items} = data;

    useKeyPressIn({
        deps: [data.items.length, isFetching],
        activated: (evt) => evt.altKey,
        listener: [() => setShowInfo(true), () => setShowInfo(false)],
        enable: data.items.length > 0 && !isFetching,
    });

    const selectInvoiceAccount = (invoiceAccount?: InvoiceAccountDto) => {
        setSelectedInvoiceAccount(invoiceAccount);
        setParams((p) => ({...p, page: 1, where: {...p.where, invoiceAccountId: invoiceAccount?.id}}));
    };

    const selectOrg = (org?: OrganizationDto) => {
        setSelectedOrg(org);
        setSelectedInvoiceAccount(undefined);
        setParams((p) => ({...p, page: 1, where: {...p.where, organizationId: org?.id, invoiceAccountId: undefined}}));
    };

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
                        onSubmit={(query) => {
                            const json = query.toJSON();
                            const v = JSON.stringify(json);
                            console.log(v);
                            setParams((p) => ({...p, filterQuery: encodeURIComponent(v)}));
                        }}
                    >
                        <div className="ml-auto flex items-center gap-4">
                            <button type="button" className="btn btn-sm btn-circle btn-ghost" onClick={() => refetch()}>
                                <RotateCw />
                            </button>
                        </div>
                    </FilterBuilder>

                    <div className="flex items-center justify-between text-14">
                        <div className="flex items-center gap-4">
                            <div>
                                총 {pagination.totalItemCount.toLocaleString()}개의 결과,{' '}
                                {pagination.totalPage.toLocaleString()}p 중 {pagination.currentPage.toLocaleString()}p
                            </div>

                            <div>
                                <div className="form-control">
                                    <label className="cursor-pointer label">
                                        <span className="label-text mr-2">조직/계정 정보 함께보기</span>
                                        <input
                                            type="checkbox"
                                            className="toggle toggle-primary toggle-sm"
                                            defaultChecked={showInfo}
                                            onChange={(e) => setShowInfo(e.target.checked)}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <ListTablePaginator
                            pagination={pagination}
                            movePage={(page) => setParams((p) => ({...p, page}))}
                            onChangePerPage={(itemsPerPage) => setParams((p) => ({...p, page: 1, itemsPerPage}))}
                            unit="건"
                            options={[10, 20, 50, 100, 200, 500]}
                        />
                    </div>

                    <div className="flex items-center gap-8">
                        {selectedOrg && (
                            <div className="flex items-center gap-2 text-12 text-gray-500">
                                <span>선택된 조직: </span>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <span className="badge badge-xs">{selectedOrg.id}</span>
                                        <span>{selectedOrg.name}</span>
                                    </div>
                                    <X
                                        className="cursor-pointer text-gray-400 hover:text-gray-600 transition-all"
                                        onClick={() => selectOrg(undefined)}
                                    />
                                </div>
                            </div>
                        )}

                        {selectedInvoiceAccount && (
                            <div className="flex items-center gap-2 text-12 text-gray-500">
                                <span>선택된 계정: </span>
                                <div className="flex items-center gap-2 cursor-default">
                                    <InvoiceAccountProfileCompact invoiceAccount={selectedInvoiceAccount} />
                                    <X
                                        className="cursor-pointer text-gray-400 hover:text-gray-600 transition-all"
                                        onClick={() => selectInvoiceAccount(undefined)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <LoadableBox isLoading={isFetching} loadingType={2} noPadding>
                        <div className="space-y-1.5">
                            <div className="grid grid-cols-24 gap-2 text-12 items-center bg-gray-600 text-white font-semibold h-[24px] -mx-2 px-2 rounded-md">
                                {showInfo && <div className="col-span-3">조직(워크스페이스)</div>}
                                {showInfo && <div className="col-span-3">계정</div>}
                                <div className="col-span-4">보낸이</div>
                                <div className={`${showInfo ? 'col-span-11' : 'col-span-17'}`}>제목</div>
                                <div className="col-span-2 text-right">받은시각</div>
                                <div className="col-span-1">기타</div>
                            </div>

                            {items.map((item) => (
                                <GmailItemRow
                                    item={item}
                                    key={item.id}
                                    showInfo={showInfo}
                                    onSelectOrg={selectOrg}
                                    onSelectInvoiceAccount={selectInvoiceAccount}
                                />
                            ))}
                        </div>
                    </LoadableBox>

                    <div className="flex items-center justify-between text-14">
                        <div>
                            총 {pagination.totalItemCount.toLocaleString()}개의 결과,{' '}
                            {pagination.totalPage.toLocaleString()}p 중 {pagination.currentPage.toLocaleString()}p
                        </div>

                        <Paginator
                            className="scale-[0.7]"
                            currentPage={pagination.currentPage}
                            totalPage={pagination.totalPage}
                            onClick={(page) => setParams((p) => ({...p, page}))}
                        />

                        <PagePerSelect
                            className="select-sm"
                            defaultValue={pagination.itemsPerPage}
                            changePageSize={(itemsPerPage) => setParams((p) => ({...p, page: 1, itemsPerPage}))}
                            perValues={[10, 20, 50, 100, 200, 500]}
                        />
                    </div>
                </div>
            </ContentPanelList>
        </ContentPanel>
    );
});
