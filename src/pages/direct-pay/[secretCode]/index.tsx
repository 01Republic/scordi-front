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
import {NextPageContext} from 'next';
import {useDPayPlanList} from '^clients/public/etc/DPaySecretCodePage/hook';
import {scordiPlanApi} from '^models/_scordi/ScordiPlan/api';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {plainToInstance} from 'class-transformer';

export const DPaySecretCodePageRoute = pathRoute({
    pathname: '/direct-pay/[secretCode]',
    path: (secretCode: string) => pathReplace(DPaySecretCodePageRoute.pathname, {secretCode}),
});

export default function Page({secretCode, plans}: {secretCode: string; plans: ScordiPlanDto[]}) {
    const router = useRouter();
    // const secretCode = parseQueryValue(router.query['secretCode']);
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

    return <DPaySecretCodePage plans={plainToInstance(ScordiPlanDto, plans || [])} />;
}

// SSR 파트
export const getServerSideProps = async ({req, query, locale}: NextPageContext) => {
    const secretCode = parseQueryValue(query.secretCode);
    if (!secretCode) return;

    const plans = await scordiPlanApi
        .index({
            where: {secretCode, isActive: true},
            itemsPerPage: 0,
        })
        .then((res) => res.data || []);

    return {
        props: {
            secretCode,
            plans: JSON.parse(JSON.stringify(plans)),
            // Will be passed to the page component as props
            ...(await serverSideTranslations(locale!, [
                ...v3CommonRequires, // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.
            ])),
        },
    };
};
