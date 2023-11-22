import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {connectIsLoadingState} from '^components/pages/LandingPages/TastingPage/tabs/atom';
import {GoogleAdminLoginButton} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/GoogleAdminLoginButton';
import {useTranslation} from 'next-i18next';
import {PiSpinnerGapThin} from 'react-icons/pi';

export const SyncWorkSpace = memo(() => {
    const {t} = useTranslation('publicTasting');
    const isLoading = useRecoilValue(connectIsLoadingState);

    return (
        <>
            {!isLoading ? (
                <div className="animate-pulse text-center items-center flex flex-col w-[50%] py-16 m-auto gap-10">
                    <PiSpinnerGapThin size={60} className="animate-spin text-scordi-500" />
                    <span className=" text-lg text-scordi-500 font-semibold bg-scordi-100 rounded-lg py-3 px-8">
                        구글 워크스페이스를 연동중입니다. 잠시만 기다려주세요
                    </span>
                </div>
            ) : (
                <>
                    <h1
                        className="text-3xl md:text-6xl font-bold mb-8"
                        style={{lineHeight: 1.3}}
                        dangerouslySetInnerHTML={{__html: t('SyncWorkspaceApp.title')}}
                    />
                    {/*<h1 className="text-5xl mb-3">Find all your team apps usage</h1>*/}
                    {/*<p className="text-lg text-gray-500">(This is just a tasting. It will never be saved.)</p>*/}
                    <p className="text-2xl text-gray-500 mb-8" style={{lineHeight: 1.7}}>
                        {t('SyncWorkspaceApp.subtitle1')}{' '}
                        <span className="block sm:inline-block">{t('SyncWorkspaceApp.subtitle2')}</span> <br />
                        <b className="text-gray-900">{t('SyncWorkspaceApp.subtitle3')}</b>
                    </p>

                    <div className="py-7">
                        <GoogleAdminLoginButton />
                    </div>

                    <div
                        className="absolute w-[50%] h-[100%] right-0 bottom-0"
                        style={{
                            backgroundImage:
                                'url(https://i.pinimg.com/originals/f0/95/63/f095637f523c52539e1016ab9735c0b0.gif)',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat',
                            transform: 'scale(1.2)',
                        }}
                    />
                </>
            )}
        </>
    );
});
