import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import Link from 'next/link';
import {useCurrentUser} from '^models/User/hook';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {invitedOrgIdAtom} from '^v3/V3OrgJoin/atom';
import {LandingPageLayout} from '^components/pages/LandingPages/LandingPageLayout';
import {CheckCircle} from '^components/react-icons/check-circle';
import {CgSpinner} from 'react-icons/cg';

export const WelcomePage2 = memo(() => {
    const {currentUser} = useCurrentUser();
    const [isClicked, setIsClicked] = useState(false);
    const invitedOrgId = useRecoilValue(invitedOrgIdAtom);

    const href = (() => {
        if (!currentUser) return '#';
        const id = !!invitedOrgId ? invitedOrgId : currentUser.lastSignedOrgId;
        return V3OrgHomePageRoute.path(id);
    })();

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

                    <Link href={href}>
                        <button
                            onClick={() => setIsClicked(true)}
                            disabled={isClicked}
                            className="btn sm:btn-lg btn-block btn-scordi-500 normal-case disabled:!bg-slate-100 disabled:!border-slate-300"
                        >
                            {isClicked ? <CgSpinner size={28} className="animate-spin" /> : <>메인페이지로 이동하기</>}
                        </button>
                    </Link>
                </div>
            </div>

            <hr />
        </LandingPageLayout>
    );
});
