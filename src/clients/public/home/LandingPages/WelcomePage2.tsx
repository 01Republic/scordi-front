import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import Link from 'next/link';
import {useCurrentUser} from '^models/User/hook';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {invitedOrgIdAtom} from '^v3/V3OrgJoin/atom';
import {LandingPageLayout} from '^clients/public/home/LandingPages/LandingPageLayout';
import {CheckCircle} from '^components/react-icons/check-circle';
import {CgSpinner} from 'react-icons/cg';

export const WelcomePage2 = memo(() => {
    const {currentUser} = useCurrentUser();
    const [isClicked, setIsClicked] = useState(false);
    const invitedOrgId = useRecoilValue(invitedOrgIdAtom);

    const href = (() => {
        if (!currentUser) return '#';
        const id = !!invitedOrgId ? invitedOrgId : currentUser.lastSignedOrgId;
        return OrgMainPageRoute.path(id);
    })();

    return (
        <LandingPageLayout pageName="WelcomePage">
            <div className="mx-auto text-center py-20 w-full max-w-lg space-y-5">
                <CheckCircle className="w-[60px] mb-10" color="#5E5FEE" />

                <h1 className="text-2xl sm:text-4xl mb-8 font-bold">가입을 환영합니다!</h1>

                <div className="p-4">
                    <p className="sm:text-lg mb-8">
                        더이상 엑셀 시트 매번 기입할 필요 없어요. <br />
                        지금 바로 SaaS 구독을 관리해보세요!
                    </p>

                    <Link href={href}>
                        <button
                            onClick={() => setIsClicked(true)}
                            disabled={isClicked}
                            className="btn sm:btn-lg btn-block btn-scordi-500 normal-case disabled:!bg-slate-100 disabled:!border-slate-300"
                        >
                            {isClicked ? <CgSpinner size={28} className="animate-spin" /> : <>확인</>}
                        </button>
                    </Link>
                </div>
            </div>

            <hr />
        </LandingPageLayout>
    );
});
