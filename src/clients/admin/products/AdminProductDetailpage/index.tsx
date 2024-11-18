import {AdminDetailPageLayout} from '^admin/layouts/DetailPageLayout';
import {AdminProductsPageRoute} from '^pages/admin/products';
import {Fragment, memo, useEffect} from 'react';
import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {ProductDto} from '^models/Product/type';
import {productApi} from '^models/Product/api';
import {ContentTabNav} from '^layouts/ContentLayout';
import {useCurrentUser} from '^models/User/hook';
import {AdminPageContainer} from '^admin/layouts';
import {EditProductDetail} from './MenuContents/EditProductDetail';
import {EditProductPost} from './MenuContents/EditProductPost';
import {ProductSubscriptionList} from './MenuContents/ProductSubscriptionList';
import {MergeProductMenu} from './MenuContents/MergeProductMenu';

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
    const {currentUser} = useCurrentUser();
    const locale = currentUser?.locale || 'ko';

    useEffect(() => {
        if (!productId || isNaN(productId)) return;
        productApi.show(productId).then((res) => setProduct(res.data));
    }, [productId]);

    const tabIndex = useRecoilValue(navTabIndex);
    const tabs = [
        {label: '정보', Component: EditProductDetail},
        // {label: '소개', Component: EditProductPost},
        {label: '구독 관리', Component: ProductSubscriptionList},
        {label: '크롤링 이력 조회', Component: Fragment},
        {label: '생성 관리', Component: MergeProductMenu},
        //
    ];
    const TabContentComponent = tabs[tabIndex]?.Component || Fragment;

    if (!product) return <>Prototype(id: #{productId}) Not Found.</>;
    const productName = locale === 'ko' ? product.nameKo : product.nameEn;

    return (
        <AdminDetailPageLayout
            title={`${productName} (#${product.id})`}
            breadcrumbs={[
                {text: '앱 관리'},
                {text: '앱 목록', href: AdminProductsPageRoute.path()},
                {text: `${productName} (#${product.id})`},
                //
            ]}
            tabNav={<ContentTabNav resetIndex={true} tabs={tabs.map((tab) => tab.label)} recoilState={navTabIndex} />}
        >
            <AdminPageContainer>
                <TabContentComponent />
            </AdminPageContainer>
        </AdminDetailPageLayout>
    );
});
