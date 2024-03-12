import React, {memo} from 'react';
import {TeamMemberProfileOption} from '^models/TeamMember/components/TeamMemberProfile';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {debounce} from 'lodash';
import {codefCardApi} from '^models/CodefCard/api';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {newCodefCardConnected} from './atom';
import {LoadingDotSeries} from '^v3/share/LoadingDotSeries';
import {useCodefCardConnect} from './useCodefCardConnect';
import {plainToast as toast} from '^hooks/useToast';

interface NewCodefCardProps {
    codefCard: CodefCardDto;
    staticData: CardAccountsStaticData;
}

export const NewCodefCard = memo((props: NewCodefCardProps) => {
    const {codefCard, staticData} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const {runningProgress, runningText, connectingStatus} = useCodefCardConnect(codefCard.id, newCodefCardConnected);

    const {logo, themeColor} = staticData;

    const cardName = codefCard.resCardName || staticData.displayName;

    const onClick = debounce(() => {
        connectingStatus.start();
        codefCardApi.histories(orgId, codefCard.id, {sync: true}).then(() => {
            // 연동 완료시 행동
            toast.success(`${codefCard.number4} 카드 연결 성공!`);
            connectingStatus.finish();
        });
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
                {connectingStatus.isFinished() ? (
                    <button className="btn btn-sm !border-none !bg-green-200 !text-green-800">완료</button>
                ) : connectingStatus.isRunning() ? (
                    <button
                        className="btn btn-sm btn-ghost loading !bg-transparent !text-scordi"
                        style={{pointerEvents: 'initial'}}
                    >
                        {runningProgress}%
                    </button>
                ) : (
                    <button className="btn btn-sm btn-scordi" onClick={onClick}>
                        연결
                    </button>
                )}
                {runningText && (
                    <p className="absolute whitespace-nowrap right-4 bottom-4 text-12 px-1 text-gray-500">
                        <span className="mr-1">{runningText}</span>
                        <LoadingDotSeries speed={2} widthFixed />
                    </p>
                )}
            </div>
        </article>
    );
});
NewCodefCard.displayName = 'NewCodefCard';
