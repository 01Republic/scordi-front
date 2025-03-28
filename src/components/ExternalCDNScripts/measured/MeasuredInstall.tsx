import {useEffect} from 'react';
import Measured from '@measured-im/browser';
import {measuredApiKey} from '^config/environments';

export const MeasuredInstall = () => {
    if (!measuredApiKey) return <></>;

    useEffect(() => {
        // @ts-ignore
        if (!window.measuredInstalled) {
            // @ts-ignore
            window.measuredInstalled = true;

            Measured.install(measuredApiKey);
        }
    }, []);
    return <></>;
};
