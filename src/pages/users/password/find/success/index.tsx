import Link from "next/link";
import React from "react";
import { UserLoginPageRoute } from '^pages/users/login';

const EmailSentPage = () => {
  return (
    <div className="mx-auto my-20 w-full max-w-md space-y-5 ">
      <h1 className="text-4xl font-semibold leading-snug">
        비밀번호 재설정
        <br />
        이메일을 보냈습니다.
      </h1>
      <p className="text-sm text-gray-600">
        받은편지함을 확인해 주세요. 이메일이 오지 않으면, 스팸메일함을 확인해
        주시거나 아래 버튼을 눌러 이메일을 다시 보내주세요.
      </p>
      <div className="flex flex-col space-y-4 pt-5">
        <button
          className="btn btn-primary btn-block"
          onClick={() => alert("비밀번호 재설정 이메일을 다시 보냈습니다.")}
        >
          다시 보내기
        </button>
        <Link href={UserLoginPageRoute.path()}>
          <button className="text-sm">홈으로 가기</button>
        </Link>
      </div>
    </div>
  );
};

export default EmailSentPage;
