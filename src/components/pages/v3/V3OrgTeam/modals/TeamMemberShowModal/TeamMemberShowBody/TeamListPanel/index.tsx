import React, {memo} from 'react';
import {useTeams} from '^models/Team/hook';
import {useToast} from '^hooks/useToast';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ContentEmpty} from '^v3/V3OrgHomePage/mobile/ContentEmpty';
import {TeamItem} from './TeamItem';

// import {isOpenNewTeamModalAtom} from '^v3/V3OrgTeam/V3OrgTeamsPage/NewTeamModal/atom';

interface TeamListPanel {
    maxLength?: number | null;
}

export const TeamListPanel = memo((props: TeamListPanel) => {
    // const {isShow, setIsShow} = useModal({isShowAtom: isOpenNewTeamModalAtom});
    const {result} = useTeams();
    const teamMembers = result.items;
    const length = teamMembers.length;
    const {maxLength} = props;
    const {toast} = useToast();

    const onAddButtonClick = () => {
        toast.info('준비중입니다.');
        // setIsShow(true);
        // console.log(isShow);
    };

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <MobileSection.Heading title="팀">
                    <div className="text-sm text-gray-500">
                        <div className="cursor-pointer" onClick={onAddButtonClick}>
                            {length ? '팀 추가' : '팀 없음'}
                        </div>
                    </div>
                </MobileSection.Heading>

                {length ? (
                    <>
                        {teamMembers.map((teamMember, i) => {
                            if (i > (maxLength ?? result.pagination.itemsPerPage)) return;
                            return <TeamItem key={i} item={teamMember} />;
                        })}
                    </>
                ) : (
                    <ContentEmpty text="등록된 팀이 없어요" subtext="눌러서 팀 추가" onClick={onAddButtonClick} />
                )}
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
