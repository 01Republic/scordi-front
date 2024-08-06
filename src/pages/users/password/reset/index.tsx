import Link from 'next/link';
import React from 'react';
import {TextInput} from '^components/TextInput';

const ResetPassword = () => {
    return (
        <div className="mx-auto my-20 w-full max-w-md space-y-5 ">
            <h1 className="text-4xl font-semibold">새로운 비밀번호 입력</h1>
            <form className="flex flex-col space-y-4">
                <TextInput label="새 비밀번호" required placeholder="새 비밀번호를 입력해주세요." />

                <TextInput label="새 비밀번호 확인" placeholder="새 비밀번호를 재입력해주세요." required />
                <div className="pt-5">
                    <Link href={'/users/password/reset/success'}>
                        <button className="btn btn-primary btn-block">비밀번호 재설장하기</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
