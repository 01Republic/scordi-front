import Link from "next/link";
import React from "react";
import { UserLoginPageRoute } from '^pages/users/login';

const ResetPasswordSuccess = () => {
  return (
    <div className="mx-auto my-20 w-full max-w-md space-y-5 ">
      <h1 className="text-4xl font-semibold leading-snug">
        비밀번호 재설정 완료
      </h1>
      <p className="text-sm text-gray-600">
        비밀번호가 재설정되었습니다. 변경된 비밀번호로 다시 로그인 해주세요.
      </p>
      <div className="pt-5">
        <Link href={UserLoginPageRoute.path()}>
          <button className="btn btn-primary btn-block">로그인하기</button>
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordSuccess;
