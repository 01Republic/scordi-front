import {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {SubscriptionManager} from '^models/Subscription/manager';
import {subscriptionApi} from '^models/Subscription/api';
import {CardTablePanel} from '^admin/share';
import {SubscriptionItem} from '^admin/orgs/AdminOrgDetailPage/tabContents/SubscriptionListTabContent/SubscriptionItem';
import {useListPageSearchForm} from '^admin/share/list-page/use-list-page-search-form';
import {organizationAdminApi} from '^models/Organization/api';

export const SubscriptionListTabContent = memo(() => {
    const org = useRecoilValue(adminOrgDetail);
    const form = useListPageSearchForm(subscriptionApi.index);
    const {searchForm, onSearch, fetchData, SearchForm, SearchResultContainer, listPage} = form;
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
                <div></div>
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
                    gridClass="grid-cols-7"
                    entries={listPage.items}
                    ths={['name', 'billing', '인보이스 계정', '', 'created at', 'updated at', '']}
                    entryComponent={(subscription, i, arr) => (
                        <SubscriptionItem
                            subscription={subscription}
                            borderBottom={i + 1 < arr.length}
                            reload={() => onSearch({})}
                        />
                    )}
                />
            </SearchResultContainer>
        </div>
    );
});
