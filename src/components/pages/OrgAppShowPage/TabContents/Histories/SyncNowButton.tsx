import {memo} from 'react';
import {ButtonTo} from '^components/ButtonTo';
import {ApplicationDto} from '^types/application.type';
import {ApplicationSyncHistoryDto, restartSyncButtonIsActive} from '^types/applicationSyncHistory.type';

interface SyncNowButtonProps {
    application: ApplicationDto;
    history: ApplicationSyncHistoryDto;
}

export const SyncNowButton = memo((props: SyncNowButtonProps) => {
    const {application, history} = props;

    const {prototype} = application;

    const isActive = history ? restartSyncButtonIsActive(history) : true;

    const onClick = () => {
        console.log(1);
    };

    return <ButtonTo text="Sync Now" color="success" disabled={!isActive} onClick={onClick} />;
});
