import {memo} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {currentUserAtom} from '^models/User/atom';
import {MainPageRoute} from '^pages/index';
import {ErrorLayout} from './ErrorLayout';
import Image from 'next/image';
import whiteBgLogo from 'src/images/whiteBgLogo.png';

export const ErrorExceptionPage = memo(() => {
    const router = useRouter();
    const currentUser = useRecoilValue(currentUserAtom);

    const onClick = () => {
        currentUser ? router.back() : router.replace(MainPageRoute.path());
    };

    return (
        <ErrorLayout hideNav hideFooter>
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <Image src={whiteBgLogo} alt="로고" width={200} height={200} className="animate-spin" />
                    <p className="text-3xl mt-8 font-semibold">예상치 못한 오류가 발생했어요 :( </p>
                    <button className="btn-scordi btn mt-4" onClick={onClick}>
                        {currentUser ? '이전페이지' : '메인페이지'}로 돌아가기
                    </button>
                </div>
            </div>
        </ErrorLayout>
    );
});
