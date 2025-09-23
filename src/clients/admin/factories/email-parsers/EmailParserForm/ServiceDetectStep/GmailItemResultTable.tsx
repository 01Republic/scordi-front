import {InvoiceAccountProfileCompact} from '^models/InvoiceAccount/components';
import {FindAllGmailItemQueryDto, GmailItemDto, InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {OrganizationDto} from '^models/Organization/type';
import React, {Dispatch, memo, SetStateAction, useState} from 'react';
import {Paginated} from '^types/utils/paginated.dto';
import {useKeyPressIn} from '^hooks/useEventListener';
import {ListTablePaginator} from '^_components/table/ListTable';
import {LoadableBox} from '^components/util/loading';
import {PagePerSelect, Paginator} from '^components/Paginator';
import {SelectedResource} from '../SelectedResource';
import {GmailItemRow} from './GmailItemRow';
import {PageReport} from './PageReport';

interface GmailItemResultTableProps {
    data: Paginated<GmailItemDto>;
    isFetching: boolean;
    setParams: Dispatch<SetStateAction<FindAllGmailItemQueryDto>>;
}

export const GmailItemResultTable = memo((props: GmailItemResultTableProps) => {
    const {data, isFetching, setParams} = props;
    const [showInfo, setShowInfo] = useState(true);
    const [selectedInvoiceAccount, setSelectedInvoiceAccount] = useState<InvoiceAccountDto>();
    const [selectedOrg, setSelectedOrg] = useState<OrganizationDto>();

    useKeyPressIn({
        deps: [data.items.length, isFetching],
        activated: (evt) => evt.altKey,
        listener: [() => setShowInfo(true), () => setShowInfo(false)],
        enable: data.items.length > 0 && !isFetching,
    });

    const {pagination, items} = data;

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
        <>
            <div className="flex items-center justify-between text-14">
                <div className="flex items-center gap-4">
                    <PageReport pagination={pagination} />

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
                    <SelectedResource name="조직" onDismiss={() => selectOrg(undefined)}>
                        <div className="flex items-center gap-1">
                            <span className="badge badge-xs">{selectedOrg.id}</span>
                            <span>{selectedOrg.name}</span>
                        </div>
                    </SelectedResource>
                )}

                {selectedInvoiceAccount && (
                    <SelectedResource name="계정" onDismiss={() => selectInvoiceAccount(undefined)}>
                        <InvoiceAccountProfileCompact invoiceAccount={selectedInvoiceAccount} />
                    </SelectedResource>
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
                <PageReport pagination={pagination} />

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
        </>
    );
});
GmailItemResultTable.displayName = 'GmailItemResultTable';
