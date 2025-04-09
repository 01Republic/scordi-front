import {memo} from 'react';
import {useRouter} from 'next/router';
import {MainPageRoute} from '^pages/index';
import {ErrorLayout} from './ErrorLayout';
import Image from 'next/image';
import whiteBgLogo from '^images/whiteBgLogo.png';
import {getToken} from '^api/api';
import {LinkTo} from '^components/util/LinkTo';

export const ErrorExceptionPage = memo(() => {
    const router = useRouter();
    const isSignIn = !!getToken();

    return (
        <div className="bg-white">
            <ErrorLayout hideNav hideFooter>
                <div className="flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <Image
                            src={whiteBgLogo}
                            alt="로고"
                            width={200}
                            height={200}
                            className="animate-spin hover:animate-none"
                        />

                        <p className="text-3xl mt-8 font-semibold">예상치 못한 오류가 발생했어요 :( </p>

                        {isSignIn ? (
                            <LinkTo
                                text="이전페이지로 돌아가기"
                                className="btn btn-scordi mt-4"
                                onClick={() => router.back()}
                            />
                        ) : (
                            <LinkTo
                                text="메인페이지로 돌아가기"
                                className="btn btn-scordi mt-4"
                                onClick={() => router.replace(MainPageRoute.path())}
                            />
                        )}
                    </div>
                </div>
            </ErrorLayout>
        </div>
    );
});
