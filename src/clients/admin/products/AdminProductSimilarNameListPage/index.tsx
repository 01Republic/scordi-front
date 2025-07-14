import {memo, useEffect} from 'react';
import {AdminListPageLayout, AdminPageContainer} from '^admin/layouts';
import {productSimilarNameApi} from '^models/ProductSimilarName/api';
import {useListPageSearchForm} from '^admin/share/list-page/use-list-page-search-form';
import {useToast} from '^hooks/useToast';
import {CardTablePanel} from '^admin/share';
import {DefaultColumn} from '^admin/products/AdminProductListPage/columns/DefaultColumn';
import {useRouter} from 'next/router';
import {AdminProductPageRoute} from '^pages/admin/products/[id]';
import {ActionColumn} from '^admin/products/AdminProductSimilarNameListPage/ActionColumn';

export const ProductSimilarNameListPage = memo(() => {
    const form = useListPageSearchForm(productSimilarNameApi.index);
    const {searchForm, onSearch, fetchData, SearchForm, SearchResultContainer, listPage} = form;
    const router = useRouter();
    const {toast} = useToast();

    useEffect(() => {
        fetchData({order: {id: 'DESC'}});
    }, []);

    return (
        <AdminListPageLayout title="차단된 서비스명 목록">
            <AdminPageContainer>
                <div className="flex items-center justify-between mb-10">
                    <div></div>
                    <div className="min-w-[25vw]">
                        <SearchForm
                            searchForm={searchForm}
                            onSearch={onSearch}
                            registerName="keyword"
                            placeholder="이름으로 검색하기"
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>
                <SearchResultContainer>
                    <div className="w-full">
                        <CardTablePanel
                            gridClass="grid-cols-1 lg:grid-cols-5"
                            entries={listPage.items}
                            columns={[
                                {
                                    th: 'Id',
                                    className: 'hidden lg:block',
                                    render: (similar) => <DefaultColumn value={<p>{similar.id}</p>} />,
                                },
                                {
                                    th: '차단된 이름',
                                    className: 'hidden lg:block',
                                    render: (similar) => (
                                        <DefaultColumn
                                            value={
                                                <p>
                                                    <span className="block whitespace-nowrap">{similar.name}</span>
                                                </p>
                                            }
                                        />
                                    ),
                                },
                                {
                                    th: '연결된 서비스',
                                    className: 'hidden lg:block',
                                    render: (similar) => (
                                        <DefaultColumn
                                            value={
                                                <div
                                                    onClick={() => {
                                                        similar.product &&
                                                            router.push(AdminProductPageRoute.path(similar.product.id));
                                                    }}
                                                >
                                                    <p>
                                                        <span className="block whitespace-nowrap">
                                                            {similar.product?.nameEn ?? ''}
                                                        </span>
                                                    </p>
                                                </div>
                                            }
                                        />
                                    ),
                                },
                                {
                                    th: 'TO DO',
                                    className: 'hidden lg:block',
                                    render: (similar) => (
                                        <ActionColumn productSimilarName={similar} fetchData={fetchData} />
                                    ),
                                },
                            ]}
                        ></CardTablePanel>
                    </div>
                </SearchResultContainer>
            </AdminPageContainer>
        </AdminListPageLayout>
    );
});
