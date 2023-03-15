import React, {memo, useEffect, useState} from 'react';
import {AiOutlineSync} from '^components/react-icons';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {getApplication} from '^api/application.api';
import {applicationIdParamState} from '^atoms/common';
import {ConnectStatus} from '^types/application.type';
import {errorNotify} from '^utils/toast-notify';
import {navTabIndex} from './OrgAppShowPage.desktop';

export const CurrentConnectStatus = memo(() => {
    const [appId] = useRecoilState(applicationIdParamState);
    const [connectStatus, setConnectStatus] = useState('');
    const [isSync, setIsSync] = useState(false);
    const setNavTabIndex = useSetRecoilState(navTabIndex);

    useEffect(() => {
        if (!appId || isNaN(appId)) return;

        getApplication(appId)
            .then((res) => setConnectStatus(res.data.connectStatus))
            .catch((err) => errorNotify(err));
    }, [appId]);

    const goSync = () => {
        setIsSync(true);
        // 동기화 작업
        // .then((res) => console.log(res))
        // .catch((err) => errorNotify(err))
        // .finally(() => {
        //     setIsSync(false);
        //     setNavTabIndex(3);
        // });
    };

    return (
        <>
            {connectStatus === ConnectStatus.pending && (
                <div className="badge badge-info badge-outline" title="We're struggling to connecting">
                    {connectStatus}
                </div>
            )}
            {connectStatus === ConnectStatus.success && (
                <div className="flex flex-col">
                    <p className="badge badge-info badge-outline">{connectStatus}</p>
                    <div className="flex">
                        <button className={`btn btn-square ${isSync ? 'loading' : ''}`} onClick={goSync}>
                            {!isSync && <AiOutlineSync />}
                        </button>
                        <button className="btn btn-error">Disconnect</button>
                    </div>
                </div>
            )}
            {/* <div className="flex flex-col gap-3 items-end">
                <div className="badge badge-error badge-outline p-5 font-bold">{connectStatus}</div>
                <div className="flex gap-2">
                    <button
                        className={`btn btn-square btn-error btn-outline ${isSync ? 'loading' : ''}`}
                        onClick={goSync}
                    >
                        {!isSync && <AiOutlineSync size="24px" />}
                    </button>
                    <button className="btn btn-error text-white">Disconnect</button>
                </div>
            </div> */}
            <p className="badge badge-info badge-outline p-5 font-bold" title="We're struggling to connecting">
                {connectStatus}
            </p>
        </>
    );
});
