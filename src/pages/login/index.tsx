import {NavBar} from "../../components/NavBar";
import {TextInput} from "../../components/TextInput";

const LoginPage = () => {
    return (
        <>
            <NavBar/>
            <div className={"container"}>
                <div className={"w-[24rem] space-y-4 p-4 m-auto"}>
                    <h1>payplo</h1>
                    <TextInput label={"이메일"} required={true} placeholder={"이메일을 입력해주세요"}/>
                    <TextInput label={"비밀번호"} required={true} placeholder={"비밀번호를 입력해주세요"}/>
                    <div className={'pt-[1rem] space-y-4'}>
                        <button className="btn btn-primary btn-block">로그인</button>
                        <button className="btn btn-outline btn-primary btn-block">회원가입</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage
