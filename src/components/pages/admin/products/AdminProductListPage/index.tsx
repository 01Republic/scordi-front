import {memo, useEffect, useState} from 'react';
import {ProductDto, FindAllProductQuery} from '^types/product.type';
import {Paginated} from '^types/utils/paginated.dto';
import {productApi} from '^api/product.api';
import {AdminNewProductPageRoute} from '^pages/admin/products/new';
import {AdminListPageLayout} from '^admin/layouts';
import {CardTablePanel} from '^admin/share';
import {DefaultColumn} from './columns/DefaultColumn';
import {ImageColumn, ThumbnailColumn} from './columns/ImageColumn';
import {MobileItem} from './columns/MobileItem';
import {ActionColumn} from './columns/ActionColumn';
import {OutLink} from '^components/OutLink';
import {isValidUrl, truncate} from '^components/util/string';

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
            breadcrumbs={[{text: '앱 관리'}, {text: '앱 목록'}]}
            createPageRoute={AdminNewProductPageRoute.path()}
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
                                th: '로고(image)',
                                className: 'hidden lg:block',
                                render: (product) => <ImageColumn product={product} />,
                            },
                            {
                                th: '썸네일(og:img)',
                                className: 'hidden lg:block',
                                render: (product) => <ThumbnailColumn product={product} />,
                            },
                            {
                                th: 'name',
                                className: 'hidden lg:block',
                                render: (product) => (
                                    <DefaultColumn
                                        value={
                                            <p>
                                                {product.nameEn}{' '}
                                                <small className="text-gray-500">({product.nameKo})</small>
                                            </p>
                                        }
                                    />
                                ),
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
                                className: 'hidden lg:block col-span-2',
                                render: (product) => <DefaultColumn value={product.tagline} />,
                            },
                            {
                                th: 'homepage',
                                className: 'hidden lg:block',
                                render: (product) => (
                                    <OutLink
                                        href={product.homepageUrl}
                                        text={
                                            isValidUrl(product.homepageUrl)
                                                ? truncate(new URL(product.homepageUrl).host, 20)
                                                : product.homepageUrl
                                        }
                                    />
                                ),
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
