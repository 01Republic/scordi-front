import React, {memo, useEffect, useState} from 'react';
import {AiOutlineSync, BsFillCaretDownFill, BsTrash} from '^components/react-icons';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {ConnectStatus} from '^types/application.type';
import {navTabIndex} from './OrgAppShowPage.desktop';
import {useCurrentApplication} from '^hooks/useApplications';

export const CurrentConnectStatus = memo(() => {
    const {currentApplication} = useCurrentApplication();
    const [isSync, setIsSync] = useState(false);
    const setNavTabIndex = useSetRecoilState(navTabIndex);

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

    const connectStatus = currentApplication ? currentApplication.connectStatus : '';
    console.log('connectStatus', connectStatus);

    return (
        <>
            {connectStatus === ConnectStatus.pending && (
                <div className="badge badge-info badge-outline" title="We're struggling to connecting">
                    {connectStatus}
                </div>
            )}
            {connectStatus === ConnectStatus.success && (
                <div className="dropdown dropdown-end dropdown-hover">
                    <label tabIndex={0} className="btn btn-green-500 btn-outline shadow gap-2">
                        <span className="normal-case">Connected</span>
                        <BsFillCaretDownFill size={11} className="-mr-1" />
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a onClick={goSync}>
                                <AiOutlineSync /> Sync again
                            </a>
                        </li>
                        <li className="menu-title pt-3">
                            <span>Warning</span>
                        </li>
                        <li>
                            <a className="text-red-600 hover:bg-red-600 hover:text-white">
                                <BsTrash /> Remove
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
