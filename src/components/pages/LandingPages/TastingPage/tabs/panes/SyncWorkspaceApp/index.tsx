import React, {memo} from 'react';
import {FindByGmailButton} from '^components/pages/LandingPages/TastingPage/FindByGmailButton';
import {GoogleComplianceDisclosureTag} from '^components/GoogleCompliance';
import {useRecoilState, useRecoilValue} from 'recoil';
import {gmailItemsLoadingAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {useTranslation} from 'next-i18next';
import {GoogleAdminLoginButton} from './GoogleAdminLoginButton';
import {reportState} from '^components/pages/LandingPages/TastingPage/tabs/atom';
import {ReportList} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/ReportList';

export const SyncWorkspaceApp = memo(function SyncWorkspaceApp() {
    const {t} = useTranslation('publicTasting');
    const reportList = useRecoilValue(reportState);

    return (
        <div>
            <div className="">
                <section id="section-1" className="hero mb-3">
                    <div className="text-left w-[100vw]">
                        <div className="my-10 container px-4 relative">
                            {reportList ? (
                                <ReportList />
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
                                        <span className="block sm:inline-block">{t('SyncWorkspaceApp.subtitle2')}</span>{' '}
                                        <br />
                                        <b className="text-gray-900">{t('SyncWorkspaceApp.subtitle3')}</b>
                                    </p>

                                    <div className="py-7">
                                        <GoogleAdminLoginButton />

                                        {/*<GoogleComplianceDisclosureTag />*/}
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
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
});
