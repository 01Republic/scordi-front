import {MobileTopNav} from "^components/MobileTopNav";
import {SummaryListItem} from "^components/summaryListItem";
import Image from "next/image";

export const AppInfoPageRoute = {
    pathname: '/orgs/:id/apps/:appId',
    path: (id: string, appId: string) => AppInfoPageRoute.pathname.replace(':id', id).replace(':appId', appId),
}

const AppInfoPage = () => {
    return (
        <>
            <MobileTopNav title={'구독 정보'}/>
            <div className={'px-[20px] py-[40px]'}>
                <Image src={'https://picsum.photos/80'} width={80} height={80}/>
                <h2 className={'my-[20px]'}>Figma</h2>
                <p>구독시작일 : 2022년 11월 11일</p>
                <SummaryListItem title={'2022년 11월 11일'} value={'1,000,000원'}/>
                <SummaryListItem title={'2022년 11월 11일'} value={'1,000,000원'}/>
                <SummaryListItem title={'2022년 11월 11일'} value={'1,000,000원'}/>
                <SummaryListItem title={'2022년 11월 11일'} value={'1,000,000원'}/>
            </div>
        </>
    )
}

export default AppInfoPage