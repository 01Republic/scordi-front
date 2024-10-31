import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useSetRecoilState} from 'recoil';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {parseQueryValue} from '^utils/get-query-params';
import {DPaySecretCodePage} from '^clients/public/etc/DPaySecretCodePage';
import {secretCodeParamsAtom} from '^clients/public/etc/DPaySecretCodePage/atom';
import {useUnmount} from '^hooks/useUnmount';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {v3CommonRequires} from '^types/utils/18n.type';

export const DPaySecretCodePageRoute = pathRoute({
    pathname: '/direct-pay/[secretCode]',
    path: (secretCode: string) => pathReplace(DPaySecretCodePageRoute.pathname, {secretCode}),
});

export const getStaticPaths = async () => ({
    paths: [{params: {secretCode: 'secretCode'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        // Will be passed to the page component as props
        ...(await serverSideTranslations(locale, [
            ...v3CommonRequires, // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.
        ])),
    },
});

export default function Page() {
    const router = useRouter();
    const secretCode = parseQueryValue(router.query['secretCode']);
    const setSecretCode = useSetRecoilState(secretCodeParamsAtom);

    useEffect(() => {
        if (!router.isReady) return;
        if (!secretCode) return;

        setSecretCode(secretCode);
    }, [router.isReady, secretCode]);

    useUnmount(() => {
        setSecretCode('');
    }, []);

    if (!secretCode) return <></>;

    return <DPaySecretCodePage />;
}
