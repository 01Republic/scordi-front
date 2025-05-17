import {debounce} from 'lodash';
import {useRouter} from 'next/router';
import {ImgHTMLAttributes, memo} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {BackButton} from '^components/BackButton';
import {slackScordiOauthApi} from '^models/_slack-bot/api';
import {googleWorkspaceAccessTokenAtom} from '../GoogleWorkspaceConnectorPage/atom';
import {SafeBadge} from '../SafeBadge';

export const SlackBeforeConnectPage = memo(function SlackBeforeConnectPage() {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const setAccessToken = useSetRecoilState(googleWorkspaceAccessTokenAtom);

    return (
        <div className="py-16 px-12">
            <header className="fixed mb-12">
                <div className="mb-12">
                    <BackButton />
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <img
                        src="/images/logo/external/logo_slack.png"
                        alt="slack logo"
                        className="w-[48px] h-[48px] bg-white"
                    />

                    <SafeBadge />
                </div>

                <div className="mb-12">
                    <h1 className="text-3xl my-10 font-medium">
                        슬랙<span className="text-gray-400">을 연결하면</span> <br />{' '}
                        <span className="text-gray-400">구성원 계정을 한 번에 불러올 수 있어요</span>
                    </h1>

                    <div className="rounded-box p-4 bg-red-50 text-red-400 border border-red-400">
                        <p className="font-medium text-18 mb-2">잠깐, 다음과 같은 안내를 확인해주세요.</p>
                        <ul className="list-disc pl-4 text-16">
                            <li>비활성 계정을 제외한 모든 구성원을 불러와요.</li>
                            <li>안심하세요. 구성원 정보 외에 다른 데이터를 가져올 수 없어요.</li>
                            <li>구성원을 동기화하거나 슬랙 워크스페이스 연결해제도 가능해요.</li>
                        </ul>
                    </div>

                    <br />
                </div>

                <div className="w-full grid grid-cols-2 gap-4">
                    <button
                        id="google-workspace-connect-button"
                        className="btn btn-md btn-block btn-scordi"
                        onClick={debounce(() => {
                            window.open(slackScordiOauthApi.authUrl(orgId), '_self');
                        }, 500)}
                    >
                        연결 시작하기
                    </button>
                </div>
            </header>

            <div className="grid sm:grid-cols-2">
                <div></div>
                <div>
                    <div className="mb-14 w-full flex flex-col gap-4">
                        <section>
                            <h3>슬랙 워크스페이스 연동으로 구성원 불러오기</h3>
                            <br />
                            <ul className="list-decimal pl-4 text-16 leading-loose space-y-2">
                                <li>연결 시작하기 버튼을 클릭 해 주세요.</li>
                                <li>연결하고자 하는 슬랙 워크스페이스를 확인해주세요.</li>
                                <li>
                                    허용 버튼을 눌러 슬랙과 스코디를 연동해주세요.
                                    <Img
                                        src="/images/v3/how-to-connect-slack-1.png"
                                        alt="how to connect slack 1"
                                        style={{width: '100%'}}
                                        className="my-2"
                                    />
                                </li>
                            </ul>
                        </section>

                        <hr className="my-4" />

                        <section>
                            <h3>워크스페이스 연결해제하기</h3>
                            <br />
                            <ul className="list-decimal pl-4 text-16 leading-loose space-y-2">
                                <li>설정{'>'} 서비스 연동을 클릭 해주세요.</li>
                                <li>슬랙 우측에 있는 세부설정 버튼을 클릭 해주세요.</li>
                                <li>설정 탭에서 워크스페이스 제거하고 연결해제를 할 수 있어요.</li>
                                <li>
                                    연결을 해제하면 불러온 구성원 정보가 삭제되어 알림을 발송할 수 없게 돼요.
                                    <Img
                                        src="/images/v3/how-to-connect-slack-2.png"
                                        alt="how to connect slack 2"
                                        style={{width: '100%'}}
                                        className="my-2"
                                    />
                                </li>
                            </ul>
                        </section>

                        <section>
                            <br />
                            <br />
                            <br />
                            <p className="text-2xl font-bold">연결을 시작해볼까요?</p>
                            <br />
                            <button
                                onClick={() => document.getElementById('google-workspace-connect-button')?.click()}
                                className="btn btn-md btn-block btn-scordi"
                            >
                                연결 시작하기
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
});

const Img = (props: ImgHTMLAttributes<any>) => <img src="" alt="" style={{width: '70%'}} loading="lazy" {...props} />;
