import {memo} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {MdError} from 'react-icons/md';
import {currentUserAtom} from '^models/User/atom';
import {MainPageRoute} from '^pages/index';
import {ErrorLayout} from './ErrorLayout';

export const Error404Page = memo(() => {
    const router = useRouter();
    const currentUser = useRecoilValue(currentUserAtom);

    const onClick = () => {
        currentUser ? router.back() : router.replace(MainPageRoute.path());
    };

    return (
        <ErrorLayout>
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <p className="flex items-center justify-center text-[160px] font-extrabold">
                        <span>4</span>
                        <MdError className="text-red-500 btn-animation hover:rotate-[360deg]" />
                        <span>4</span>
                    </p>
                    <p className="text-3xl mt-8 font-semibold">요청하신 페이지를 찾을 수 없어요 :( </p>
                    <p className="text-xl mt-2">입력하신 주소를 다시 확인해주세요!</p>
                    <button className="btn-scordi btn mt-4" onClick={onClick}>
                        {currentUser ? '이전페이지' : '메인페이지'}로 돌아가기
                    </button>
                </div>
            </div>
        </ErrorLayout>
    );
});
