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
import {MoreDropdown} from '^v3/V3OrgSettingsConnectsPage/MoreDropdown';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {useAlert} from '^hooks/useAlert';
import {plainToast as toast} from '^hooks/useToast';

interface ConnectedCodefCardProps {
    codefCard: ConnectedCodefCardDto;
    staticData: CardAccountsStaticData;
    afterSync?: () => any;
}

export const ConnectedCodefCard = memo((props: ConnectedCodefCardProps) => {
    const {codefCard, staticData, afterSync} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const [isSyncLoading, setIsSyncLoading] = useState(false);
    const [runningProgress, setRunningProgress] = useState(-1);
    const setCodefCardConnected = useSetRecoilState(codefCardConnected);
    const [selectedCodefCard, selectCodefCard] = useRecoilState(selectedCodefCardAtom);
    const creditCard = codefCard.creditCard;
    const isSelected = !!selectedCodefCard && selectedCodefCard.id === codefCard.id;
    const {alert} = useAlert();

    const {logo, themeColor} = staticData;

    const cardName = creditCard.name || '';

    const onClick = debounce(() => {
        selectCodefCard(codefCard);
    });

    const onSync = ({hide}: {hide: () => any}) => {
        if (isSyncLoading) return;

        if (confirm('다소 시간이 걸리는 작업입니다. 그래도 실행할까요?')) {
            setIsSyncLoading(true);
            toast.success('동기화를 시작했어요.');
            codefCardApi
                .histories(orgId, codefCard.id, {sync: true})
                .then(() => {
                    toast.success(`${codefCard.number4} 동기화 완료!`);
                    setIsSyncLoading(false);
                    hide();
                    afterSync && afterSync();
                })
                .catch(() => {
                    toast.error(`문제가 발생했습니다 :(\n관리자게에 문의해주세요.`);
                    setIsSyncLoading(false);
                    hide();
                });
        } else {
            hide();
        }
    };

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
                <div className="flex items-center justify-center pl-4">
                    <MoreDropdown
                        onSync={onSync}
                        isSyncLoading={isSyncLoading}
                        // Profile={() => (
                        //     <div className="border-b py-2 mb-2 px-3">
                        //         <p className="text-11">마지막 동기화</p>
                        //         <p className="text-13">{yyyy_mm_dd_hh_mm(.updatedAt)}</p>
                        //     </div>
                        // )}
                    />
                </div>
            </div>
        </article>
    );
});
ConnectedCodefCard.displayName = 'ConnectedCodefCard';
