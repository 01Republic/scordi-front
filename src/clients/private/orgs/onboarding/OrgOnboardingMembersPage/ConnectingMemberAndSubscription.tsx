import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {ArrowLeft} from 'lucide-react';
import {Paginated} from '^types/utils/paginated.dto';
import {unitFormat} from '^utils/number';
import {useOrgIdParam} from '^atoms/common';
import {Avatar} from '^components/Avatar';
import {Lottie, LOTTIE_SRC} from '^components/LottieNoSSR';
import {IntegrationGoogleWorkspaceWorkspaceDto} from '^models/integration/IntegrationGoogleWorkspaceWorkspace/type';
import {integrationGoogleWorkspaceMemberApi} from '^models/integration/IntegrationGoogleWorkspaceMember/api';
import {OrgOnboardingNotificationsPageRoute} from '^pages/orgs/[id]/onboarding/notifications';

interface Props {
    workspace: IntegrationGoogleWorkspaceWorkspaceDto;
    onBack: () => any;
}

// 온보딩 스텝2. / 구글워크스페이스 연동 / 성공시 결과화면
export const ConnectingMemberAndSubscription = memo((props: Props) => {
    const {workspace, onBack} = props;
    const router = useRouter();
    const orgId = useOrgIdParam();
    const {data, isFetching} = useQuery({
        queryKey: ['ConnectingMemberAndSubscription.googleWorkspaceMembers', workspace?.id],
        queryFn: () => {
            const params = {
                // relations: ['teamMember'],
                itemsPerPage: 0,
            };
            return integrationGoogleWorkspaceMemberApi.index(orgId, workspace.id, params).then((res) => res.data);
        },
        initialData: Paginated.init(),
        enabled: !!workspace,
    });

    const googleWorkspaceMembers = data.items;

    const onNext = () => router.push(OrgOnboardingNotificationsPageRoute.path(orgId));

    return (
        <div className="py-16 px-12 max-w-[1152px] mx-auto min-h-lvh">
            <button
                className="flex items-center text-14 gap-2 hover:cursor-pointer hover:text-scordi-500"
                onClick={onBack}
            >
                <ArrowLeft fontSize={14} />
                뒤로가기
            </button>

            <section className={`flex items-center gap-2 mt-20 ${isFetching ? 'invisible' : ''}`}>
                <Lottie src={LOTTIE_SRC.CLAP} loop autoplay className="w-[82px] h-24" layout={{fit: 'fill'}} />

                <div className="text-2xl font-bold">
                    <span className="mr-2">
                        총{' '}
                        <span className="text-primaryColor-900">{unitFormat(googleWorkspaceMembers.length, '명')}</span>
                        의 구성원이
                    </span>
                    <span>
                        <span className="text-primaryColor-900">{unitFormat(workspace.subscriptionCount)}</span>의
                        구독을 사용중이에요!
                    </span>
                </div>
                {/*{workspace.subscriptionCount > 0 ? (*/}
                {/*    <div className="text-2xl font-bold">*/}
                {/*        <span className="mr-2">*/}
                {/*            총{' '}*/}
                {/*            <span className="text-primaryColor-900">*/}
                {/*                {unitFormat(googleWorkspaceMembers.length, '명')}*/}
                {/*            </span>*/}
                {/*            의 구성원이*/}
                {/*        </span>*/}
                {/*        <span>*/}
                {/*            <span className="text-primaryColor-900">{unitFormat(workspace.subscriptionCount)}</span>의*/}
                {/*            구독을 사용중이에요!*/}
                {/*        </span>*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    <div className="text-2xl font-bold">*/}
                {/*        총{' '}*/}
                {/*        <span className="text-primaryColor-900">{unitFormat(googleWorkspaceMembers.length, '명')}</span>*/}
                {/*        의 구성원을 불러왔어요!*/}
                {/*    </div>*/}
                {/*)}*/}
            </section>

            <section className="grid grid-cols-2 gap-3 mt-12">
                {googleWorkspaceMembers.map((googleMember, i) => (
                    <div key={i} className="bg-white rounded-lg p-4 flex justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <Avatar src={googleMember.imageUrl || undefined} className="w-10 h-10" />
                            <div className="flex flex-col gap-1">
                                <div className="font-semibold text-14">{googleMember.name}</div>
                                <div className="text-gray-300 text-14">{googleMember.email}</div>
                            </div>
                        </div>

                        <span>{unitFormat(googleMember.subscriptionCount)}</span>
                        {/*{googleMember.subscriptionCount > 0 && (*/}
                        {/*    <span>{unitFormat(googleMember.subscriptionCount)}</span>*/}
                        {/*)}*/}
                    </div>
                ))}
            </section>

            <section className="flex justify-center pb-12 mt-20">
                <button className={`btn btn-scordi btn-lg btn-wide  ${isFetching ? 'loading' : ''}`} onClick={onNext}>
                    다음
                </button>
            </section>
        </div>
    );
});
