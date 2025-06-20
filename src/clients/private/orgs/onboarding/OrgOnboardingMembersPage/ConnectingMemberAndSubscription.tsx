import React, {memo, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {ArrowLeft} from 'lucide-react';
import {reportState} from '^clients/private/orgs/connects/GoogleWorkspaceConnectorPage/atom';
import {orgIdParamState} from '^atoms/common';
import {Avatar} from '^components/Avatar';
import {useSubscriptions2} from '^models/Subscription/hook';
import {Lottie, LOTTIE_SRC} from '^components/LottieNoSSR';
import {OrgOnboardingRequestPageRoute} from '^pages/orgs/[id]/onboarding/request';
import {useConnectTeamMemberAndSubscription, useCreateTeamMember} from '^models/TeamMember';

export const ConnectingMemberAndSubscription = memo(() => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const {data: subscriptions} = useSubscriptions2(orgId, {});
    const {mutateAsync: createTeamMember} = useCreateTeamMember();
    const {mutateAsync: connectTeamMemberAndSubscription, isPending} = useConnectTeamMemberAndSubscription();
    const workspaceSubscription = subscriptions?.items ?? [];
    const reportData = useRecoilValue(reportState);

    const usedWorkspaceSubscriptionCount = new Set(
        workspaceSubscription
            .filter((sub) =>
                (reportData?.memberList ?? []).some((item) =>
                    item.apps.some((app) => app.product?.id === sub.productId),
                ),
            )
            .map((sub) => sub.productId),
    ).size;

    const newMemberAndSubscriptions =
        reportData?.memberList?.map((item) => {
            const appProductIds = item.apps.map((app) => app.product?.id).filter((id): id is number => !!id);

            const matchedSubscriptions = workspaceSubscription.filter((sub) => appProductIds?.includes(sub.productId));

            return {
                email: item.email,
                name: item.name,
                picture: item.picture,
                subscriptions: matchedSubscriptions.map((subscription) => subscription),
            };
        }) || [];

    const onNext = async () => {
        await Promise.all(
            newMemberAndSubscriptions.map((item) => {
                createTeamMember({
                    orgId,
                    data: {name: item.name, email: item.email},
                }).then((res) =>
                    item.subscriptions.forEach((sub) =>
                        connectTeamMemberAndSubscription({
                            teamMemberId: res.id,
                            subscriptionId: sub.id,
                        }).then(() => router.push(OrgOnboardingRequestPageRoute.path(orgId))),
                    ),
                );
            }),
        );
    };

    return (
        <div className="py-16 px-12 max-w-[1152px] mx-auto space-y-20 min-h-lvh">
            <button
                className="flex items-center gap-2 hover:cursor-pointer hover:text-scordi-500"
                onClick={() => router.back()}
            >
                <ArrowLeft className="w-6 h-6" />
                뒤로가기
            </button>

            <section className="flex items-center gap-2">
                {(newMemberAndSubscriptions.length !== 0 || usedWorkspaceSubscriptionCount !== 0) && (
                    <Lottie src={LOTTIE_SRC.CLAP} loop autoplay className="w-[82px] h-24" layout={{fit: 'fill'}} />
                )}
                {usedWorkspaceSubscriptionCount > 0 ? (
                    <div className="text-2xl font-bold">
                        총 <span className="text-primaryColor-900">{newMemberAndSubscriptions.length}명</span>의
                        구성원이
                        <span className="text-primaryColor-900">{usedWorkspaceSubscriptionCount}개</span>의 구독을
                        사용중이에요!
                    </div>
                ) : (
                    <div className="text-2xl font-bold">
                        총 <span className="text-primaryColor-900">{newMemberAndSubscriptions.length}명</span>의
                        구성원을 불러왔어요!
                    </div>
                )}
            </section>
            <section className="grid grid-cols-2 gap-3">
                {newMemberAndSubscriptions.map((member, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 flex justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <Avatar src={member.picture} className="w-10 h-10" />
                            <div className="flex flex-col gap-1">
                                <div className="font-semibold text-14">{member.name}</div>
                                <div className="text-gray-300 text-14">{member.email}</div>
                            </div>
                        </div>

                        {member.subscriptions.length > 0 && <span>{member.subscriptions.length} 개</span>}
                    </div>
                ))}
            </section>
            <section className="flex justify-center pb-12">
                <button className={`btn btn-scordi btn-md w-64  ${isPending ? 'loading' : ''}`} onClick={onNext}>
                    다음
                </button>
            </section>
        </div>
    );
});
