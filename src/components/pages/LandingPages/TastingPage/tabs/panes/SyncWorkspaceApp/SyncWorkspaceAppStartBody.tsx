import React, {memo} from 'react';
import {useTranslation} from 'next-i18next';
import {GoogleAdminLoginButton} from './GoogleAdminLoginButton';

export const SyncWorkspaceAppStartBody = memo(function AppStartBody() {
    const {t} = useTranslation('publicTasting');

    return (
        <>
            <div
                className="absolute w-[50%] h-[100%] top-0 right-0 bottom-0"
                style={{
                    backgroundImage:
                        'url(https://i.pinimg.com/originals/f0/95/63/f095637f523c52539e1016ab9735c0b0.gif)',
                    backgroundSize: 'contain',
                    backgroundPosition: 'right -5rem center',
                    backgroundRepeat: 'no-repeat',
                    transform: 'scale(1.2)',
                    right: '4rem',
                }}
            />

            <h1
                className="text-3xl md:text-6xl font-bold mb-8 relative"
                style={{lineHeight: 1.3}}
                dangerouslySetInnerHTML={{__html: t('SyncWorkspaceApp.title')}}
            />
            {/*<h1 className="text-5xl mb-3">Find all your team apps usage</h1>*/}
            {/*<p className="text-lg text-gray-500">(This is just a tasting. It will never be saved.)</p>*/}
            <p className="text-xl sm:text-2xl text-gray-500 mb-8 relative" style={{lineHeight: 1.7}}>
                <span>{t('SyncWorkspaceApp.subtitle1')} </span>
                <br className="sm:hidden block" />
                <span>{t('SyncWorkspaceApp.subtitle1-1')}</span>
                <span className="block sm:inline-block">{t('SyncWorkspaceApp.subtitle2')}</span> <br />
                <b className="text-gray-900">{t('SyncWorkspaceApp.subtitle3')}</b>
            </p>

            <div className="py-7 sm:text-start text-center relative">
                <GoogleAdminLoginButton />

                {/*<GoogleComplianceDisclosureTag />*/}
            </div>
        </>
    );
});
