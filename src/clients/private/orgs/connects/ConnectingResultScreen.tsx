import {orgIdParamState} from '^atoms/common';
import {useTeamMembersInTeamMembersTable} from '^models/TeamMember';
import {TeamMemberProfile} from '^models/TeamMember/components/TeamMemberProfile';
import {ArrowLeft} from 'lucide-react';
import {useRouter} from 'next/router';
import {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';

interface ConnectingResultScreenProps {
    onNext: () => void;
}

export const ConnectingResultScreen = memo(function ConnectingResultScreen({onNext}: ConnectingResultScreenProps) {
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();

    const onBack = () => {
        router.back();
    };

    /* TODO: 실제 불러온 멤버로 변경 필요 */
    const {search, result} = useTeamMembersInTeamMembersTable();

    useEffect(() => {
        search({
            where: {
                organizationId: orgId,
            },
        });
    }, []);

    return (
        <div className="py-16 px-12 max-w-[1152px] mx-auto space-y-20">
            <div className="flex items-center gap-2 hover:cursor-pointer hover:text-scordi-500" onClick={onBack}>
                <ArrowLeft className="w-6 h-6" />
                뒤로가기
            </div>
            <div className="text-2xl font-bold flex items-center gap-2">
                <img src="/images/illustration/clapping_hands.png" alt="complete" className="w-16 h-16" />총{' '}
                {result.items.length}명의 구성원을 불러왔어요
            </div>
            <div className="grid grid-cols-2 gap-3">
                {result.items.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg p-4">
                        <TeamMemberProfile item={item} />
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                <button className="btn btn-scordi btn-md w-64" onClick={onNext}>
                    다음
                </button>
            </div>
        </div>
    );
});
