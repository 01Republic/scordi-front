import React, {memo, useEffect, useState} from 'react';
import {LandingPageLayout} from '^components/pages/LandingPages/LandingPageLayout';
import {CheckCircle} from '^components/react-icons/check-circle';
import {useRouter} from 'next/router';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {useCurrentUser} from '^models/User/hook';
import {useRecoilValue} from 'recoil';
import {invitedOrgIdAtom} from '^v3/V3OrgJoin/atom';
import {LinkTo} from '^components/util/LinkTo';

export const WelcomePage2 = memo(() => {
    const invitedOrgId = useRecoilValue(invitedOrgIdAtom);
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
            <div className="mx-auto text-center py-20 w-full max-w-lg space-y-5">
                <CheckCircle className="w-[60px] mb-10" color="#5E5FEE" />

                <h1 className="text-2xl sm:text-4xl mb-8 font-bold">가입을 환영합니다!</h1>

                <div className="p-4">
                    <p className="sm:text-lg mb-8">
                        계정이 정상적으로 연동되었습니다. <br />
                        지금 바로 조회해보세요!
                    </p>

                    <LinkTo onClick={() => currentUser && V3OrgHomePageRoute.path(invitedOrgId || currentUser.orgId)}>
                        <div className="mb-4 btn sm:btn-lg btn-block normal-case rounded-2xl text-lg sm:!text-xl shadow-lg btn-scordi-light-200 !text-scordi-500">
                            메인페이지로 이동하기
                        </div>
                    </LinkTo>
                </div>
            </div>

            <hr />
        </LandingPageLayout>
    );
});
