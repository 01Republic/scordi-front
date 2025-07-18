import {memo, useEffect, useState} from 'react';
import {toast} from 'react-hot-toast';
import {productApi} from '^models/Product/api';
import {AdminNewProductPageRoute} from '^pages/admin/products/new';
import {AdminProductSimilarNamesPageRoute} from '^pages/admin/products/similar';
import {AdminListPageLayout, AdminPageContainer} from '^admin/layouts';
import {CardTablePanel} from '^admin/share';
import {useListPageSearchForm} from '^admin/share/list-page/use-list-page-search-form';
import {ProductConnectMethod, ProductDto} from '^models/Product/type';
import {OutLink} from '^components/OutLink';
import {isValidUrl, truncate} from '^components/util/string';
import {LinkTo} from '^components/util/LinkTo';
import {DefaultColumn} from './columns/DefaultColumn';
import {ImageColumn, ThumbnailColumn} from './columns/ImageColumn';
import {MobileItem} from './columns/MobileItem';
import {ActionColumn} from './columns/ActionColumn';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {ProductSimilarNameConnectModal} from '^admin/products/AdminProductListPage/ProductSimilarNameConnectModal';

export const AdminProductListPage = memo(() => {
    const form = useListPageSearchForm(productApi.index);
    const {searchForm, onSearch, fetchData, SearchForm, SearchResultContainer, listPage} = form;
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        fetchData({order: {id: 'DESC'}});
    }, []);

    const togglePublishStatus = (product: ProductDto) => {
        const shouldPublish = product.connectMethod === ProductConnectMethod.PREPARE;
        toast('처리하는 중입니다.');
        const req = shouldPublish
            ? productApi.update(product.id, {connectMethod: ProductConnectMethod.AUTO})
            : productApi.update(product.id, {connectMethod: ProductConnectMethod.PREPARE});

        req.then(() => form.onSearch({}))
            .catch(() => toast.error('문제가 생겼어요. 새로고침 후 다시 시도해주세요 ㅠ'))
            .finally(() => toast.success(shouldPublish ? '공개!' : '비공개 했어요ㅠ'));
    };

    return (
        <AdminListPageLayout
            title="앱 목록"
            breadcrumbs={[{text: '앱 관리'}, {text: '앱 목록'}]}
            createPageRoute={AdminNewProductPageRoute.path()}
            Buttons={() => (
                <div className="flex items-center justify-end gap-2 mr-4 invisible">
                    <LinkTo
                        text="차단된 서비스 목록 보기"
                        href={AdminProductSimilarNamesPageRoute.path()}
                        className="btn btn-white no-animation btn-animation"
                    />
                </div>
            )}
        >
            <AdminPageContainer>
                <div className="flex items-center justify-between mb-5">
                    <button type="button" onClick={() => setIsOpened(true)} className="btn btn-sm btn-scordi">
                        발견된 앱 이름 연결하기
                    </button>
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
                            gridClass="grid-cols-1 lg:grid-cols-12"
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
                                    th: 'name',
                                    className: 'hidden lg:block col-span-3 text-14',
                                    render: (product) => (
                                        <DefaultColumn
                                            value={
                                                <div className="pr-2 flex items-center gap-1.5 group">
                                                    <div className="">
                                                        <TagUI className="bg-gray-200">{product.id}</TagUI>
                                                    </div>
                                                    <div className="flex group-hover:hidden flex-col items-start gap-0 text-12">
                                                        <div className="whitespace-nowrap">
                                                            <span>{product.name()}</span>
                                                        </div>
                                                    </div>
                                                    <div className="hidden group-hover:flex flex-col items-start gap-0 text-12">
                                                        <div className="whitespace-nowrap">
                                                            <span className="text-gray-400">EN | </span>
                                                            <span>{product.nameEn}</span>
                                                        </div>
                                                        <div className="whitespace-nowrap">
                                                            <span className="text-gray-400">KO | </span>
                                                            <span>{product.nameKo}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        />
                                    ),
                                },
                                {
                                    th: '로고',
                                    className: 'hidden lg:block text-14',
                                    render: (product) => <ImageColumn product={product} />,
                                },
                                {
                                    th: '썸네일',
                                    className: 'hidden lg:block text-14',
                                    render: (product) => <ThumbnailColumn product={product} />,
                                },
                                {
                                    th: 'category',
                                    className: 'hidden lg:block text-14 col-span-3',
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
                                    className: 'text-14',
                                    render: (product) => (
                                        <DefaultColumn
                                            value={
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox checkbox-sm checkbox-primary"
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
                                    className: 'hidden lg:block col-span-2 text-14',
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
                                    className: 'hidden lg:block text-14',
                                    render: (product) => <ActionColumn product={product} fetchData={fetchData} />,
                                },
                            ]}
                        />
                    </div>
                </SearchResultContainer>
            </AdminPageContainer>
            <ProductSimilarNameConnectModal isOpened={isOpened} onClose={() => setIsOpened(false)} />
        </AdminListPageLayout>
    );
});
