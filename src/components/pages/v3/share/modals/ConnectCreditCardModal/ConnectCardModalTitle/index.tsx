import {memo} from 'react';

export const ConnectCardModalTitle = memo(() => {
    return (
        <div className="py-5 pt-10">
            <p className="mb-4">결제 수단 등록하기</p>
            <h2 className="h1 leading-tight">결제 카드를 선택해주세요</h2>
        </div>
    );
});
