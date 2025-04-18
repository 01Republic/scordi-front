import React, {memo, useCallback, useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {ConnectStatus} from 'src/models/Subscription/types';
import {navTabIndex} from './OrgAppShowPage.desktop';
import {useCurrentSubscription} from '^models/Subscription/hook';
import {toast} from 'react-toastify';
import {useCurrentUser} from '^models/User/hook';
import {useCurrentSyncHistory, useSyncHistoryList} from '^models/SubscriptionSyncHistory/hook';
import {syncHistory} from '^models/SubscriptionSyncHistory/api';
import {ChevronDown, RotateCw, Trash} from 'lucide-react';

export const CurrentConnectStatus = memo(() => {
    const {currentUser} = useCurrentUser();
    const {currentSubscription, reload: reloadCurrentApp} = useCurrentSubscription();
    const {fetchItems: fetchSyncHistories, pagination} = useSyncHistoryList();
    const {fetchCurrentSyncHistory} = useCurrentSyncHistory();
    const tabIndex = useRecoilValue(navTabIndex);

    const goSync = useCallback(() => {
        if (!currentSubscription || !currentUser) return;
        syncHistory
            .create(currentSubscription.id, {
                runnerId: currentUser.id,
                content: `Synchronize manually.`,
            })
            .then(() => {
                toast.success('New Sync started!');
                if (tabIndex === 3) {
                    // if current tab is histories
                    fetchSyncHistories(currentSubscription.id, pagination.currentPage, true);
                    fetchCurrentSyncHistory(currentSubscription.id);
                }
                reloadCurrentApp();
            });
    }, [currentSubscription, currentUser, tabIndex]);

    const connectStatus = currentSubscription ? currentSubscription.connectStatus : '';
    const isSyncRunning = currentSubscription?.isSyncRunning;

    if (isSyncRunning) {
        return (
            <div className="btn btn-orange-600 loading" title="We're struggling to connecting">
                Sync running ...
            </div>
        );
    }

    return (
        <>
            {connectStatus === ConnectStatus.pending && (
                <div className="btn btn-info btn-outline" title="We're struggling to connecting">
                    {connectStatus}
                </div>
            )}
            {connectStatus === ConnectStatus.success && (
                <div className="dropdown dropdown-end dropdown-hover">
                    <label tabIndex={0} className="btn btn-green-500 btn-outline shadow gap-2">
                        <span className="normal-case">Connected</span>
                        <ChevronDown size={11} className="-mr-1" />
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a onClick={goSync}>
                                <RotateCw /> Sync again
                            </a>
                        </li>
                        <li className="menu-title pt-3">
                            <span>Warning</span>
                        </li>
                        <li>
                            <a className="text-red-600 hover:bg-red-600 hover:text-white">
                                <Trash /> Remove
                            </a>
                        </li>
                    </ul>
                </div>
            )}
            {connectStatus === '' && (
                <p className="badge badge-info badge-outline p-5 font-bold" title="We're struggling to connecting">
                    {connectStatus}
                </p>
            )}
        </>
    );
});
