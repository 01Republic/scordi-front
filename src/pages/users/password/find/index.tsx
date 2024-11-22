import React from 'react';
import {TextInput} from '^components/TextInput';
import {LinkTo} from '^components/util/LinkTo';
import {UserLoginPageRoute} from '^pages/users/login';

const FindPassword = () => {
    return (
        <div className="mx-auto my-20 w-full max-w-md space-y-5 ">
            <h1 className="text-4xl font-semibold">비밀번호 찾기</h1>
            <form className="flex flex-col space-y-4">
                <div className="space-y-2 pb-4">
                    <TextInput label="이메일" required placeholder="이메일을 입력해주세요." />
                    <p className="text-sm text-gray-600">
                        *이메일이 수신 되지 않거나, 이메일주소가 기억나지 않을 경우 고객센터로 문의 주시기 바랍니다.
                    </p>
                </div>

                <LinkTo href="/users/password/find/success">
                    <button className="btn btn-primary btn-block">이메일 발송</button>
                </LinkTo>
                <LinkTo href={UserLoginPageRoute.path()}>
                    <button className="text-sm" type="button">
                        돌아가기
                    </button>
                </LinkTo>
            </form>
        </div>
    );
};

export default FindPassword;
