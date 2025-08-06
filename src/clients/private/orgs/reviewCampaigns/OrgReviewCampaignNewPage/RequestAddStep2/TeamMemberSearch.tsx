import {CreateReviewCampaignRequestDto} from '^models/ReviewCampaign/type';
import {TeamMemberDto} from '^models/TeamMember';
import {Button} from '^public/components/ui/button';
import {Input} from '^public/components/ui/input';
import {cn} from '^public/lib/utils';
import {useTranslation} from 'next-i18next';
import React, {useEffect, useRef} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {TeamMemberSelectItem} from './TeamMemberSelectItem';

interface TeamMemberSearchProps {
    form: UseFormReturn<CreateReviewCampaignRequestDto, any>;
    teamMembers: TeamMemberDto[];
    onSelectMember: (member: TeamMemberDto) => void;
}

export const TeamMemberSearch: React.FC<TeamMemberSearchProps> = ({form, teamMembers, onSelectMember}) => {
    // const [selectedIds] = useRecoilState(createReviewCampaignRequestAtom);
    const {t} = useTranslation('reviewCampaigns');
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [keyword, setKeyword] = React.useState<string>('');
    const [isShow, setIsShow] = React.useState<boolean>(false);
    const selectedIds = form.watch('teamMemberIds') || [];

    const filteredTeamMembers = keyword
        ? teamMembers.filter((member) => member.name && member.name.includes(keyword))
        : teamMembers;

    const selectAllMembers = () => {
        const allSelected = selectedIds.length === teamMembers.length;
        const teamMemberIds = teamMembers.map(({id}) => id);
        form.setValue('teamMemberIds', allSelected ? [] : teamMemberIds);
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
            <div className="w-full relative bg-white z-10" ref={wrapperRef}>
                <Input
                    type={'text'}
                    id={'search'}
                    placeholder={t('teamMember.searchPlaceholder') as string}
                    className={'bg-white'}
                    onChange={(e) => setKeyword(e.target.value)}
                    onFocus={() => setIsShow(true)}
                />
                <div
                    className={cn(
                        'absolute w-full border border-gray-300 bg-white overflow-y-auto mt-1 rounded-md shadow-lg h-80 z-3',
                        isShow ? '' : 'hidden',
                    )}
                >
                    {teamMembers.length === selectedIds.length && (
                        <div className={'py-32 text-center text-gray-500'}>{t('teamMember.noAvailableMembers')}</div>
                    )}
                    {filteredTeamMembers.map(
                        (teamMember) =>
                            !selectedIds.includes(teamMember.id) && (
                                <TeamMemberSelectItem
                                    key={teamMember.id}
                                    teamMember={teamMember}
                                    onSelect={onSelectMember}
                                />
                            ),
                    )}
                </div>
            </div>
            <div className={'flex justify-between items-center text-sm'}>
                <div className={'ml-1'}>
                    {selectedIds.length}
                    {t('common.selected')}
                </div>
                <Button type="button" size={'sm'} variant={'scordiGhost'} onClick={selectAllMembers}>
                    {selectedIds.length === teamMembers.length
                        ? t('teamMember.deselectAll')
                        : t('teamMember.selectAll')}
                </Button>
            </div>
        </>
    );
};
