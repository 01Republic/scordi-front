import {isStepByEnabled, stepByKey} from '^config/environments';
import {useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {StepBy} from './StepBy.interface';
// import {currentOrgAtom} from '^models/Organization/atom';
import {currentUserAtom} from '^models/User/atom';
import {BadgeInfo} from 'lucide-react';
import {useRouter} from 'next/router';

export const StepByInstall = () => {
    // const currentOrg = useRecoilValue(currentOrgAtom);
    const currentUser = useRecoilValue(currentUserAtom);
    const router = useRouter();

    // StepBy 기능이 비활성화된 경우 렌더링하지 않음
    if (!isStepByEnabled) {
        return <></>;
    }

    useEffect(() => {
        if (!router.isReady) return;
        if (typeof window === 'undefined') return;

        // @ts-ignore
        const StepBy = window?.StepBy as StepBy | undefined;

        if (!stepByKey || !StepBy) return;

        StepBy.init(stepByKey);
    }, [router]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // @ts-ignore
        const StepBy = window?.StepBy as StepBy | undefined;

        if (!stepByKey || !StepBy) return;
        if (!currentUser?.id) return;

        const userInfo = {
            id: currentUser.id.toString(),
            created_at: currentUser.createdAt.toISOString(),
        };
        StepBy.setUserProperties(userInfo);
    }, [currentUser?.id]);

    return <></>;
};

export const StepByTutorialTeamMember = () => {
    if (typeof window === 'undefined') return;

    // @ts-ignore
    const StepBy = window?.StepBy as StepBy | undefined;

    if (!stepByKey || !StepBy) return;

    StepBy.startGuide('7ec2e050-4da1-480e-a25c-619e0db985a8', {version: '팀 구성원 튜토리얼'});
};

/* 요청 리스트 */
export const StepByTutorialReviewCampaign = () => {
    if (typeof window === 'undefined') return;

    // @ts-ignore
    const StepBy = window?.StepBy as StepBy | undefined;

    if (!stepByKey || !StepBy) return;

    StepBy.startGuide('661381ff-0cb5-40ad-bd3a-0eb98c55ff27', {version: '요청리스트'});
};

/* 구독 리스트 */
export const StepByTutorialSubscriptionList = () => {
    if (typeof window === 'undefined') return;

    // @ts-ignore
    const StepBy = window?.StepBy as StepBy | undefined;

    if (!stepByKey || !StepBy) return;

    StepBy.startGuide('f156a2dd-2afb-4381-8968-dd99f12c3e5a', {version: '구독리스트 '});
};

/* 결제수단 카드 */
export const StepByTutorialPaymentMethodCard = () => {
    if (typeof window === 'undefined') return;

    // @ts-ignore
    const StepBy = window?.StepBy as StepBy | undefined;

    if (!stepByKey || !StepBy) return;

    StepBy.startGuide('d83a61e1-5d7e-4744-a9d2-13b2bf72810d', {version: '결제수단카드 '});
};

/* 결제수단 계좌 */
export const StepByTutorialPaymentMethodAccount = () => {
    if (typeof window === 'undefined') return;

    // @ts-ignore
    const StepBy = window?.StepBy as StepBy | undefined;

    if (!stepByKey || !StepBy) return;

    StepBy.startGuide('3e4b425c-911a-4252-ad35-ebaddc449201', {version: '결제수단계좌 '});
};

/* 청구서 메일 */
export const StepByTutorialInvoiceMail = () => {
    if (typeof window === 'undefined') return;

    // @ts-ignore
    const StepBy = window?.StepBy as StepBy | undefined;

    if (!stepByKey || !StepBy) return;

    StepBy.startGuide('779c9ec3-6731-43fa-a66b-ab1726a61054', {version: '청구서메일'});
};

interface StepbyTutorialButtonProps {
    onClick: () => void;
}

export const StepbyTutorialButton = ({onClick}: StepbyTutorialButtonProps) => {
    if (!isStepByEnabled) {
        return <></>;
    }

    return (
        <button className="btn btn-outline animate-none btn-animation bg-white border-gray-300" onClick={onClick}>
            <BadgeInfo className="w-5 h-5" />
        </button>
    );
};
