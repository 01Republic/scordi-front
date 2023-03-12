import {memo} from 'react';
import {ApplicationDto} from '^types/application.type';
import {HistoryItem} from '^components/pages/OrgAppShowPage/TabContents/Histories/HistoryItem';
import {SyncNowButton} from '^components/pages/OrgAppShowPage/TabContents/Histories/SyncNowButton';
import {mockSyncHistoryList as syncHistories} from '^types/applicationSyncHistory.type';

interface HistoryTableProps {
    application: ApplicationDto;
}

export const HistoryTable = memo((props: HistoryTableProps) => {
    const {application} = props;

    const {prototype} = application;

    const currentHistory = syncHistories[0];

    return (
        <div className="bs-container mb-10">
            <div className="bs-row items-center mb-4">
                {/* Left */}
                <div>
                    <h3 className="leading-none">Sync Histories</h3>
                </div>

                {/* Right */}
                <div className="ml-auto flex gap-2">
                    <SyncNowButton application={application} history={currentHistory} />
                </div>
            </div>

            <div className="bs-row mb-4">
                <div className="bs-col-12 px-0">
                    <div className="card w-full bg-white shadow border">
                        <div className="card-body p-0 overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Status</th>
                                        <th>Sync ID</th>
                                        <th style={{width: '50%'}}>Name</th>
                                        <th>Duration</th>
                                        <th>Finished at</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {syncHistories.map((history, i) => (
                                        <HistoryItem key={i} application={application} history={history} />
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/*<div className="card-body py-3 border-t">*/}
                        {/*    <div className="btn-group ml-auto">*/}
                        {/*        <button className="btn">1</button>*/}
                        {/*        <button className="btn btn-active">2</button>*/}
                        {/*        <button className="btn">3</button>*/}
                        {/*        <button className="btn">4</button>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>

            <div className="bs-row">
                <div className="bs-col-12 px-0">
                    <div className="flex justify-end gap-3">
                        <div className="btn-group border shadow rounded-lg">
                            <button className="btn">1</button>
                            <button className="btn btn-active">2</button>
                            <button className="btn">3</button>
                            <button className="btn">4</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
