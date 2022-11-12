import {MobileTopNav} from "^components/MobileTopNav";
import {AppIconButton} from "^components/AppIconButton";
import {SearchInput} from "^components/SearchInput";
import {useRouter} from "next/router";
import {AddServicePageRoute} from "^pages/apps/add/[id]";

export const AppSearchPageRoute = {
    pathname: '/apps/search',
    path: () => AppSearchPageRoute.pathname,
}

const AppSearchPage = () => {
    const router = useRouter();

    return (
        <>
            <MobileTopNav title={'서비스 연동하기'}/>
            <div className={'px-[20px] py-[40px]'}>
                <h2>어떤 서비스를 등록하시겠어요?</h2>
                <div className={'py-[20px]'}>
                    <SearchInput onSubmit={() => null}/>
                </div>
                <p>추천 서비스</p>
                <div className={'py-[20px]'}>
                    <AppIconButton name={'figma'}
                                   icon={'https://picsum.photos/80'}
                                   onClick={() => router.push(AddServicePageRoute.path('1'))}
                    />
                    <AppIconButton name={'figma'}
                                   icon={'https://picsum.photos/80'}/>
                    <AppIconButton name={'figma'}
                                   icon={'https://picsum.photos/80'}/>
                    <AppIconButton name={'figma'}
                                   icon={'https://picsum.photos/80'}/>
                    <AppIconButton name={'figma'}
                                   icon={'https://picsum.photos/80'}/>
                    <AppIconButton name={'figma'}
                                   icon={'https://picsum.photos/80'}/>
                </div>
            </div>
        </>
    )
}

export default AppSearchPage