import React, {Dispatch, SetStateAction, useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {IoFlash} from '@react-icons/all-files/io5/IoFlash';
import {IoChevronBackOutline} from '@react-icons/all-files/io5/IoChevronBackOutline';
import {AxiosError, AxiosResponse} from 'axios';
import {AppCode, ApplicationConnectApi} from '^api/applicationConnect.api';
import {ProductDto} from '^types/product.type';
import {ContentPanel, ContentPanelList, ContentPanelItem, ContentPanelInput} from '^layouts/ContentLayout/ContentPanel';
import {ContentForm} from '^layouts/ContentLayout/ContentForm';
import {TextInput} from '^components/TextInput';
import {LoginDto} from '^components/ApplicationConnectStage/dto/login.dto';
import {OrgResponseDataDto} from '^components/ApplicationConnectStage/dto/OrgResponseData.dto';
import {ErrorResponseDto} from '^components/ApplicationConnectStage/dto/error.response.dto';
import {Scrapping} from '^components/ApplicationConnectStage/Scrapping';
import {ConnectMethod} from './SelectConnectMethod';
import {ConnectOrg} from './ConnectOrg';

interface ConnectLoginFormProps {
    protoApp: ProductDto;
    setConnectMethod: Dispatch<SetStateAction<ConnectMethod | undefined>>;
}

export const ConnectLoginForm = (props: ConnectLoginFormProps) => {
    const {protoApp, setConnectMethod} = props;
    const [verifyNeeded, setVerifyNeeded] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [orgItems, setOrgItems] = useState<OrgResponseDataDto[]>([]);
    const form = useForm<LoginDto>();
    const api = useMemo(() => new ApplicationConnectApi(protoApp.name as AppCode), [protoApp.name]);

    function organizationResponseHandler(res: AxiosResponse<OrgResponseDataDto[]>) {
        const {data} = res;
        setOrgItems(data);
    }
    function errorHandler({response}: AxiosError<ErrorResponseDto>) {
        const {data: e} = response || {};
        if (e) {
            if (e.status === 422 && e.code === 'DeviseVerificationError') {
                setErrorMessage(e.message);
                setVerifyNeeded(true);
            }
        }
    }

    const onSubmitHandler = () => {
        const values = form.getValues();
        setIsPending(true);

        // Validation
        if (verifyNeeded && !values.verificationCode) {
            setErrorMessage('인증 번호를 입력해주세요');
            return;
        }

        const request = !verifyNeeded
            ? api.getOrganizations(values)
            : api.deviseVerification({
                  email: values.email,
                  password: values.password,
                  verificationCode: values.verificationCode!,
              });
        request
            .then(organizationResponseHandler)
            .catch(errorHandler)
            .finally(() => setIsPending(false));
    };

    return orgItems.length === 0 ? (
        <>
            <Scrapping title="계정의 조직 정보를 불러오는 중입니다." isPending={isPending} />

            <div className={isPending ? 'hidden' : 'block'}>
                <ContentForm submitBtnHidden={true} onSubmit={form.handleSubmit(onSubmitHandler)}>
                    <ContentPanel
                        title="관리자 계정으로 로그인해주세요."
                        desc={`계정은 <b>암호화</b>하여 전송되며, 식별이 불가능한 형태로 안전하게 처리됩니다.`}
                    >
                        <ContentPanelList>
                            {/* Errors */}
                            {errorMessage && (
                                <ContentPanelItem>
                                    <div className="alert alert-error rounded text-white">{errorMessage}</div>
                                </ContentPanelItem>
                            )}

                            {/* Email */}
                            <ContentPanelInput
                                title="ID or Email"
                                text={`관리자 권한을 가진 계정의 아이디 또는 이메일을 입력해주세요`}
                                required={true}
                            >
                                <TextInput
                                    type="email"
                                    placeholder="이메일"
                                    {...form.register('email', {required: true})}
                                />
                            </ContentPanelInput>

                            {/* Password */}
                            <ContentPanelInput
                                title="Password"
                                text={`관리자 권한을 가진 계정의 비밀번호를 입력해주세요`}
                                required={true}
                            >
                                <TextInput
                                    type="password"
                                    placeholder="비밀번호"
                                    {...form.register('password', {required: true})}
                                />
                            </ContentPanelInput>

                            {/* verificationCode */}
                            {verifyNeeded && (
                                <ContentPanelInput
                                    title="Verification Code"
                                    text={`${protoApp.name} 로부터 이메일로 전송된 인증번호 또는 코드를 확인해주세요`}
                                >
                                    <TextInput
                                        type="text"
                                        placeholder="인증 번호를 입력해주세요"
                                        {...form.register('verificationCode', {required: true})}
                                    />
                                </ContentPanelInput>
                            )}

                            {/* Buttons */}
                            <ContentPanelItem>
                                <div className="flex w-full justify-between">
                                    <button
                                        type="button"
                                        className="btn btn-ghost border-[#dbd6e1] gap-2"
                                        onClick={() => setConnectMethod(undefined)}
                                    >
                                        <IoChevronBackOutline /> 처음으로
                                    </button>

                                    <button className="btn btn-secondary text-lg gap-2">
                                        <IoFlash /> Connect App
                                    </button>
                                </div>
                            </ContentPanelItem>
                        </ContentPanelList>
                    </ContentPanel>
                </ContentForm>
            </div>
        </>
    ) : (
        <ConnectOrg
            protoApp={protoApp}
            setConnectMethod={setConnectMethod}
            orgItems={orgItems}
            loginDto={form.getValues()}
        />
    );
};
