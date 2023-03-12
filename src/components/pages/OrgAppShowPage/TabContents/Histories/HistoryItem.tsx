import {memo} from 'react';
import {IoMdRefresh} from 'react-icons/io';
import {ApplicationDto} from '^types/application.type';
import {HistoryStatusButton} from './HistoryStatusButton';
import {ApplicationSyncHistoryDto, SyncHistoryResultStatus} from '^types/applicationSyncHistory.type';

interface HistoryItemProps {
    application: ApplicationDto;
    history: ApplicationSyncHistoryDto;
}

export const HistoryItem = memo((props: HistoryItemProps) => {
    const {application, history} = props;

    const {prototype} = application;

    return (
        <tr className="text-sm">
            {/*Status*/}
            <td>
                <HistoryStatusButton status={history.resultStatus} />
            </td>

            {/*Sync ID*/}
            <td className="font-semibold">#{history.id}</td>

            {/*Name*/}
            <td>{prototype.name}</td>

            {/*Duration*/}
            <td>34 seconds</td>

            {/*Finished at*/}
            <td>7 days ago</td>

            {/*Actions*/}
            <td>
                <button className="btn btn-sm btn-circle btn-ghost">
                    <IoMdRefresh size={20} />
                </button>
            </td>
        </tr>
    );
});
