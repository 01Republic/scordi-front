import {useState} from 'react';
import {useRouter} from 'next/router';
import cn from 'classnames';
import {useRecoilValue} from 'recoil';
import {Check} from 'lucide-react';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {useCurrentUser} from '^models/User/hook';
import {invitedOrgIdAtom} from '^v3/V3OrgJoin/atom';
import {NewLandingPageLayout} from '^clients/public/home/LandingPages/NewLandingPageLayout';
import {OrgOnboardingSubscriptionPageRoute} from '^pages/orgs/[id]/onboarding/subscription';
import {useIdParam} from '^atoms/common';

interface SuccessSignProps {
    isWorkSpace?: boolean;
    newOrgId?: number;
}

export const SuccessSign = (props: SuccessSignProps) => {
    const {isWorkSpace, newOrgId} = props;

    const router = useRouter();
    const createdOrgId: number | undefined = useIdParam('orgId');
    const {currentUser} = useCurrentUser();
    const [isLoading, setIsLoading] = useState(false);
    const invitedOrgId = useRecoilValue(invitedOrgIdAtom);

    const url = (() => {
        if (!currentUser) return '#';
        /* 유저가 워크스페이스를 새로 생성한 경우 온보딩으로 이동 */
        if (createdOrgId || newOrgId) {
            return OrgOnboardingSubscriptionPageRoute.path(newOrgId ? newOrgId : createdOrgId);
        }
        const id = !!invitedOrgId ? invitedOrgId : currentUser.lastSignedOrgId;
        return OrgMainPageRoute.path(id);
    })();

    const onClick = async () => {
        setIsLoading(true);
        await router.push(url);
        setIsLoading(false);
    };

    return (
        <NewLandingPageLayout pageName="AdditionalInfoPage" hideNav>
            <article className="flex flex-col items-center justify-center gap-10 w-[380px]">
                <section className="flex flex-col items-center justify-center gap-5 w-full">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primaryColor-900">
                        <Check
                            className="text-white text-32 font-semibold"
                            onClick={() =>
                                console.log({
                                    createdOrgId,
                                    url,
                                    query: router.query,
                                })
                            }
                        />
                    </div>
                    <span className="text-36 font-bold text-gray-900 items-center text-center">
                        {isWorkSpace ? '새 워크스페이스 생성 완료!' : '가입을 환영합니다!'}
                    </span>
                    <div className="flex flex-col items-center font-normal text-neutral-800">
                        <p className="text-18">더 이상 엑셀 시트 매번 기입할 필요 없어요.</p>
                        <p className="text-18">지금 바로 SaaS 구독을 관리해보세요!</p>
                    </div>
                    <button
                        type="button" //
                        onClick={onClick}
                        className={cn('btn btn-scordi w-full text-18', isLoading && 'link_to-loading')}
                    >
                        {isLoading ? '' : '구독 관리 시작하기'}
                    </button>
                </section>
            </article>
        </NewLandingPageLayout>
    );
};
