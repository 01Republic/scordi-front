import React, {memo} from 'react';
import {GoogleTokenDataDto} from '^models/GoogleTokenData/type';
import {Avatar} from '^components/Avatar';
import {VscPlug} from 'react-icons/vsc';
import {useToast} from '^hooks/useToast';

interface GoogleProfileProps {
    lastSyncAccount: GoogleTokenDataDto | undefined;
}

export const GoogleProfile = (props: GoogleProfileProps) => {
    const {lastSyncAccount} = props;

    return (
        <div className="!w-auto gap-4 flex">
            <Avatar
                src={lastSyncAccount?.picture}
                className="w-9 h-9 outline outline-offset-1 outline-slate-100 mt-1"
            />
            <div className="flex-1">
                <p>{lastSyncAccount?.name || <UnknownText />}</p>
                <p className="text-sm font-extralight">
                    {lastSyncAccount?.email || <UnknownText text="xxx@xxx.xxx" />}
                </p>
            </div>
        </div>
    );
};

const UnknownText = memo(({text = '알 수 없음'}: {text?: string}) => {
    return <span className="italic text-gray-400 whitespace-nowrap">{text}</span>;
});

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
