import {useRouter} from "next/router";
import {MobileTopNav} from "^components/MobileTopNav";
import {SummaryListItem} from "^components/summaryListItem";

export const SummaryPageRoute = {
    pathname: '/orgs/:id/summary',
    path: (id: string) => SummaryPageRoute.pathname.replace(':id', id),
}

const SummaryPage = () => {
    const router = useRouter();

    return (
        <>
            <MobileTopNav title={'상세보기'}/>
            <div className={'px-[20px] py-[40px]'}>
                <p>이번달 총 비용</p>
                <h2 className={'my-[20px]'}>1,000,000원</h2>
                <SummaryListItem title={'오늘까지 결제된 금액'} value={'1,000,000원'}/>
                <SummaryListItem title={'오늘까지 결제된 금액'} value={'1,000,000원'}/>
                <SummaryListItem title={'오늘까지 결제된 금액'} value={'1,000,000원'}/>
                <SummaryListItem title={'오늘까지 결제된 금액'} value={'1,000,000원'}/>
            </div>
        </>
    )
}

export default SummaryPage