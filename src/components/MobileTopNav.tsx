import {Icon} from '^components/Icon';
import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {isMobile} from 'react-device-detect';

type MobileTopNavProps = {
    title: string;
    noBack?: boolean;
};

export const MobileTopNav = (props: MobileTopNavProps) => {
    const router = useRouter();
    const [mobile, setMobile] = React.useState(false);

    useEffect(() => {
        // 일단 무조건 모바일로 인식되도록 설정
        setMobile(true);
        // setMobile(isMobile);
    }, [isMobile]);

    return mobile ? (
        <div className={'flex sticky top-0 p-[20px] border-b items-center justify-between bg-white z-40'}>
            {props.noBack ? <div className={'w-[24px]'} /> : <Icon.ChevronLeft onClick={() => router.back()} />}
            <p className={'font-bold text-[17px]'}>{props.title}</p>
            <div className={'w-[24px]'} />
        </div>
    ) : (
        <div className={'px-[20px] py-[30px]'}>
            <p className={'font-bold text-[24px]'}>{props.title}</p>
        </div>
    );
};

export const MobileViewContainer = (props: {children: React.ReactNode}) => {
    return (
        <div id="MobileViewContainer" className={'p-[20px] pb-[120px]'}>
            {props.children}
        </div>
    );
};
