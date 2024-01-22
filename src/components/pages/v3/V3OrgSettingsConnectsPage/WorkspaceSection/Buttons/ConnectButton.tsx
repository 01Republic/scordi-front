import React from 'react';
import {useToast} from '^hooks/useToast';
import {VscPlug} from 'react-icons/vsc';

export const ConnectButton = () => {
    const {toast} = useToast();

    return (
        <span onClick={() => toast.info('준비중입니다.')}>
            <button disabled={true} className="btn btn-sm !border !border-gray-200 font-normal w-fit px-5">
                <VscPlug size={18} className="mr-1" />
                연동하기
            </button>
        </span>
    );
};
