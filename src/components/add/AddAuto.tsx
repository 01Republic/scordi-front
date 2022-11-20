import {AppIconButton} from "^components/AppIconButton";
import {TextInput} from "^components/TextInput";
import {DefaultButton} from "^components/Button";
import {AddCompletePageRoute} from "^pages/apps/add/complete";
import {useState} from "react";
import {useRouter} from "next/router";
import { ApplicationPrototypeDto } from "^types/applicationPrototype.type";

type AddAutoProps = {
    appInfo: ApplicationPrototypeDto;
}

export const AddAuto = (props: AddAutoProps) => {
    const router = useRouter();
    const [isFailed, setIsFailed] = useState(false);

    return (
        <div className={'px-[20px] py-[40px]'}>
            {isFailed ? (
                <>
                    <h2>연동이 실패되었어요</h2>
                    <p className={'mt-[20px] text-[#6D7684]'}>
                        이메일 및 비밀번호를 다시 확인해주세요.
                    </p>
                </>
            ) : (
                <>
                    <h2>서비스 연동하기</h2>
                    <p className={'mt-[20px] text-[#6D7684]'}>
                        관리자 계정의 로그인 정보를 입력해 주세요.<br/>
                        계정은 암호화하여 전송되며, 식별이 불가능한 형태로<br/>
                        안전하게 처리됩니다.
                    </p>
                </>
            )}

            <div className={'py-[30px] text-center'}>
                <AppIconButton name={props.appInfo.name} icon={props.appInfo.image}/>
            </div>
            <TextInput label={'아이디'} placeholder={'아이디를 입력해주세요.'}/>
            <TextInput label={'비밀번호'} placeholder={'비밀번호를 입력해주세요.'}/>
            {isFailed ? (
                <>
                    <DefaultButton text={'다시 연동하기'} onClick={() => null}/>
                    <DefaultButton text={'다른 서비스 연동하기'} onClick={() => null}/>
                </>
            ) : (
                <DefaultButton text={'연동 시작하기'} onClick={() => router.push(AddCompletePageRoute.pathname)}/>
            )}
        </div>
    )
}