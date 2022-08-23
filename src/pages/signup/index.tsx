import {NavBar} from "../../components/NavBar";
import {TextInput} from "../../components/TextInput";
import React from "react";
import {useForm} from "react-hook-form";
import {UserSignUpRequestDto} from "../../types/userTypes";
import {postUser} from "../../api/sessionApi";
import {Modal} from "../../components/Modal";
import {useRouter} from "next/router";

const SignUp = () => {
    const form = useForm<UserSignUpRequestDto>();
    const router = useRouter();
    const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);
    const [isFailModalOpen, setIsFailModalOpen] = React.useState(false);

    const signUpComplete = (data: UserSignUpRequestDto) => {
        postUser(data).then(() => {
            setIsSuccessModalOpen(true);
        }).catch(() => {
            setIsFailModalOpen(true);
        })
    }

    return (
        <>
            <Modal type={'success'} isOpen={isSuccessModalOpen}
                   title={'회원가입 완료'} description={'회원가입이 완료되었습니다. 로그인을 해주세요.'}
                   button1={{
                       text: '확인',
                       onClick: () => {
                           setIsSuccessModalOpen(false);
                           router.push('/login');
                       }
                   }}/>
            <Modal type={'error'} isOpen={isFailModalOpen}
                   title={'회원가입 오류'} description={'이메일 또는 비밀번호를 확인해주세요'}
                   button1={{text: '확인', onClick: () => setIsFailModalOpen(false)}}/>
            <NavBar/>
            <div className={"mx-auto my-20 w-full max-w-md space-y-5"}>
                <form onSubmit={form.handleSubmit(signUpComplete)} className={"space-y-4 p-4 m-auto"}>
                    <h1 className="text-4xl font-semibold">회원가입</h1>
                    {/* TODO: 회사명 필드 추가되면 form 항목 추가 필요 */}
                    <TextInput label={"회사명"}
                               type={'text'}
                               required={true}
                               placeholder={"회사명을 입력해주세요"}
                    />
                    <TextInput label={"이름"}
                               type={'text'}
                               required={true}
                               placeholder={"이름을 입력해주세요"}
                               {...form.register('name', {required: true})}
                    />
                    <TextInput label={"회사 이메일"}
                               type={'email'}
                               required={true}
                               placeholder={"회사 이메일을 입력해주세요"}
                               {...form.register('email', {required: true})}
                    />
                    <TextInput label={"비밀번호"}
                               type={'password'}
                               required={true}
                               placeholder={"비밀번호를 입력해주세요"}
                               {...form.register('password', {required: true})}
                    />
                    <div className={"pt-[1rem] space-y-4"}>
                        <button className="btn btn-primary btn-block" type={'submit'}>가입완료</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp;