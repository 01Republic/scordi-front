import {MobileTopNav} from '^components/MobileTopNav';
import {AppIconButton} from '^components/AppIconButton';
import {DefaultButton} from '^components/Button';
import {useRouter} from 'next/router';
import {AppSearchPageRoute} from '../search';
import {getOrgMainLayout} from '^layouts/org/mainLayout';

export const AddCompletePageRoute = {
    pathname: '/apps/add/complete',
    path: () => AddCompletePageRoute.pathname,
};

const AddComplete = () => {
    const router = useRouter();

    return (
        <>
            <MobileTopNav title={'서비스 연동하기'} />
            <div className={'px-[20px] py-[40px]'}>
                <div className={'py-[30px] text-center'}>
                    <AppIconButton name={'figma'} icon={'https://picsum.photos/80'} />
                </div>
                <h2>연동이 완료되었어요.</h2>
                <div className={'space-y-4 mt-20'}>
                    <DefaultButton text={'다시 연동하기'} onClick={() => null} />
                    <DefaultButton
                        text={'다른 서비스 연동하기'}
                        color={'white'}
                        onClick={() => router.replace(AppSearchPageRoute.pathname)}
                    />
                </div>
            </div>
        </>
    );
};

AddComplete.getLayout = getOrgMainLayout;
export default AddComplete;
