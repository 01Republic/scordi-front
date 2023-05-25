import React, {memo, useEffect, useState} from 'react';
import {LandingPageLayout} from '^components/pages/LandingPages/LandingPageLayout';
import {CheckCircle} from '^components/react-icons/check-circle';
import {useRouter} from 'next/router';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {useCurrentUser} from '^hooks/useCurrentUser';

export const WelcomePage = memo(() => {
    const router = useRouter();
    const {currentUser} = useCurrentUser();
    const [isAccessible, setIsAccessible] = useState(false);

    useEffect(() => {
        const accessible = router.query.accessible as string | undefined;
        if (!accessible) return;
        setIsAccessible(accessible === 'true');
    }, [router.isReady]);

    return (
        <LandingPageLayout pageName="WelcomePage">
            <div className="mx-auto text-center py-20 w-full max-w-lg space-y-5 min-h-[100vh]">
                <CheckCircle className="w-[60px] mb-10" color="#5E5FEE" />

                <h1 className="text-2xl sm:text-4xl mb-8 font-bold">무료 체험 신청이 완료되었어요!</h1>

                <div className="p-4">
                    <p className="sm:text-lg mb-8">
                        스코디 팀 매니저가 확인 후, 순차적으로 연락드릴 예정이에요. <br />
                        이후 무료 체험을 열어드릴게요.
                    </p>

                    <div>
                        <div className="mb-4 btn sm:btn-lg btn-block rounded-2xl text-lg sm:!text-xl shadow-lg btn-scordi-light-200 !text-scordi-500">
                            📞 1영업일 내에 전화로 연락 드릴게요.
                        </div>

                        {isAccessible ? (
                            <a
                                href={currentUser ? `${V3OrgHomePageRoute.path(currentUser.orgId)}` : ''}
                                className="mb-4 btn sm:btn-lg btn-block btn-ghost rounded-2xl hover:!bg-white text-lg sm:!text-xl text-scordi-light-500 hover:text-scordi-500"
                            >
                                사이트 내부로 이동 (관리자전용 노출)
                            </a>
                        ) : (
                            <a
                                href="/"
                                className="mb-4 btn sm:btn-lg btn-block btn-ghost rounded-2xl hover:!bg-white text-lg sm:!text-xl text-scordi-light-500 hover:text-scordi-500"
                            >
                                홈페이지로 이동
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </LandingPageLayout>
    );
});
