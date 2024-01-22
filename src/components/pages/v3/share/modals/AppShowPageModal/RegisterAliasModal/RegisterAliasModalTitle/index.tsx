import {memo} from 'react';

export const RegisterAliasModalTitle = memo(() => {
    return (
        <div className="py-5 pt-10">
            <p className="mb-4">별칭 등록하기</p>
            <h2 className="h1 leading-tight">별칭을 등록해주세요</h2>
        </div>
    );
});
