import {Icon} from "^components/Icon";
import React from "react";
import { useRouter } from "next/router";
import { isMobile } from 'react-device-detect';

type MobileTopNavProps = {
    title: string;
    noBack?: boolean;
}

export const MobileTopNav = (props: MobileTopNavProps) => {
    const router = useRouter();

    if (!isMobile) return null;
    return (
        <div className={'flex sticky top-0 p-[20px] border-b items-center justify-between'}>
            {props.noBack ? (
                <div className={'w-[24px]'}/>
            ) : (
                <Icon.ChevronLeft onClick={() => router.back()}/>
            )}
            <p className={'font-bold text-[17px]'}>{props.title}</p>
            <div className={'w-[24px]'}/>
        </div>
    )
}
