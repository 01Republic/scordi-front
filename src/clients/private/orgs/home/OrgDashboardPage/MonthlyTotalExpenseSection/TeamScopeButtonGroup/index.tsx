import {TeamDto} from '^models/Team/type';
import {memo, useEffect, useState} from 'react';
import {TeamScopeButton} from './TeamScopeButton';
import {ScrollLeftButton} from './ScrollLeftButton';
import {ScrollRightButton} from './ScrollRightButton';

interface TeamScopeButtonGroupProps {
    teams: TeamDto[];
    selectedTeam?: TeamDto;
    onSelect: (team?: TeamDto) => any;
}

export const TeamScopeButtonGroup = memo((props: TeamScopeButtonGroupProps) => {
    const {teams, selectedTeam, onSelect} = props;
    const [isExpended, setIsExpended] = useState(false); // 펼치기/접기
    const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);

    return (
        <div className="relative">
            <div className="absolute right-0 bottom-full py-4">
                <button type="button" className="text-12 link" onClick={() => setIsExpended((v) => !v)}>
                    {isExpended ? '접기' : '펼치기'}
                </button>
            </div>

            {!isExpended && scrollContainer && <ScrollLeftButton scrollContainer={scrollContainer} />}

            <div className="flex-1 min-w-0">
                <div
                    ref={(elem) => setScrollContainer(elem)}
                    className={`flex items-center gap-2  ${
                        isExpended ? 'overflow-visible flex-wrap' : 'overflow-auto no-scrollbar'
                    }`}
                    style={{scrollBehavior: 'smooth'}}
                >
                    <TeamScopeButton
                        text="전체"
                        onClick={() => onSelect(undefined)}
                        active={selectedTeam === undefined}
                    />
                    {teams.map((team) => (
                        <TeamScopeButton
                            key={team.id}
                            text={team.name}
                            onClick={() => onSelect(team)}
                            active={selectedTeam?.id === team.id}
                        />
                    ))}
                </div>
            </div>

            {!isExpended && scrollContainer && <ScrollRightButton scrollContainer={scrollContainer} />}
        </div>
    );
});
