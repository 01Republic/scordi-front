import React from 'react';
import {useRecoilState} from 'recoil';
import {X} from 'lucide-react';
import {Card} from '^public/components/ui/card';
import {Input} from '^public/components/ui/input';
import {Textarea} from '^public/components/ui/textarea';
import {Button} from '^public/components/ui/button';
import {TeamMemberProfile} from '^models/TeamMember/components/TeamMemberProfile';
import {useTeamMembers} from '^models/TeamMember';
import {reviewCampaignCreateStepAtom} from '../atom';

export const RequestAddStep4 = () => {
    const [step, setStep] = useRecoilState(reviewCampaignCreateStepAtom);
    /* TODO: api 교체 */
    const {result} = useTeamMembers();

    const onPrevious = () => setStep((s) => s - 1);

    return (
        <Card className={'bg-white p-10 space-y-10'}>
            <div className={'text-xl font-bold text-gray-900'}>
                요청 추가를 완료하고 구성원들에게 요청을 전송할까요?
            </div>
            <div className="grid w-full items-center gap-2">
                <div className={'text-18 font-medium'}>제목</div>
                <Input type="text" id="title" placeholder="요청 제목" />
            </div>
            <div className="grid w-full items-center gap-2">
                <div className={'text-18 font-medium'}>설명</div>
                <Textarea id="description" placeholder="요청 설명" className={'min-h-40'} />
            </div>
            <div>
                <div className={'text-18 font-medium'}>응답 대상자</div>
                <div className={'my-4'}>총 11명</div>
                <div className={'grid grid-cols-3 gap-2'}>
                    {result.items.map((teamMember) => (
                        <div className={'p-2 border bg-gray-50 rounded-md flex items-center justify-between'}>
                            <div className="flex-1 min-w-0">
                                <TeamMemberProfile item={teamMember} />
                            </div>
                            <div className="w-5 h-5 shrink-0 cursor-pointer ml-2">
                                <X />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={'flex justify-end space-x-4'}>
                <Button size={'xl'} variant={'gray'} onClick={onPrevious}>
                    뒤로
                </Button>
                <Button size={'xl'} variant={'scordi'}>
                    완료
                </Button>
            </div>
        </Card>
    );
};
