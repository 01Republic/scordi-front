import {atom} from 'recoil';

export enum TastingTabs {
    SyncWorkspace,
    InvoiceTracker,
}

export const navTabIndex = atom<TastingTabs>({
    key: 'tasting/navTabIndex',
    default: TastingTabs.SyncWorkspace,
});
