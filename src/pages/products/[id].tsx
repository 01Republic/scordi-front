import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {useRouter} from 'next/router';
import {atom, useSetRecoilState} from 'recoil';
import React, {useEffect} from 'react';
import {NextPageContext} from 'next';
import {ProductDto} from '^models/Product/type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {publicPageRequires} from '^types/utils/18n.type';
import {ProductDetailPage} from 'src/components/pages/products/ProductDetailPage';
import {productApi} from '^models/Product/api';

export const ProductDetailPageRoute = pathRoute({
    pathname: '/products/[id]',
    path: (id: number) => pathReplace(ProductDetailPageRoute.pathname, {id}),
});

export const isProductDetailPageLoadedAtom = atom({
    key: 'productDetailPage/isLoaded',
    default: false,
});

export default function ProductPage({product}: {product: ProductDto}) {
    const router = useRouter();
    const setIsLoaded = useSetRecoilState(isProductDetailPageLoadedAtom);

    useEffect(() => {
        if (!router.isReady) return;
        setIsLoaded(true);
    }, [router.isReady]);

    if (!product.id || isNaN(product.id)) return <></>;

    return <ProductDetailPage product={product} />;
}

// SSR 파트
export const getServerSideProps = async function ({req, query, locale}: NextPageContext) {
    const id = Number(query.id); // postId
    if (isNaN(id)) return;

    // 데이터 load api를 호출하여 post data load
    const product = await productApi.show(id);

    return {
        props: {
            product,
            // Will be passed to the page component as props
            ...(await serverSideTranslations(locale!, [
                ...publicPageRequires, // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.
            ])),
        },
    };
};
