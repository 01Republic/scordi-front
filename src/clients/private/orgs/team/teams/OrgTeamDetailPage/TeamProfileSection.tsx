import React, {memo} from 'react';
import {TeamAvatar} from './TeamAvatar';
import {useCurrentTeam} from '^models/Team/hook';
import {prompt2} from '^components/util/dialog';
import {Pen, Users} from 'lucide-react';

export const TeamProfileSection = memo(() => {
    const {team, update} = useCurrentTeam();

    const editTeamName = async () => {
        if (!team) return;
        const result = await prompt2(`변경할 팀 이름을 입력해주세요`, () => null, {
            inputValue: team.name,
            inputPlaceholder: team.name,
        });

        if (!result.isConfirmed) return;
        if (!result.value) return;

        return update({name: result.value});
    };

    return (
        <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg p-4 gap-2 mb-2">
            <div className="relative">
                <TeamAvatar name={team?.name || ''} className="w-20 h-20 text-3xl" />
                <div className="absolute bottom-0 right-0 btn btn-xs btn-scordi btn-square border shadow animate-none">
                    <Users />
                </div>
            </div>

            <div
                className="group relative cursor-pointer rounded-lg px-3 hover:bg-slate-100 active:bg-slate-200 transition"
                onClick={editTeamName}
            >
                <h3 className="inline-block text-lg font-semibold">{team?.name || '-'}</h3>
                <button className="opacity-0 group-hover:opacity-100 absolute top-0 bottom-[3px] right-[-15px] transition">
                    <Pen fontSize={10} />
                </button>
            </div>
        </div>
    );
});
TeamProfileSection.displayName = 'TeamProfileSection';
