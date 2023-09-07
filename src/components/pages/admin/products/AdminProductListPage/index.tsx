import {memo, useEffect, useState} from 'react';
import {ProductDto, FindAllProductQuery} from '^types/product.type';
import {Paginated} from '^types/utils/paginated.dto';
import {AdminListPageLayout} from '^components/pages/admin/layouts/ListPageLayout';
import {CardTablePanel} from '^components/pages/admin/share/panels/CardTablePanel';
import {productApi} from '^api/product.api';
import {AdminNewProductPageRoute} from '^pages/admin/products/new';
import {DefaultColumn} from '^components/pages/admin/products/AdminProductListPage/columns/DefaultColumn';
import {ImageColumn} from '^components/pages/admin/products/AdminProductListPage/columns/ImageColumn';
import {MobileItem} from '^components/pages/admin/products/AdminProductListPage/columns/MobileItem';
import {ActionColumn} from '^components/pages/admin/products/AdminProductListPage/columns/ActionColumn';

export const AdminProductListPage = memo(() => {
    const [listPage, setListPage] = useState<Paginated<ProductDto>>({
        items: [],
        pagination: {
            totalItemCount: 0,
            currentItemCount: 0,
            totalPage: 0,
            currentPage: 0,
            itemsPerPage: 0,
        },
    });

    const fetchData = (params: FindAllProductQuery) => {
        params.order = {id: 'DESC'};
        productApi.index(params).then((res) => setListPage(res.data));
    };

    useEffect(() => {
        fetchData({});
    }, []);

    return (
        <AdminListPageLayout
            title="앱 목록"
            breadcrumbs={[
                {text: '앱 관리'},
                {text: '앱 목록'},
                //
            ]}
            createPageRoute={AdminNewProductPageRoute.path()}
            //
        >
            <div className="container pt-10 px-2 sm:px-8">
                <div className="w-full">
                    <CardTablePanel
                        gridClass="grid-cols-1 lg:grid-cols-8"
                        entries={listPage.items}
                        columns={[
                            // XS
                            {
                                th: '',
                                className: 'block lg:hidden',
                                render: (product) => <MobileItem product={product} fetchData={fetchData} />,
                            },

                            // LG
                            {
                                th: '',
                                className: 'hidden lg:block',
                                render: (product) => <ImageColumn product={product} />,
                            },
                            {
                                th: 'name',
                                className: 'hidden lg:block',
                                render: (product) => <DefaultColumn value={product.nameEn} />,
                            },
                            {
                                th: 'category',
                                className: 'hidden lg:block',
                                render: (product) => (
                                    <DefaultColumn
                                        value={product.tags ? product.tags.map((tag) => tag.name).join(', ') : ''}
                                    />
                                ),
                            },
                            {
                                th: 'summary',
                                className: 'hidden lg:block',
                                render: (product) => <DefaultColumn value={product.tagline} />,
                            },
                            {
                                th: 'homepage',
                                className: 'hidden lg:block',
                                render: (product) => <DefaultColumn value={product.homepageUrl} />,
                            },
                            {
                                th: '',
                                className: 'hidden lg:block',
                                render: (product) => <ActionColumn product={product} fetchData={fetchData} />,
                            },
                        ]}
                        pagination={listPage.pagination}
                        pageMove={(page) => fetchData({page})}
                    />
                </div>
            </div>
        </AdminListPageLayout>
    );
});
