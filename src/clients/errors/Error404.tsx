import {useRouter} from 'next/router';
import {memo} from 'react';

import {MdError} from 'react-icons/md';
import {Errorlayout} from './Errorlayout';

export const Error404Page = memo(() => {
    const router = useRouter();
    const onClickMain = () => {
        router.replace('/');
    };

    return (
        <Errorlayout>
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <p className="flex items-center justify-center text-[160px] font-extrabold text-scordi">
                        4<MdError />4
                    </p>
                    <p className="text-30 mt-8">요청하신 페이지를 찾을 수 없습니다.</p>
                    <p className="text-20 mt-1">입력하신 주소를 다시 확인해주세요!</p>
                    <button className="btn-scordi btn-big rounded-md mt-4" onClick={onClickMain}>
                        메인페이지로 돌아가기
                    </button>
                </div>
            </div>
        </Errorlayout>
    );
});
