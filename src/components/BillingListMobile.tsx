import {ApplicationDto} from "^types/application.type";
import {useEffect, useState} from "react";
import {router} from "next/client";
import {AppInfoPageRoute} from "^pages/orgs/[id]/apps/[appId]";

type BillingListMobileProps = {
    apps: ApplicationDto[];
}

export const BillingListMobile = (props: BillingListMobileProps) => {
    const [beforeApps, setBeforeApps] = useState<ApplicationDto[]>([]);
    const [afterApps, setAfterApps] = useState<ApplicationDto[]>([]);

    useEffect(() => {
        // TODO: 결제 전 후 구분해서 따로 aaray에 담기
        setBeforeApps(props.apps);
    }, [props.apps])

    return (
        <>
            {afterApps.length > 0 && (
                <>
                    <BillingListTitle title={'앞으로 결제될 금액'} price={1000}/>
                    {afterApps.map((app, index) => (
                        <BillingListMobileItem app={app} key={index} onClick={() => router.push(AppInfoPageRoute.path('1', '1'))}/>
                    ))}
                </>
            )}
            {beforeApps.length > 0 && (
                <>
                    <BillingListTitle title={'지금까지 결제한 금액'} price={1000}/>
                    {beforeApps.map((app, index) => (
                        <BillingListMobileItem app={app} key={index} onClick={() => router.push(AppInfoPageRoute.path('1', '1'))}/>
                    ))}
                </>
            )}
        </>
    )
}



type BillingListTitleProps = {
    title: string;
    price: number;
}

const BillingListTitle = (props: BillingListTitleProps) => {
    return (
        <div className={'flex justify-between text-[15px]'}>
            <p className={'text-[#6D7684]'}>{props.title}</p>
            <p className={'font-bold'}>{props.price.toLocaleString()}원</p>
        </div>
    )
}



type BillingListMobileItemProps = {
    app: ApplicationDto;
    onClick?: () => void;
}

const BillingListMobileItem = (props: BillingListMobileItemProps) => {
    return (
        <div className={'flex bg-[#F9FAFB] rounded-[14px] p-[14px] items-center'}
             onClick={props.onClick}
        >
            <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                    <img src={props.app.prototype.image} alt={`${props.app.prototype.name} logo`}/>
                </div>
            </div>
            <div className={'pl-[10px]'}>
                <p className={'text-[#8D95A1] font-semibold'}>{props.app.prototype.name}</p>
                <p className="font-bold">
                    {(156000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    원
                </p>
            </div>
            <div className={'flex-1'}/>
            <div className={'p-[10px] bg-[#F3F0FF] rounded-[12px]'}>
                <p className={'text-[#7963F7] font-bold'}>10월 30일</p>
            </div>
        </div>
    )
}