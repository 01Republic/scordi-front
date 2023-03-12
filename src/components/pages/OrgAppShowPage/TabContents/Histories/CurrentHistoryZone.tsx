import {memo} from 'react';
import {BiGitCommit} from 'react-icons/bi';
import {BsCalendarDay, BsStopwatch} from 'react-icons/bs';
import {ApplicationDto} from '^types/application.type';
import {
    ApplicationSyncHistoryDto,
    restartSyncButtonIsActive,
    syncHistoryAssets,
    SyncHistoryResultStatus,
    t_syncHistoryResultStatus,
} from '^types/applicationSyncHistory.type';
import {IoMdRefresh} from 'react-icons/io';
import {Avatar} from '^components/Avatar';

interface CurrentHistoryZoneProps {
    application: ApplicationDto;
    history: ApplicationSyncHistoryDto;
}

export const CurrentHistoryZone = memo((props: CurrentHistoryZoneProps) => {
    const {application, history} = props;

    if (!history) return <></>;

    const {prototype} = application;

    const asset = syncHistoryAssets[history.resultStatus];
    const Icon = asset.Icon;
    const label = t_syncHistoryResultStatus(history.resultStatus);
    const syncButtonIsActive = restartSyncButtonIsActive(history);

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
                                        <span></span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="w-6">
                                            <Avatar className="border" />
                                        </div>
                                        <p className="text-gray-500">Made by the system schedule.</p>
                                    </div>
                                </div>

                                {/* execute status */}
                                <div className="flex-1">
                                    <div className={`text-${asset.darken} flex gap-3 items-center mb-5`}>
                                        <BiGitCommit size={14} />
                                        <p>
                                            <span className="mr-2">#{history.id}</span>
                                            <span>{label}</span>
                                        </p>
                                    </div>

                                    <div className={`text-gray-500 flex gap-3 items-center`}>
                                        <BsStopwatch size={14} />
                                        <p>Ran for 53 sec</p>
                                    </div>

                                    <div className={`text-gray-500 flex gap-3 items-center`}>
                                        <BsCalendarDay size={14} />
                                        <p>about 2 hours ago</p>
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
