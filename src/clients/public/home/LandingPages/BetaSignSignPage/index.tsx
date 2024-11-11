import React, {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {LandingPageLayout} from '../LandingPageLayout';
import {useTranslation} from 'next-i18next';
import {useGoogleAccessTokenCallback} from '^hooks/useGoogleAccessToken';
import {BetaSignSocialPageRoute} from '^pages/sign/social';
import {GmailAgent, googleAuthForGmail} from '^api/tasting.api';
import {SignPhoneAuthPageRoute} from '^pages/sign/phone';

export const BetaSignSignPage = memo(() => {
    const router = useRouter();
    const {accessTokenData} = useGoogleAccessTokenCallback(BetaSignSocialPageRoute.path());
    const {t} = useTranslation('sign');
    const [failed, setFailed] = useState(false);

    console.log('accessTokenData', accessTokenData);
    useEffect(() => {
        if (!accessTokenData) return;
        if (typeof window == 'undefined') return;

        setTimeout(() => setFailed(true), 10000);

        const gmailAgent = new GmailAgent(accessTokenData);
        gmailAgent.getProfile().then(async (userData) => {
            window.localStorage.setItem('scordi/tasting/gmailProfile', JSON.stringify(userData));
            router.push(SignPhoneAuthPageRoute.path());
        });
    }, [accessTokenData]);

    return (
        <LandingPageLayout pageName="BetaSignPhoneAuthPage" hideNav hideFooter>
            <div className="mx-auto text-center pt-[30vh] w-full max-w-lg space-y-5 h-screen">
                <h1
                    className="text-2xl sm:text-4xl mb-8 font-bold"
                    onClick={() => {
                        // console.log(form.getValues());
                    }}
                    dangerouslySetInnerHTML={{__html: t('pre_sign_page.page_title')}}
                />

                <div className="p-4">
                    <p className="sm:text-lg mb-8">
                        반가워요, 고객님! <br />
                        스코디를 이렇게 이용해보세요 🙂
                    </p>

                    <div className="mb-8">
                        <div className="mb-4 btn sm:btn-lg btn-block normal-case rounded-2xl text-lg sm:!text-xl shadow-lg btn-scordi-light-200 !text-scordi-500">
                            <a>📲 이용중인 서비스가 있다면 모두 연동해주세요</a>
                        </div>

                        <div className="mb-4 btn sm:btn-lg btn-block normal-case rounded-2xl text-lg sm:!text-xl shadow-lg btn-scordi-light-200 !text-scordi-500">
                            <a>📨 인보이스 계정을 연동해서 통합 관리 할 수 있어요</a>
                        </div>

                        <div className="mb-4 btn sm:btn-lg btn-block normal-case rounded-2xl text-lg sm:!text-xl shadow-lg btn-scordi-light-200 !text-scordi-500">
                            <a>💳 카드를 등록 해두면 자세한 정보를 얻을 수 있어요</a>
                        </div>
                    </div>

                    {!accessTokenData ? (
                        <div id="tasting-handler--start-button">
                            <button
                                onClick={() => googleAuthForGmail()}
                                className="btn_google_signin_light w-[266px] h-[64px]"
                                style={{backgroundPosition: 'left'}}
                            />
                        </div>
                    ) : failed ? (
                        <div>
                            <p>앗, 혹시 페이지가 아직 이동이 안되었나요?</p>
                            <button className="btn btn-scordi btn-lg">새로고침</button>
                        </div>
                    ) : (
                        <>계정을 불러오고 있어요!</>
                    )}
                </div>
            </div>

            <hr />
        </LandingPageLayout>
    );
});
