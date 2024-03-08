import React, {memo, useState} from 'react';
import {useRouter} from 'next/router';
import {TeamMemberProfile, TeamMemberProfileOption} from '^models/TeamMember/components/TeamMemberProfile';
import {TeamSelect} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamSelect';
import {TeamTag} from '^models/Team/components/TeamTag';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {FaPen, FaPlay} from 'react-icons/fa6';
import {ConnectedCodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {debounce} from 'lodash';
import {codefCardApi} from '^models/CodefCard/api';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {codefCardConnected, selectedCodefCardAtom} from './atom';

interface ConnectedCodefCardProps {
    codefCard: ConnectedCodefCardDto;
    staticData: CardAccountsStaticData;
}

export const ConnectedCodefCard = memo((props: ConnectedCodefCardProps) => {
    const {codefCard, staticData} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const [runningProgress, setRunningProgress] = useState(-1);
    const setCodefCardConnected = useSetRecoilState(codefCardConnected);
    const [selectedCodefCard, selectCodefCard] = useRecoilState(selectedCodefCardAtom);
    const creditCard = codefCard.creditCard;

    const isRunning = runningProgress > 0;
    const {logo, themeColor} = staticData;
    const isSelected = !!selectedCodefCard && selectedCodefCard.id === codefCard.id;

    const cardName = creditCard.name || '';

    const onClick = debounce(() => {
        selectCodefCard(codefCard);
    });

    return (
        <article
            className={`card py-[24px] px-[16px] flex-row flex items-center justify-between bg-white shadow hover:shadow-xl transition-all cursor-pointer ${
                isSelected ? 'bg-indigo-50' : 'hover:bg-white'
            }`}
            onClick={onClick}
        >
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
                    <div className="text-12 text-gray-500 font-[500]">끝자리: {creditCard.numbers.number4}</div>
                </div>

                <div className="opacity-30">{/*<TeamMemberProfileOption placeholder="담당자 미설정" />*/}</div>
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
                        동기화
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
ConnectedCodefCard.displayName = 'ConnectedCodefCard';
