import React, {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {GoogleTokenDataResponseDto, GoogleTokenDataSecureDto} from '^models/GoogleTokenData/type';
import Tippy from '@tippyjs/react';

interface GoogleProfileProps {
    tokenData?: GoogleTokenDataResponseDto | GoogleTokenDataSecureDto;
}
export const GoogleProfile = (props: GoogleProfileProps) => {
    const {tokenData} = props;

    return (
        <div className="!w-auto gap-4 flex">
            <Avatar
                src={tokenData?.picture || undefined}
                className="w-9 h-9 outline outline-offset-1 outline-slate-100 mt-1"
            />
            <div className="flex-1">
                <p>{tokenData?.name || <UnknownText />}</p>
                <p className="text-sm font-extralight">{tokenData?.email || <UnknownText text="xxx@xxx.xxx" />}</p>
            </div>
        </div>
    );
};

export const GoogleProfileSimple = (props: GoogleProfileProps) => {
    const {tokenData} = props;

    return (
        <Tippy
            content={
                <span className="text-12">
                    (id: #{tokenData?.id}) {tokenData?.email}
                </span>
            }
        >
            <div>
                <div className="!w-auto gap-1.5 flex items-center cursor-default">
                    <Avatar
                        src={tokenData?.picture || undefined}
                        className="w-[16px] h-[16px] outline outline-offset-1 outline-slate-100 mt-1"
                    />
                    <div className="flex-1">
                        <p className="text-12">{tokenData?.name || <UnknownText />}</p>
                        {/*<p className="text-12 font-extralight">{tokenData?.email || <UnknownText text="xxx@xxx.xxx" />}</p>*/}
                    </div>
                </div>
            </div>
        </Tippy>
    );
};

const UnknownText = memo(({text = '알 수 없음'}: {text?: string}) => {
    return <span className="italic text-gray-400 whitespace-nowrap">{text}</span>;
});
