import React, {memo, useState} from 'react';
import {useRouter} from 'next/router';
import {TeamMemberProfile, TeamMemberProfileOption} from '^models/TeamMember/components/TeamMemberProfile';
import {TeamSelect} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamSelect';
import {TeamTag} from '^models/Team/components/TeamTag';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {FaPen, FaPlay} from 'react-icons/fa6';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {debounce} from 'lodash';
import {codefCardApi} from '^models/CodefCard/api';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {newCodefCardConnected} from './atom';

interface NewCodefCardProps {
    codefCard: CodefCardDto;
    staticData: CardAccountsStaticData;
}

export const NewCodefCard = memo((props: NewCodefCardProps) => {
    const {codefCard, staticData} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const [runningProgress, setRunningProgress] = useState(-1);
    const setNewCardConnected = useSetRecoilState(newCodefCardConnected);

    const isRunning = runningProgress > 0;
    const {logo, themeColor} = staticData;

    const cardName = codefCard.resCardName || staticData.displayName;

    const onClick = debounce(() => {
        console.log('codefCard', codefCard);
        updateProgress(1);
        codefCardApi.histories(orgId, codefCard.id, {sync: true});

        function updateProgress(percent: number, duration = 1) {
            setRunningProgress(percent);
            if (percent >= 100) {
                setNewCardConnected(true);
            } else {
                setTimeout(() => {
                    updateProgress(percent + 10);
                }, 1000 * duration);
            }
        }
    });

    return (
        <article className="card py-[24px] px-[16px] flex-row flex items-center justify-between -bg-gray-300/40 bg-white shadow-lg hover:shadow-xl transition-all cursor-pointer">
            <div className="flex items-center gap-1 flex-1">
                <div className="w-[58px] h-[58px] flex items-center justify-center">
                    <div
                        className="flex items-center justify-center rounded-[8px] w-[37px] h-[58px]"
                        style={{backgroundColor: themeColor}}
                    >
                        <img src={logo} alt={cardName} className="avatar w-[26px] h-[26px]" loading="eager" />
                    </div>
                </div>

                <div className="flex-1">
                    <p className="font-bold text-16 text-gray-800 mb-1">{cardName}</p>
                    <div className="text-12 text-gray-500 font-[500]">
                        끝자리: {codefCard.number4} ・ 팀:{' '}
                        <div className="inline-block">
                            <TagUI className="bg-gray-300">미설정</TagUI>
                        </div>
                    </div>
                </div>

                <div className="opacity-30">
                    <TeamMemberProfileOption placeholder="담당자 미설정" />
                </div>
            </div>

            <div className="ml-20 flex items-center gap-1.5">
                {/*<button className="btn btn-square btn-ghost btn-sm">*/}
                {/*    <FaPen className="text-gray-500" />*/}
                {/*</button>*/}
                {runningProgress >= 100 ? (
                    <button
                        className="btn btn-sm !border-none !bg-green-200 !text-green-800"
                        onClick={() => setRunningProgress(-1)}
                    >
                        완료
                    </button>
                ) : !isRunning ? (
                    <button className="btn btn-sm btn-scordi" onClick={onClick}>
                        연결
                    </button>
                ) : (
                    <button
                        className="btn btn-sm btn-ghost loading !bg-transparent !text-scordi"
                        style={{pointerEvents: 'initial'}}
                        onClick={() => {
                            alert('setRunningProgress(100);');
                            setRunningProgress(100);
                        }}
                    >
                        {runningProgress}%
                    </button>
                )}
            </div>
        </article>
    );
});
NewCodefCard.displayName = 'NewCodefCard';
