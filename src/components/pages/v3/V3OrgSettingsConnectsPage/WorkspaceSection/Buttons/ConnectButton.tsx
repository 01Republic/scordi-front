import React from 'react';
import {Plug} from 'lucide-react';

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
                <Plug size={18} className="mr-1" />
                연동하기
            </button>
        </span>
    );
};
