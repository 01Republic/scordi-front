import {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {SubscriptionManager} from '^models/Subscription/manager';
import {subscriptionApi} from '^models/Subscription/api';
import {CardTablePanel} from '^admin/share';
import {SubscriptionItem} from '^admin/orgs/AdminOrgDetailPage/tabContents/SubscriptionListTabContent/SubscriptionItem';
import {useListPageSearchForm} from '^admin/share/list-page/use-list-page-search-form';
import {organizationAdminApi} from '^models/Organization/api';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';

export const SubscriptionListTabContent = memo(() => {
    const org = useRecoilValue(adminOrgDetail);
    const form = useListPageSearchForm(subscriptionApi.index);
    const {searchForm, onSearch, fetchData, SearchForm, SearchResultContainer, listPage} = form;
    const [isConnectStatusView, setIsConnectStatusView] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!org) return;

        setIsLoading(true);
        fetchData({
            relations: ['product', 'invoiceAccounts'],
            where: {organizationId: org.id},
            order: {id: 'DESC'},
            // itemsPerPage: 0,
        }).finally(() => setIsLoading(false));

        // req.then((res) => {
        //     setManager(SubscriptionManager.init(res.data.items));
        // });
    }, [org]);

    if (!org) return <></>;
    if (isLoading) return <>loading...</>;

    return (
        <div className="w-full">
            <h2 className="mb-6">
                {listPage.pagination.totalItemCount}
                <small>개의 구독이 등록되어 있습니다.</small>
            </h2>

            <div className="flex items-center justify-between mb-10">
                <div>
                    <ButtonGroupRadio
                        buttonClass="btn-xs !text-12 !rounded-md"
                        defaultValue={isConnectStatusView}
                        onChange={(selected) => setIsConnectStatusView(selected.value)}
                        options={[
                            {label: '기본 보기', value: false},
                            {label: '연결 보기', value: true},
                        ]}
                    />
                </div>
                <div className="min-w-[25vw]">
                    <SearchForm
                        searchForm={searchForm}
                        onSearch={onSearch}
                        registerName="keyword"
                        placeholder="Type here"
                        className="input input-bordered w-full"
                    />
                </div>
            </div>

            <SearchResultContainer>
                <CardTablePanel
                    gridClass="grid-cols-12"
                    className="text-14"
                    entries={listPage.items}
                    ths={[
                        <div>ID</div>,
                        <div className="col-span-2">앱</div>,
                        ...(isConnectStatusView
                            ? [
                                  <div className="col-span-2">결제수단(계좌)</div>,
                                  <div className="col-span-2">결제수단</div>,
                                  <div className="col-span-2">청구서 계정</div>,
                                  <div>등록일시</div>,
                                  <div>수정일시</div>,
                              ]
                            : [
                                  <div className="">상태</div>,
                                  <div className="">결제주기</div>,
                                  <div className="text-right">결제금액</div>,
                                  <div className="text-right">갱신일</div>,
                                  <div className="text-center">사용인원</div>,
                                  <div className="col-span-2">비고</div>,
                                  <div>등록일시</div>,
                              ]),
                        <div></div>,
                    ]}
                    entryTrWrap
                    entryComponent={(subscription) => (
                        <SubscriptionItem
                            subscription={subscription}
                            reload={() => onSearch({})}
                            isConnectStatusView={isConnectStatusView}
                        />
                    )}
                />
            </SearchResultContainer>
        </div>
    );
});
