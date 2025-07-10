import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {ArrowLeft} from 'lucide-react';
import {Avatar} from '^components/Avatar';
import {IntegrationProvider, IntegrationWorkspaceDto} from '^models/IntegrationWorkspace/type';
import {useQuery} from '@tanstack/react-query';
import {Paginated} from '^types/utils/paginated.dto';
import {integrationSlackMemberApi} from '^models/integration/IntegrationSlackMember/api';
import {useOrgIdParam} from '^atoms/common';
import {unitFormat} from '^utils/number';
import {Lottie, LOTTIE_SRC} from '^components/LottieNoSSR';

interface ConnectingResultScreenProps {
    slackWorkspace: IntegrationWorkspaceDto<IntegrationProvider.slack>;
    onNext: () => void;
}

export const ConnectingResultScreen = memo((props: ConnectingResultScreenProps) => {
    const {onNext, slackWorkspace} = props;
    const router = useRouter();
    const orgId = useOrgIdParam();
    const workspaceId = slackWorkspace?.id;
    const {data, isFetching} = useQuery({
        queryKey: ['Onboarding.SlackConnectorPage', orgId, workspaceId],
        queryFn: () => {
            if (!workspaceId) return Paginated.init();
            return integrationSlackMemberApi
                .index(orgId, workspaceId, {
                    relations: ['teamMember'],
                    where: {isDeleted: false},
                    itemsPerPage: 0,
                })
                .then((res) => res.data);
        },
        initialData: Paginated.init(),
        enabled: !!workspaceId,
    });
    const slackMembers = data.items;

    return (
        <section className="py-16 px-12 max-w-[1152px] mx-auto space-y-20 min-h-lvh">
            <button
                className="flex items-center text-14 gap-2 hover:cursor-pointer hover:text-scordi-500"
                onClick={() => router.back()}
            >
                <ArrowLeft fontSize={14} />
                뒤로가기
            </button>

            <section className={`flex items-center gap-2 mt-20 ${isFetching ? 'invisible' : ''}`}>
                <Lottie src={LOTTIE_SRC.CLAP} loop autoplay className="w-[82px] h-24" layout={{fit: 'fill'}} />

                <div className="text-2xl font-bold">
                    총 <span className="text-primaryColor-900">{unitFormat(slackMembers.length, '명')}</span>의 구성원을
                    불러왔어요!
                </div>
            </section>

            <section className="grid grid-cols-2 gap-3 mt-12">
                {slackMembers.map((member, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-lg p-4 flex items-center gap-4 shadow hover:shadow-lg transition-all"
                    >
                        <Avatar src={member.imageUrl || undefined} className="w-10 h-10" />
                        <div className="flex flex-col gap-1">
                            <div className="font-semibold text-14">{member.name}</div>
                            <div className="text-gray-300 text-14">{member.email}</div>
                        </div>
                    </div>
                ))}
            </section>

            <section className="flex justify-center pb-12 mt-20">
                <button className={`btn btn-scordi btn-lg btn-wide  ${isFetching ? 'loading' : ''}`} onClick={onNext}>
                    다음
                </button>
            </section>
        </section>
    );
});
