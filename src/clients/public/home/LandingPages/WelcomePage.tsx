import React, {memo, useEffect, useState} from 'react';
import {LandingPageLayout} from '^clients/public/home/LandingPages/LandingPageLayout';
import {CheckCircle} from '^components/react-icons/check-circle';
import {useRouter} from 'next/router';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {useCurrentUser} from '^models/User/hook';
import {useTranslation} from 'next-i18next';

export const WelcomePage = memo(() => {
    const router = useRouter();
    const {currentUser} = useCurrentUser();
    const [isAccessible, setIsAccessible] = useState(false);
    const {t} = useTranslation('sign');

    useEffect(() => {
        const accessible = router.query.accessible as string | undefined;
        if (!accessible) return;
        setIsAccessible(accessible === 'true');
    }, [router.isReady]);

    return (
        <LandingPageLayout pageName="WelcomePage">
            <div className="mx-auto text-center py-20 w-full max-w-lg space-y-5">
                <CheckCircle className="w-[60px] mb-10" color="#5E5FEE" />

                <h1 className="text-2xl sm:text-4xl mb-8 font-bold">{t('welcome_page.title')}</h1>

                <div className="p-4">
                    <p className="sm:text-lg mb-8">
                        {t('welcome_page.we_will_contact_you')} <br />
                        {t('welcome_page.then_free_trial_would_be_opened')}
                    </p>

                    <div>
                        <div className="mb-4 btn sm:btn-lg btn-block normal-case rounded-2xl text-lg sm:!text-xl shadow-lg btn-scordi-light-200 !text-scordi-500">
                            {t('welcome_page.we_will_call_you_soon')}
                        </div>

                        {isAccessible ? (
                            <a
                                href={currentUser ? `${OrgMainPageRoute.path(currentUser.lastSignedOrgId)}` : ''}
                                className="mb-4 btn sm:btn-lg btn-block normal-case btn-ghost rounded-2xl hover:!bg-white text-lg sm:!text-xl text-scordi-light-500 hover:text-scordi-500"
                            >
                                사이트 내부로 이동 (관리자전용 노출)
                            </a>
                        ) : (
                            <a
                                href="/"
                                className="mb-4 btn sm:btn-lg btn-block normal-case btn-ghost rounded-2xl hover:!bg-white text-lg sm:!text-xl text-scordi-light-500 hover:text-scordi-500"
                            >
                                {t('welcome_page.go_home')}
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <hr />
        </LandingPageLayout>
    );
});
