import React, {useEffect, useState} from 'react';
import {StageFormProps, StageMarkUp} from './StageMarkUp';
import {useForm} from 'react-hook-form';
import {TextInput} from '^components/TextInput';
import {ModalActionButton, ModalActionWrapper} from '^components/Modal';
import {LoginDto} from '^components/ApplicationConnectStage/dto/login.dto';
import {BallTriangle} from 'react-loading-icons';
import {OrgResponseDataDto} from '^components/ApplicationConnectStage/dto/OrgResponseData.dto';
import {Radio} from '^components/Radio';

export type Step5Data = {
    email: string;
    password: string;
    verificationCode?: string;
    orgDataList: OrgResponseDataDto[];
};

/**
 * step5. 정보 확인 및 저장
 * ---
 * 1. 앞 단게에서 사용자로부터 로그인 계정과 조직목록을 전달받습니다.
 * 2. 전달받은 조직목록을 보여줍니다.
 * 3. 그 중 하나를 선택하고 다음 버튼을 클릭하면, 본격적으로 조직의 정보들을 모두 들고 옵니다.
 *    여러 리퀘스트로 나누어 병렬로 실행합니다.
 *    프로그레스를 Bar 형태로 보여주지 않고, Step 형태로 보여줍니다. (aws code-deploy 의 빌드 실행 단계를 보여주는 형태가 좋을 것 같습니다)
 * 4. 성공시, 앞 단계에서 입력받은 정보와 응답으로 받게된 모든 정보를 모아
 *    다음 스텝으로 데이터를 넘겨줍니다.
 *    (다음 단계는 전달받은 정보들을 보여준 뒤, 확인 및 저장 단계.)
 */
export const StageMarkUpStep5: StageMarkUp = {
    title: (name) => `${name} 계정 연결하기.`,
    description: '로그인 정보는 암호화 되어 전송되며, 보관하지 않습니다.',
    StageForm: (props: StageFormProps<Step5Data>) => {
        const {api, title = '', description = '', next, data} = props;
        const [selectedOrgName, setSelectedOrgName] = useState('');
        const [isPending, setIsPending] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');
        const form = useForm<LoginDto>({
            defaultValues: {
                email: data.email,
                password: data.password,
            },
        });

        const onSubmitHandler = () => {
            const values = form.getValues();
            const {orgDataList} = data;
            const selectedOrg = orgDataList.find((org) => org.name === selectedOrgName);
            console.log('form', values);
            console.log(selectedOrg);
        };

        const radioOnClickHandler = (e: any) => {
            setSelectedOrgName(e.target.value);
        };

        return (
            <>
                <div className={isPending ? 'hidden' : 'block'}>
                    <h3 className="font-bold text-lg">조직 선택하기</h3>
                    <p className="py-4">
                        입력한 계정으로 관리할 수 있는 조직들입니다.
                        <br />
                        연동할 조직을 선택해주세요.
                    </p>

                    {errorMessage && <div className="alert alert-error text-xs mb-4">{errorMessage}</div>}

                    <div className="mb-2">
                        {data.orgDataList.map((org, i) => (
                            <Radio
                                key={i}
                                name="selectOrg"
                                value={org.name}
                                onClick={radioOnClickHandler}
                                wrapperClassName="p-3 mb-2 flex rounded-box shadow border"
                            >
                                <p className="text-sm cursor-pointer">{org.name}</p>
                            </Radio>
                        ))}
                    </div>

                    <ModalActionWrapper>
                        <ModalActionButton
                            text={`${selectedOrgName ? `'${selectedOrgName}' ` : ''}연동하기`}
                            className="btn-secondary btn-block"
                            disabled={!selectedOrgName}
                            onClick={onSubmitHandler}
                        />
                    </ModalActionWrapper>
                </div>

                <div className={isPending ? 'block' : 'hidden'}>
                    <h3 className="font-bold text-lg text-center">계정의 조직 정보를 불러오는 중입니다.</h3>

                    <BallTriangle
                        stroke="#d827a9"
                        style={{
                            margin: '3rem auto 2rem',
                        }}
                    />
                </div>
            </>
        );
    },
};
