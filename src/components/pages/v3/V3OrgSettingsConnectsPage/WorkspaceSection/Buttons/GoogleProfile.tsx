import React, {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {GoogleTokenDataResponseDto} from '^models/GoogleTokenData/type';

interface GoogleProfileProps {
    tokenData?: GoogleTokenDataResponseDto;
}
export const GoogleProfile = (props: GoogleProfileProps) => {
    const {tokenData} = props;

    return (
        <div className="!w-auto gap-4 flex">
            <Avatar src={tokenData?.picture} className="w-9 h-9 outline outline-offset-1 outline-slate-100 mt-1" />
            <div className="flex-1">
                <p>{tokenData?.name || <UnknownText />}</p>
                <p className="text-sm font-extralight">{tokenData?.email || <UnknownText text="xxx@xxx.xxx" />}</p>
            </div>
        </div>
    );
};

const UnknownText = memo(({text = '알 수 없음'}: {text?: string}) => {
    return <span className="italic text-gray-400 whitespace-nowrap">{text}</span>;
});
