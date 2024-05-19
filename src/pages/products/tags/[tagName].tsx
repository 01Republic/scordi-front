import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useSetRecoilState} from 'recoil';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {publicPageRequires} from '^types/utils/18n.type';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {ProductListPage} from '^clients/public/products/ProductListPage';
import {currentProductCategoryAtom} from '^clients/public/products/ProductListPage/useProductCategoryFeature';
import Head from 'next/head';
import {ProductListPageRoute} from '^pages/products';

export const ProductsOnTagPageRoute = pathRoute({
    pathname: '/products/tags/[tagName]',
    path: (tagName: string) =>
        pathReplace(ProductsOnTagPageRoute.pathname, {
            tagName,
        }),
});

export const getStaticPaths = async () => ({
    paths: [{params: {tagName: 'all'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        // Will be passed to the page component as props
        ...(await serverSideTranslations(locale, [
            ...publicPageRequires, // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.
        ])),
    },
});

export default function ProductsOnTagPage() {
    const router = useRouter();
    const tagName = router.query.tagName as string | undefined;
    console.log('tagName', tagName);
    const setCurrentCategory = useSetRecoilState(currentProductCategoryAtom);

    useEffect(() => {
        if (tagName) setCurrentCategory(tagName);
    }, [tagName]);

    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    key="canonical"
                    href={tagName ? ProductsOnTagPageRoute.url(tagName) : ProductListPageRoute.url()}
                />
            </Head>
            <ProductListPage />
        </>
    );
}
