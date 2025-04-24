import {Avatar} from '^components/Avatar';
import {ArrowLeft} from 'lucide-react';
import {useRouter} from 'next/router';
import {memo} from 'react';

export interface NewMember {
    profileImageUrl?: string;
    name: string;
    email: string;
}

interface ConnectingResultScreenProps {
    onNext: () => void;
    newMembers: NewMember[];
}

export const ConnectingResultScreen = memo(function ConnectingResultScreen({
    onNext,
    newMembers,
}: ConnectingResultScreenProps) {
    const router = useRouter();

    return (
        <div className="py-16 px-12 max-w-[1152px] mx-auto space-y-20 min-h-lvh">
            <div
                className="flex items-center gap-2 hover:cursor-pointer hover:text-scordi-500"
                onClick={() => router.back()}
            >
                <ArrowLeft className="w-6 h-6" />
                뒤로가기
            </div>
            <div className="text-2xl font-bold flex items-center gap-2">
                <img src="/images/illustration/clapping_hands.png" alt="complete" className="w-16 h-16" />총{' '}
                {newMembers.length}명의 구성원을 불러왔어요
            </div>
            <div className="grid grid-cols-2 gap-3">
                {newMembers.map((member, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 flex items-center gap-4">
                        <Avatar src={member.profileImageUrl} className="w-10 h-10" />
                        <div className="flex flex-col gap-1">
                            <div className="font-semibold text-14">{member.name}</div>
                            <div className="text-gray-300 text-14">{member.email}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center pb-12">
                <button className="btn btn-scordi btn-md w-64" onClick={onNext}>
                    다음
                </button>
            </div>
        </div>
    );
});
