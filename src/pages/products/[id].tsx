import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {useRouter} from 'next/router';
import {useSetRecoilState} from 'recoil';
import React, {useEffect} from 'react';
import {NextPageContext} from 'next';
import {applicationPrototypeApi} from '^api/applicationPrototype.api';
import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {v3CommonRequires} from '^types/utils/18n.type';
import {isPageLoadedAtom} from '^pages/posts/[id]';
import {ProductDetailPage} from 'src/components/pages/products/ProductDetailPage';

export const ProductDetailPageRoute = pathRoute({
    pathname: '/products/[id]',
    path: (id: number) => pathReplace(ProductDetailPageRoute.pathname, {id}),
});

export default function ProductPage({prototype}: {prototype: ApplicationPrototypeDto}) {
    const router = useRouter();
    const setIsLoaded = useSetRecoilState(isPageLoadedAtom);

    useEffect(() => {
        if (!router.isReady) return;
        setIsLoaded(true);
    }, [router.isReady]);

    return <ProductDetailPage prototype={prototype} />;
}

// SSR 파트
export const getServerSideProps = async function ({req, query, locale}: NextPageContext) {
    const id = Number(query.id); // postId

    // 데이터 load api를 호출하여 post data load
    const prototype = await applicationPrototypeApi.show(id).then((res) => res.data);

    return {
        props: {
            prototype,
            // Will be passed to the page component as props
            ...(await serverSideTranslations(locale!, [
                ...v3CommonRequires, // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.
            ])),
        },
    };
};
