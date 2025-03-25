import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {Check} from 'lucide-react';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {useCurrentUser} from '^models/User/hook';
import {invitedOrgIdAtom} from '^v3/V3OrgJoin/atom';
import {NewLandingPageLayout} from '^clients/public/home/LandingPages/NewLandingPageLayout';

export const SuccessSign = () => {
    const {currentUser} = useCurrentUser();
    const invitedOrgId = useRecoilValue(invitedOrgIdAtom);
    const url = (() => {
        if (!currentUser) return '#';
        const id = !!invitedOrgId ? invitedOrgId : currentUser.lastSignedOrgId;
        return OrgMainPageRoute.path(id);
    })();

    const router = useRouter();
    return (
        <NewLandingPageLayout pageName="AdditionalInfoPage" hideNav>
            <article className="flex flex-col items-center justify-center gap-10 w-[380px]">
                <section className="flex flex-col items-center justify-center gap-5 w-full">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primaryColor-900">
                        <Check className="text-white text-32 font-semibold" />
                    </div>
                    <span className="text-3xl font-bold text-neutral-900">가입을 환영합니다!</span>
                    <div className="flex flex-col items-center text-lg font-normal text-neutral-800">
                        <p>더 이상 엑셀 시트 매번 기입할 필요 없어요.</p>
                        <p>지금 바로 SaaS 구독을 관리해보세요!</p>
                    </div>
                </section>
                <button
                    type="button" //
                    onClick={() => router.push(url)}
                    className="btn btn-scordi"
                >
                    스코디 바로가기
                </button>
            </article>
        </NewLandingPageLayout>
    );
};
