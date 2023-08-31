import {AdminDetailPageLayout} from '^components/pages/admin/layouts/DetailPageLayout';
import {AdminProductsPageRoute} from '^pages/admin/products';
import {Fragment, memo, useEffect} from 'react';
import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {ProductDto} from '^types/product.type';
import {productApi} from '^api/product.api';
import {ContentTabNav} from '^layouts/ContentLayout';
import {EditProductDetail} from '^components/pages/admin/products/AdminProductDetailpage/MenuContents/EditProductDetail';
import {EditProductPost} from '^components/pages/admin/products/AdminProductDetailpage/MenuContents/EditProductPost';

export const adminProductDetail = atom<ProductDto | null>({
    key: 'adminProductDetail',
    default: null,
});

export const navTabIndex = atom({
    key: 'adminProductDetailPage/NavTabIndex',
    default: 0,
});

export const AdminProductDetailPage = memo(() => {
    const router = useRouter();
    const productId = Number(router.query.id);
    const [product, setProduct] = useRecoilState(adminProductDetail);

    useEffect(() => {
        if (!productId || isNaN(productId)) return;
        productApi.show(productId).then((res) => setProduct(res.data));
    }, [productId]);

    const tabIndex = useRecoilValue(navTabIndex);
    const tabs = [
        {label: '정보', Component: EditProductDetail},
        {label: '소개', Component: EditProductPost},
        {label: '구독 관리', Component: Fragment},
        {label: '크롤링 이력 조회', Component: Fragment},
        //
    ];
    const TabContentComponent = tabs[tabIndex]?.Component || Fragment;

    if (!product) return <>Prototype(id: #{productId}) Not Found.</>;

    return (
        <AdminDetailPageLayout
            title={`${product.name} (#${product.id})`}
            breadcrumbs={[
                {text: '앱 관리'},
                {text: '앱 목록', href: AdminProductsPageRoute.path()},
                {text: `${product.name} (#${product.id})`},
                //
            ]}
            tabNav={<ContentTabNav resetIndex={true} tabs={tabs.map((tab) => tab.label)} recoilState={navTabIndex} />}
        >
            <div className="container pt-10 px-2 sm:px-4">
                <TabContentComponent />
            </div>
        </AdminDetailPageLayout>
    );
});
