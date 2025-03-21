import {useRouter} from 'next/router';
import {memo} from 'react';
import {useRecoilState} from 'recoil';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {OrgHomeRoute} from '^pages/orgs/[id]/home';
import {CheckCircle} from 'lucide-react';

export const JoinOrgPage = memo(() => {
    const router = useRouter();
    const [orgIdParam] = useRecoilState(orgIdParamState);

    return (
        <div className="flex w-full items-center justify-center" style={{height: '100vh'}}>
            <div className="flex flex-col items-center w-[100%] sm:w-[60%] md:w-[50%] lg:w-[40%] gap-y-10">
                <CheckCircle size="80px" />
                <div className="hero-content text-center">
                    <div className="flex flex-col gap-y-10 max-w-md">
                        <h1 className="text-4xl md:text-7xl font-bold">Your request has been submitted!</h1>
                        <p className="text-2xl py-6">Please wait for approval</p>
                    </div>
                </div>
                <button
                    className="btn btn-block btn-primary text-lg"
                    onClick={() => router.push(OrgHomeRoute.path(orgIdParam))}
                >
                    home
                </button>
            </div>
        </div>
    );
});
