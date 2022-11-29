import React, {useEffect, useState} from 'react';
import {StageMarkUp} from './StageMarkUp';
import {useForm} from 'react-hook-form';
import {TextInput} from '^components/TextInput';
import {ModalActionButton, ModalActionWrapper} from '^components/Modal';
import {LoginDto} from '^components/ApplicationConnectStage/dto/login.dto';
import {BallTriangle} from 'react-loading-icons';
import {Step3Data} from '^components/ApplicationConnectStage/StageMarkUp.Step3';
import {Scrapping} from '^components/ApplicationConnectStage/Scrapping';
import {AxiosResponse} from 'axios';
import {OrgResponseDataDto} from '^components/ApplicationConnectStage/dto/OrgResponseData.dto';
import {ErrorResponseDto} from '^components/ApplicationConnectStage/dto/error.response.dto';

/**
 * 1번째 단계.
 * ---
 * 1. 사용자로부터 로그인 계정을 입력 받습니다.
 * 2. 입력받은 로그인 계정을 암호화 합니다.
 * 3. 암호화한 계정을 서버로 전송합니다.
 * 4. 서버에서 처리하는 동안 진행중임을 알려줍니다.
 * 5. 성공시, 조직목록을 응답으로 받게될 것입니다. step3 인 조직 선택으로 넘어가세요.
 * 6. 실패시, deviseToken 을 인증 요구할 것입니다. 추가 input 을 랜더링 하여 토큰을 입력할 수 있도록 안내한 뒤, 입력받은 토큰과 함께 다시 요청을 전송합니다.
 * 7. 그래도 실패한다면 관리자에게 문의하라는 알림을 띄워주고 창을 종료할지 물어본 뒤 창을 종료합니다.
 */
export const StageMarkUpStep2: StageMarkUp = {
    title: (name) => `${name} 계정 연결하기.`,
    description: '로그인 정보는 암호화 되어 전송되며, 보관하지 않습니다.',
    StageForm: (props) => {
        const {api, title = '', description = '', next} = props;
        const [verifyNeeded, setVerifyNeeded] = useState(false);
        const [isPending, setIsPending] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');
        const form = useForm<LoginDto>();

        function organizationResponseHandler(
            res: AxiosResponse<OrgResponseDataDto[] | ErrorResponseDto>,
        ) {
            const {data} = res;
            const values = form.getValues();
            setIsPending(false);

            if (Array.isArray(data)) {
                next<Step3Data>({
                    email: values.email,
                    password: values.password,
                    verificationCode: values.verificationCode,
                    orgDataList: data,
                });
            } else {
                if (
                    // @ts-ignore
                    data.code === 422 &&
                    // @ts-ignore
                    data.name === 'DeviseVerificationError'
                ) {
                    setErrorMessage(data.message);
                    setVerifyNeeded(true);
                }
            }
        }

        const onSubmitHandler = () => {
            const values = form.getValues();
            setIsPending(true);

            if (!verifyNeeded) {
                api.getOrganizations({
                    email: values.email,
                    password: values.password,
                }).then(organizationResponseHandler);
            } else {
                api.deviseVerification({
                    email: values.email,
                    password: values.password,
                    verificationCode: values.verificationCode!,
                }).then(organizationResponseHandler);
            }
        };

        return (
            <>
                <div className={isPending ? 'hidden' : 'block'}>
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{description}</p>

                    {errorMessage && (
                        <div className="alert alert-error text-xs mb-4">
                            {errorMessage}
                        </div>
                    )}

                    <div className="mb-2">
                        <TextInput
                            type="email"
                            placeholder="이메일"
                            {...form.register('email', {required: true})}
                        />
                    </div>

                    <div className="mb-2">
                        <TextInput
                            type="password"
                            placeholder="비밀번호"
                            {...form.register('password', {required: true})}
                        />
                    </div>

                    {verifyNeeded && (
                        <div className="mb-2">
                            <TextInput
                                type="text"
                                placeholder="인증 번호를 입력해주세요"
                                {...form.register('verificationCode', {
                                    required: true,
                                })}
                            />
                        </div>
                    )}

                    <ModalActionWrapper>
                        <ModalActionButton
                            onClick={onSubmitHandler}
                            text="다음"
                        />
                    </ModalActionWrapper>
                </div>

                <Scrapping
                    title="계정의 조직 정보를 불러오는 중입니다."
                    isPending={isPending}
                />
            </>
        );
    },
};
