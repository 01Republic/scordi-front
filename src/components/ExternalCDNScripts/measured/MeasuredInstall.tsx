import {useEffect} from 'react';
import Measured from '@measured-im/browser';
import {measuredApiKey} from '^config/environments';

export const MeasuredInstall = () => {
    useEffect(() => {
        if (measuredApiKey) Measured.install(measuredApiKey);
    }, []);
    return <></>;
};
