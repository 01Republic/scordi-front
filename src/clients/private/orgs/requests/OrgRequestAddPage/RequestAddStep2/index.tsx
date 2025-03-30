import {Button} from '^public/components/ui/button';
import {Card} from '^public/components/ui/card';
import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {requestAddStepAtom} from '^clients/private/orgs/requests/OrgRequestAddPage';
import {useTeamMembers} from '^models/TeamMember';
import {debounce} from 'lodash';
import {orgIdParamState} from '^atoms/common';
import {useRouter} from 'next/router';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import {ChevronDown, ChevronRight} from 'lucide-react';
import SlackIcon from '^public/logo/icons/ic_slack.png';
import GoogleIcon from '^public/logo/icons/ic_google.png';
import GmailIcon from '^public/logo/icons/ic_gmail.png';
import Image from 'next/image';
import {TeamMemberProfileOption} from '^models/TeamMember/components/TeamMemberProfile';
import {cn} from '^public/lib/utils';
import {Checkbox} from '^public/components/ui/checkbox';

export const RequestAddStep2 = () => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const [step, setStep] = useRecoilState(requestAddStepAtom);
    const {search, result, query, searchAndUpdateCounter} = useTeamMembers();
    const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
    const teamMembers = result.items;

    const onReady = () => {
        searchAndUpdateCounter({
            relations: ['teams'],
            order: {id: 'DESC'},
            updateCounterCacheColumn: 'subscriptionCount',
        });
    };

    const onSearch = debounce((keyword?: string) => {
        return search({
            ...query,
            keyword: keyword || undefined,
            page: 0,
            itemsPerPage: 30,
        });
    }, 500);

    const onPrevious = () => {
        setStep(step - 1);
    };

    const onNext = () => {
        setStep(step + 1);
    };

    const checkTeamMember = (teamMemberId: number) => {
        setSelectedMembers((prev) =>
            prev.includes(teamMemberId) ? prev.filter((id) => id !== teamMemberId) : [...prev, teamMemberId],
        );
    };

    const checkAllMembers = () => {
        if (selectedMembers.length === teamMembers.length) {
            setSelectedMembers([]);
        } else {
            setSelectedMembers(teamMembers.map((member) => member.id));
        }
    };

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!router.isReady) return;
        onReady && onReady();
    }, [orgId, router.isReady]);

    return (
        <Card className={'bg-white mb-4'}>
            <div
                className={
                    'px-9 py-5 flex items-center justify-start space-x-2 text-xl font-bold text-gray-900 cursor-pointer'
                }
                onClick={() => setStep(2)}
            >
                {step === 2 ? <ChevronDown /> : <ChevronRight />}
                <span>2. 요청할 대상 선택</span>
            </div>
            {step === 2 && (
                <div className={'p-9 space-y-10 border-t'}>
                    <div>
                        기본적으론 이메일과 슬랙 중에 연동된 플랫폼으로 요청이 전송돼요.
                        <br />
                        이메일과 슬랙 둘 다 연동되어 있지 않다면, 해당 구성원에게는 요청을 전송할 수 없어요.
                    </div>

                    <div className={'space-y-2'}>
                        <div className={'flex justify-between items-center'}>
                            <div className={'flex space-x-2 items-center'}>
                                <Button size={'sm'} variant={'scordiGhost'} onClick={checkAllMembers}>
                                    전체선택 {selectedMembers.length === teamMembers.length ? '해제' : ''}
                                </Button>
                            </div>
                            <div className={'flex items-center space-x-1 text-sm'}>
                                <span>불러오기:</span>
                                <Button size={'sm'} variant={'scordiGhost'} onClick={onPrevious}>
                                    <Image src={SlackIcon} alt={'google'} width={20} height={20} />
                                    슬랙
                                </Button>
                                <Button size={'sm'} variant={'scordiGhost'} onClick={onPrevious}>
                                    <Image src={GoogleIcon} alt={'google'} width={20} height={20} />
                                    구글 워크스페이스
                                </Button>
                            </div>
                        </div>
                        <ListPageSearchInput onSearch={onSearch} placeholder={'구성원 검색'} />
                        <div className={'text-right text-sm'}>{selectedMembers.length}명 선택됨</div>
                    </div>

                    <div className={'grid grid-cols-2 gap-2'}>
                        {result.items.map((teamMember) => (
                            <div
                                key={teamMember.id}
                                className={cn(
                                    'p-5 border rounded-md flex items-center justify-between cursor-pointer',
                                    selectedMembers.includes(teamMember.id)
                                        ? 'border-scordi bg-scordi-50'
                                        : 'border-gray-200 bg-gray-50',
                                )}
                                onClick={() => checkTeamMember(teamMember.id)}
                            >
                                <div className={'flex items-center justify-start space-x-1'}>
                                    <Checkbox checked={selectedMembers.includes(teamMember.id)} />
                                    <TeamMemberProfileOption item={teamMember} />
                                </div>
                                <div className={'flex items-center justify-start space-x-3'}>
                                    <Image src={SlackIcon} alt={'slack'} width={28} />
                                    <Image src={GmailIcon} alt={'gmail'} width={28} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={'flex justify-center space-x-4'}>
                        <Button size={'xl'} variant={'scordi'} onClick={onNext} className={'w-64'}>
                            다음
                        </Button>
                    </div>
                </div>
            )}
        </Card>
    );
};
