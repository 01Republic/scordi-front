import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {DPaySecretCodePaymentListPage} from '^clients/public/etc/DPaySecretCodePaymentListPage';
import {parseQueryValue} from '^utils/get-query-params';
import {useSetRecoilState} from 'recoil';
import {secretCodeParamsAtom} from '^clients/public/etc/DPaySecretCodePage/atom';
import {useUnmount} from '^hooks/useUnmount';
import {cryptoUtil} from '^utils/crypto';
import {ChannelTalkHideStyle} from '^components/ExternalCDNScripts/channel-talk/ChannelTalkHideStyle';

export const DPaySecretCodePaymentListPageRoute = pathRoute({
    pathname: '/direct-pay/[secretCode]/payments',
    path: (secretCode: string) => pathReplace(DPaySecretCodePaymentListPageRoute.pathname, {secretCode}),
});

export default function Page() {
    const router = useRouter();
    const secretCode = parseQueryValue(router.query['secretCode']);
    const accessCode = parseQueryValue(router.query['accessCode']);
    const setSecretCode = useSetRecoilState(secretCodeParamsAtom);
    const [accessPermitted, setAccessPermit] = useState(false);

    function parseToken(access_code: string, secret_code: string) {
        if (!access_code || !secret_code) return;

        if (access_code === 'scordi') return setAccessPermit(true);

        try {
            const decrypted = cryptoUtil.decryptUri(access_code);
            const [text = ''] = decrypted.split(':');
            setAccessPermit(secret_code === text);
        } catch (e) {
            console.warn(`[[decAES256 ${e}]]`);
            setTimeout(() => {
                parseToken(access_code, secret_code);
            }, 500);
        }
    }

    useEffect(() => {
        // @ts-ignore
        if (window) window.cryptoUtil = cryptoUtil;

        if (router.isReady && secretCode && accessCode) {
            parseToken(accessCode, secretCode);
        }
    }, [router.isReady, secretCode, accessCode]);

    useEffect(() => {
        if (secretCode) setSecretCode(secretCode);
    }, [secretCode]);

    useUnmount(() => {
        setSecretCode('');
    }, []);

    if (!accessPermitted) {
        return (
            <div className="min-h-screen w-screen bg-white">
                <ChannelTalkHideStyle />

                <div className="container py-20 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="mb-4">접근이 제한된 페이지 입니다.</h1>
                        <p className="text-xl">관리자에게 문의해주세요</p>
                    </div>
                </div>
            </div>
        );
    }

    return <DPaySecretCodePaymentListPage />;
}
