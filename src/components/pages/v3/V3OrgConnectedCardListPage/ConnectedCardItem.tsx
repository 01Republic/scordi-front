import React, {memo} from 'react';
import {cardAccountsStaticData} from '^v3/V3OrgConnectsPage/ConnectsPageBody/ConnectCardAccountsSection/card-accounts-static-data';
import {useRouter} from 'next/router';
import {TeamMemberProfile, TeamMemberProfileOption} from '^models/TeamMember/components/TeamMemberProfile';
import {TeamSelect} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamSelect';
import {TeamTag} from '^models/Team/components/TeamTag';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {FaPen, FaPlay} from 'react-icons/fa6';

interface ConnectedCardItemProps {
    card: any;
}

export const ConnectedCardItem = memo((props: ConnectedCardItemProps) => {
    const {} = props;
    const router = useRouter();
    const connectMethodParam = router.query.connectMethod as string;
    const connectMethod = cardAccountsStaticData.find((data) => data.param === connectMethodParam);

    if (!connectMethod) return <></>;

    const {logo, connectMethodName: cardName, themeColor} = connectMethod;

    return (
        <article className="card py-[24px] px-[16px] flex-row flex items-center justify-between bg-gray-300/40">
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
                    <p className="font-bold text-16 text-gray-800 mb-1">KB국민카드 StarBiz SME</p>
                    <div className="text-12 text-gray-500 font-[500]">
                        끝자리: 9880 ・ 팀:{' '}
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
                <button className="btn btn-scordi btn-sm">연결</button>
            </div>
        </article>
    );
});
ConnectedCardItem.displayName = 'ConnectedCardItem';
