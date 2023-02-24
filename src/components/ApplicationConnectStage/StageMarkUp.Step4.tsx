import React, {useEffect, useState} from 'react';
import {StageFormProps, StageMarkUp} from './StageMarkUp';
import {ModalActionButton, ModalActionWrapper} from '^components/Modal';
import {OrgResponseDataDto} from '^components/ApplicationConnectStage/dto/OrgResponseData.dto';
import {LoginDto} from '^components/ApplicationConnectStage/dto/login.dto';
import {ApplicationConnectApi} from '^api/applicationConnect.api';
import {FetchedProfileDto} from '^components/ApplicationConnectStage/dto/fetched.responses.dto';
import {Step5Data} from '^components/ApplicationConnectStage/StageMarkUp.Step5';
import {FetcherUI} from '^components/ApplicationConnectStage/fetchers/FetcherUI';
import {ProfileFetcher} from '^components/ApplicationConnectStage/fetchers/ProfileFetcher';
import {PlanAndCycleFetcher} from '^components/ApplicationConnectStage/fetchers/PlanAndCycleFetcher';
import {BillingHistoriesFetcher} from '^components/ApplicationConnectStage/fetchers/BillingHistoriesFetcher';
import {MembersFetcher} from '^components/ApplicationConnectStage/fetchers/MembersFetcher';

export type Step4Data = {
    email: string;
    password: string;
    verificationCode?: string;
    selectedOrg: OrgResponseDataDto;
};

/**
 * step4. 정보 조회
 * ---
 * 1. 앞 단게에서 사용자로부터 로그인 계정과 선택된 조직을 전달받습니다.
 * 2. 전달받은 조직에 대한 크롤링 요청을 실행합니다.
 *    본격적으로 조직의 정보들을 모두 들고 옵니다.
 *    여러 리퀘스트로 나누어 병렬로 실행합니다.
 *    프로그레스를 Bar 형태로 보여주지 않고, Step 형태로 보여줍니다. (aws code-deploy 의 빌드 실행 단계를 보여주는 형태가 좋을 것 같습니다)
 *    - 3-1. 기본 정보
 *    - 3-2. 플랜, 결제주기
 *    - 3-3. 결제내역
 *    - 3-4. 구성원
 * 4. 성공시, 앞 단계에서 입력받은 정보와 응답으로 받게된 모든 정보를 모아
 *    다음 스텝으로 데이터를 넘겨줍니다.
 *    (다음 단계는 전달받은 정보들을 보여준 뒤, 확인 및 저장 단계.)
 */
export const StageMarkUpStep4: StageMarkUp = {
    title: (name) => `${name} 계정 연결하기.`,
    description: '로그인 정보는 암호화 되어 전송되며, 보관하지 않습니다.',
    StageForm: (props: StageFormProps<Step4Data>) => {
        const {api, title = '', description = '', next} = props;
        const {email, password, verificationCode, selectedOrg} = props.data;
        const loginDto: LoginDto = {email, password, verificationCode};
        const [isPending, setIsPending] = useState(false);
        const [isAllComplete, setIsAllComplete] = useState(false);
        const [errorMessages, setErrorMessages] = useState<string[]>([]);

        const onNextButtonClickHandler = () => {};
        console.log(10);

        return (
            <>
                <div className={isPending ? 'hidden' : 'block'}>
                    <h3 className="font-bold text-lg text-center">연동 중</h3>
                    <p className="py-4 text-center">
                        세부 정보를 불러오는 중입니다.
                        <br />
                        잠시만 기다려 주세요 :)
                    </p>

                    {errorMessages.map((errorMessage, i) => (
                        <div key={i} className="alert alert-error text-xs mb-4">
                            {errorMessage}
                        </div>
                    ))}

                    <div className="mb-2 text-center">
                        <ul className="steps steps-vertical">
                            <ProfileFetcher
                                api={api}
                                orgName={selectedOrg.name}
                                params={loginDto}
                                onComplete={(data) => {
                                    console.log('ProfileFetcher', data);
                                }}
                            />

                            <PlanAndCycleFetcher
                                api={api}
                                orgName={selectedOrg.name}
                                params={loginDto}
                                onComplete={(data) => {
                                    console.log('PlanAndCycleFetcher', data);
                                }}
                            />

                            <BillingHistoriesFetcher
                                api={api}
                                orgName={selectedOrg.name}
                                params={loginDto}
                                onComplete={(data) => {
                                    console.log('BillingHistoriesFetcher', data);
                                }}
                            />

                            <MembersFetcher
                                api={api}
                                orgName={selectedOrg.name}
                                params={loginDto}
                                onComplete={(data) => {
                                    console.log('MembersFetcher', data);
                                }}
                            />
                        </ul>
                    </div>

                    <ModalActionWrapper>
                        <ModalActionButton
                            text="저장하고 완료하기"
                            className="btn-secondary btn-block"
                            disabled={!isAllComplete}
                            onClick={onNextButtonClickHandler}
                        />
                    </ModalActionWrapper>
                </div>
            </>
        );
    },
};

export const StageMarkUpStep4Test: StageMarkUp = {
    title: (name) => `${name} 계정 연결하기.`,
    description: '로그인 정보는 암호화 되어 전송되며, 보관하지 않습니다.',
    StageForm: (props: StageFormProps<Step5Data>) => {
        const [isMounted, setIsMounted] = useState(false);
        const api = new ApplicationConnectApi('github');
        const mock = {
            orgName: 'ATOZ-TEAM',
            loginDto: {
                email: '',
                password: '',
            },
        };

        useEffect(() => {
            setIsMounted(true);
        }, []);

        if (!isMounted) return <></>;
        console.log(1, 'modalIsMounted');

        return (
            <>
                <div>
                    <h3 className="font-bold text-lg text-center">연동 중</h3>
                    <p className="py-4 text-center">
                        세부 정보를 불러오는 중입니다.
                        <br />
                        잠시만 기다려 주세요 :)
                    </p>

                    <div className="mb-2 text-center">
                        <ul className="steps steps-vertical">
                            <ProfileFetcher
                                api={api}
                                orgName={mock.orgName}
                                params={mock.loginDto}
                                onComplete={(data) => {
                                    console.log('ProfileFetcher', data);
                                }}
                            />

                            <PlanAndCycleFetcher
                                api={api}
                                orgName={mock.orgName}
                                params={mock.loginDto}
                                onComplete={(data) => {
                                    console.log('PlanAndCycleFetcher', data);
                                }}
                            />

                            <BillingHistoriesFetcher
                                api={api}
                                orgName={mock.orgName}
                                params={mock.loginDto}
                                onComplete={(data) => {
                                    console.log('BillingHistoriesFetcher', data);
                                }}
                            />

                            <MembersFetcher
                                api={api}
                                orgName={mock.orgName}
                                params={mock.loginDto}
                                onComplete={(data) => {
                                    console.log('MembersFetcher', data);
                                }}
                            />
                        </ul>
                    </div>

                    <ModalActionWrapper>
                        <ModalActionButton
                            text="저장하고 완료하기"
                            className="btn-secondary btn-block"
                            disabled={true}
                            onClick={() => {}}
                        />
                    </ModalActionWrapper>
                </div>
            </>
        );
    },
};
