import React, {memo} from 'react';
import {AiFillCheckCircle} from 'react-icons/ai';

export const SuccessInvite = memo(() => {
    return (
        <div className="text-center py-32 flex flex-col gap-8">
            <AiFillCheckCircle size={52} className="text-scordi mx-auto" />
            <h3 className="font-bold text-2xl">멤버 초대가 완료되었어요! </h3>
            <p>
                워크스페이스에 멤버를 초대했어요.
                <br />
                멤버가 가입 후 워크스페이스에 들어오기 전까지 기다려주세요.
            </p>
            <button className="btn btn-scordi-light w-full text-lg">📩 초대 메일이 발송되었어요</button>
        </div>
    );
});
