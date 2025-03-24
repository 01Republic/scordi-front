import React, {memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';
import {LandingPageLayout} from '^clients/public/home/LandingPages/LandingPageLayout';
import {OrgCreatePageRoute} from '^pages/orgs/new';
import {AlertCircle} from 'lucide-react';
import {SignBizInfoPageRoute} from '^pages/sign/bizInfo';

export const OrgEmptyPage = memo(function OrgEmptyPage() {
    return (
        <LandingPageLayout pageName="WelcomePage" hideNav hideFooter>
            <div className="mx-auto text-center pt-[30vh] w-full max-w-lg space-y-5 h-screen">
                {/*<CheckCircle className="w-[60px] mb-10" color="#5E5FEE" />*/}
                <p className="flex items-center justify-center text-[160px] font-extrabold">
                    {/*<span>4</span>*/}
                    <AlertCircle fontSize={80} className="text-red-500 btn-animation hover:rotate-[360deg]" />
                    {/*<span>4</span>*/}
                </p>

                <h1 className="text-2xl sm:text-4xl mb-8 font-bold">워크스페이스가 없어요</h1>

                <div className="p-4">
                    <p className="sm:text-lg mb-8">초대를 요청하거나, 워크스페이스를 만들어주세요.</p>

                    <br />

                    <LinkTo
                        href={SignBizInfoPageRoute.path()}
                        className="btn sm:btn-lg btn-block btn-scordi-500 normal-case disabled:!bg-slate-100 disabled:!border-slate-300 no-animation btn-animation"
                    >
                        워크스페이스 생성하기
                    </LinkTo>
                </div>
            </div>

            <hr />
        </LandingPageLayout>
    );
});
