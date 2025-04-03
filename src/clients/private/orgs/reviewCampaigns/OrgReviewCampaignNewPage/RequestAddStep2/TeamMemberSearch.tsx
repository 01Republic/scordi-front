import React, {useEffect, useRef} from 'react';
import {Input} from '^public/components/ui/input';
import {cn} from '^public/lib/utils';
import {TeamMemberDto} from '^models/TeamMember';
import {TeamMemberSelectItem} from './TeamMemberSelectItem';
import {Button} from '^public/components/ui/button';
import {useRecoilState} from 'recoil';
import {createReviewCampaignRequestAtom} from '^clients/private/orgs/reviewCampaigns/OrgReviewCampaignNewPage/atom';

interface TeamMemberSearchProps {
    teamMembers: TeamMemberDto[];
    onSelectMember: (member: TeamMemberDto) => void;
}

export const TeamMemberSearch: React.FC<TeamMemberSearchProps> = ({teamMembers, onSelectMember}) => {
    const [formData, setFormData] = useRecoilState(createReviewCampaignRequestAtom);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [keyword, setKeyword] = React.useState<string>('');
    const [isShow, setIsShow] = React.useState<boolean>(false);

    const filteredTeamMembers = keyword
        ? teamMembers.filter((member) => member.name && member.name.includes(keyword))
        : teamMembers;

    const selectAllMembers = () => {
        const allMembersSelected = formData.teamMemberIds.length === teamMembers.length;
        setFormData((prev) => ({
            ...prev,
            teamMemberIds: allMembersSelected ? [] : teamMembers.map((member) => member.id),
        }));
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsShow(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <>
            <div className={'w-full relative'} ref={wrapperRef}>
                <Input
                    type={'text'}
                    id={'search'}
                    placeholder={'구성원 검색'}
                    className={'bg-white'}
                    onChange={(e) => setKeyword(e.target.value)}
                    onFocus={() => setIsShow(true)}
                />
                <div
                    className={cn(
                        'absolute w-full border border-gray-300 bg-white overflow-y-auto mt-1 rounded-md shadow-lg h-80',
                        isShow ? '' : 'hidden',
                    )}
                >
                    {teamMembers.length === formData.teamMemberIds.length && (
                        <div className={'py-32 text-center text-gray-500'}>선택 가능한 구성원이 없습니다.</div>
                    )}
                    {filteredTeamMembers.map((teamMember) => {
                        if (formData.teamMemberIds.includes(teamMember.id)) return <></>;
                        return (
                            <TeamMemberSelectItem
                                key={teamMember.id}
                                teamMember={teamMember}
                                onSelect={onSelectMember}
                            />
                        );
                    })}
                </div>
            </div>
            <div className={'flex justify-between items-center text-sm'}>
                <div className={'ml-1'}>{formData.teamMemberIds.length}명 선택됨</div>
                <Button size={'sm'} variant={'scordiGhost'} onClick={selectAllMembers}>
                    전체선택 {formData.teamMemberIds.length === teamMembers.length ? '해제' : ''}
                </Button>
            </div>
        </>
    );
};
