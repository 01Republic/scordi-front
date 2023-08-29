import {memo, useEffect} from 'react';
import {BiGitCommit, BsCalendarDay, BsStopwatch, IoMdRefresh} from '^components/react-icons';
import {SubscriptionDto} from '^types/subscription.type';
import {
    restartSyncButtonIsActive,
    syncHistoryAssets,
    t_syncHistoryResultStatus,
} from '^types/subscriptionSyncHistory.type';
import {Avatar} from '^components/Avatar';
import {getDistanceOfTime, humanizeTimeDistance} from '^utils/dateTime';
import {useCurrentSyncHistory} from '^hooks/useSubscriptionSyncHistories';

interface CurrentHistoryZoneProps {
    application: SubscriptionDto;
}

export const CurrentHistoryZone = memo((props: CurrentHistoryZoneProps) => {
    const {application} = props;
    const {currentSyncHistory, fetchCurrentSyncHistory} = useCurrentSyncHistory();

    useEffect(() => {
        if (!application) return;
        fetchCurrentSyncHistory(application.id);
    }, [application]);

    if (!currentSyncHistory) return <></>;

    const {prototype} = application;

    const asset = syncHistoryAssets[currentSyncHistory.resultStatus];
    const Icon = asset.Icon;
    const label = t_syncHistoryResultStatus(currentSyncHistory.resultStatus);
    const syncButtonIsActive = restartSyncButtonIsActive(currentSyncHistory);

    const madeByMsg = (() => {
        const {isScheduled, runner} = currentSyncHistory;
        if (!isScheduled && runner) return `Made by ${runner.name}`;

        return `Made by the system schedule.`;
    })();

    const durationMsg = (() => {
        if (currentSyncHistory.finishedAt === null) return 'Running ...';

        const distance = getDistanceOfTime(
            new Date(currentSyncHistory.createdAt),
            new Date(currentSyncHistory.finishedAt),
        );
        const distanceText = humanizeTimeDistance(distance, {text: {minute: 'min', second: 'sec'}});
        return `Ran for ${distanceText} ago`;
        // const distanceText = humanizeTimeDistance(distance, {text: {hour: '시간', minute: '분', second: '초'}});
        // return `${distanceText} 동안 실행됨`;
    })();

    const finishedAgoMsg = (() => {
        const distance = getDistanceOfTime(new Date(currentSyncHistory.createdAt), new Date());
        const distanceText = humanizeTimeDistance(distance, {shorten: true});
        return `about ${distanceText} ago`;
    })();

    return (
        <div className="bs-container mb-10">
            <div className="bs-row mb-3">
                <div className="bs-col-12 px-0">
                    <div className="card w-full bg-white shadow border">
                        <div className={`card-body border-l border-l-[1rem] border-l-${asset.normal}`}>
                            <div className="flex gap-2 items-stretch">
                                <div>
                                    <Icon size={22} className={`text-${asset.darken}`} />
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <div className="flex-1">
                                        <p className={`card-title text-${asset.darken} leading-none`}>Current sync</p>
                                        <div
                                            className="text-sm pt-4 pb-6 whitespace-pre-line"
                                            dangerouslySetInnerHTML={{__html: currentSyncHistory.content}}
                                        />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="w-6">
                                            <Avatar className="border" />
                                        </div>
                                        <p className="text-gray-500">{madeByMsg}</p>
                                    </div>
                                </div>

                                {/* execute status */}
                                <div className="flex-1">
                                    <div className={`text-${asset.darken} flex gap-3 items-center mb-5`}>
                                        <BiGitCommit size={14} />
                                        <p>
                                            <span className="mr-2">#{currentSyncHistory.id}</span>
                                            <span>{label}</span>
                                        </p>
                                    </div>

                                    <div className={`text-gray-500 flex gap-3 items-center`}>
                                        <BsStopwatch size={14} />
                                        <p>{durationMsg}</p>
                                    </div>

                                    <div className={`text-gray-500 flex gap-3 items-center`}>
                                        <BsCalendarDay size={14} />
                                        <p>{finishedAgoMsg}</p>
                                    </div>
                                </div>

                                {/* restart sync */}
                                <div>
                                    <button
                                        className="btn btn-xs btn-gray btn-outline normal-case gap-2"
                                        disabled={!syncButtonIsActive}
                                    >
                                        <IoMdRefresh size={14} />
                                        <span>Restart sync</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
