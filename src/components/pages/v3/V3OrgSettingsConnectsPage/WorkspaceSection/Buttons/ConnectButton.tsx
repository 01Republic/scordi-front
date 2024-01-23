import React from 'react';
import {VscPlug} from 'react-icons/vsc';

interface ConnectButtonProps {
    onClick?: () => void;
    isDisabled?: boolean;
}
export const ConnectButton = (props: ConnectButtonProps) => {
    const {onClick, isDisabled} = props;

    return (
        <span onClick={() => onClick && onClick()}>
            <button
                disabled={isDisabled ?? true}
                className="btn btn-sm !border !border-gray-200 font-normal w-fit px-5"
            >
                <VscPlug size={18} className="mr-1" />
                연동하기
            </button>
        </span>
    );
};
