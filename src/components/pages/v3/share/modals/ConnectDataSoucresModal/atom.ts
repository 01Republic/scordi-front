import {atom} from 'recoil';

export const connectDataSourcesModalState = {
    isShowAtom: atom({
        key: 'v3/connectDataSourcesModal/IsShow',
        default: false,
    }),
    popStateSyncKey: 'connectDataSourcesModal',
};
