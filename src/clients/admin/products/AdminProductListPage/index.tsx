import {memo, useEffect} from 'react';
import {productApi} from '^models/Product/api';
import {AdminNewProductPageRoute} from '^pages/admin/products/new';
import {AdminListPageLayout, AdminPageContainer} from '^admin/layouts';
import {CardTablePanel} from '^admin/share';
import {DefaultColumn} from './columns/DefaultColumn';
import {ImageColumn, ThumbnailColumn} from './columns/ImageColumn';
import {MobileItem} from './columns/MobileItem';
import {ActionColumn} from './columns/ActionColumn';
import {OutLink} from '^components/OutLink';
import {isValidUrl, truncate} from '^components/util/string';
import {useListPageSearchForm} from '^admin/share/list-page/use-list-page-search-form';
import {ProductConnectMethod, ProductDto} from '^models/Product/type';
import {useToast} from '^hooks/useToast';
import {Button} from '^components/util/form-control/inputs/ButtonGroupRadio/Button';
import {AdminProductSimilarNamesPageRoute} from '^pages/admin/products/similar';
import {useRouter} from 'next/router';

export const AdminProductListPage = memo(() => {
    const form = useListPageSearchForm(productApi.index);
    const {searchForm, onSearch, fetchData, SearchForm, SearchResultContainer, listPage} = form;
    const router = useRouter();
    const {toast} = useToast();

    useEffect(() => {
        fetchData({order: {id: 'DESC'}});
    }, []);

    const togglePublishStatus = (product: ProductDto) => {
        const shouldPublish = product.connectMethod === ProductConnectMethod.PREPARE;
        toast.basic('처리하는 중입니다.');
        const req = shouldPublish
            ? productApi.update(product.id, {connectMethod: ProductConnectMethod.AUTO})
            : productApi.update(product.id, {connectMethod: ProductConnectMethod.PREPARE});

        req.then(() => form.onSearch({}))
            .catch(() => toast.error('문제가 생겼어요. 새로고침 후 다시 시도해주세요 ㅠ'))
            .finally(() => toast.success(shouldPublish ? '공개!' : '비공개 했어요ㅠ'));
    };

    const onSimilarNamesButtonClick = () => router.push(AdminProductSimilarNamesPageRoute.path());

    return (
        <AdminListPageLayout
            title="앱 목록"
            breadcrumbs={[{text: '앱 관리'}, {text: '앱 목록'}]}
            createPageRoute={AdminNewProductPageRoute.path()}
        >
            <AdminPageContainer>
                <div className="flex items-center justify-between mb-5">
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
                <div className="flex justify-end mb-5 min-w-[25vw]">
                    <Button onClick={onSimilarNamesButtonClick}>
                        <span>차단된 서비스 목록 보기</span>
                    </Button>
                </div>
                <SearchResultContainer>
                    <div className="w-full">
                        <CardTablePanel
                            gridClass="grid-cols-1 lg:grid-cols-9"
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
                                    th: 'Id',
                                    className: 'hidden lg:block',
                                    render: (product) => <DefaultColumn value={<p>{product.id}</p>} />,
                                },
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
                                                    <span className="block whitespace-nowrap">{product.nameEn}</span>
                                                    <small className="block whitespace-nowrap text-gray-500">
                                                        ({product.nameKo})
                                                    </small>
                                                </p>
                                            }
                                        />
                                    ),
                                },
                                {
                                    th: 'category',
                                    className: 'hidden lg:block col-span-2',
                                    render: (product) => (
                                        <DefaultColumn
                                            value={product.tags ? product.tags.map((tag) => tag.name).join(', ') : ''}
                                        />
                                    ),
                                },
                                // {
                                //     th: '연결한 조직 수',
                                //     className: 'hidden lg:block',
                                //     render: (product) => <DefaultColumn value={product.connectedOrgCount} />,
                                // },
                                {
                                    th: '공개상태',
                                    className: '',
                                    render: (product) => (
                                        <DefaultColumn
                                            value={
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox"
                                                        readOnly={true}
                                                        checked={product.connectMethod != ProductConnectMethod.PREPARE}
                                                        onClick={() => togglePublishStatus(product)}
                                                    />
                                                </div>
                                            }
                                        />
                                    ),
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
                        />
                    </div>
                </SearchResultContainer>
            </AdminPageContainer>
        </AdminListPageLayout>
    );
});
