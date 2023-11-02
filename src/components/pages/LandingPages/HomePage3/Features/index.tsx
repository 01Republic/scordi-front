import React, {memo} from 'react';
import {USPSection2} from '^components/pages/LandingPages/components';
import {HomePageCTAButton2} from '^components/pages/LandingPages/HomePage/CTAButton';
import {useTranslation} from 'next-i18next';
import {CTAButton} from '^components/pages/LandingPages/HomePage2/CTAButton';

export const Features = memo(function Features() {
    const {t} = useTranslation('publicMain');

    return (
        <div className="py-16 md:py-0">
            {/* 간단하고 쉬운 연동 */}
            <USPSection2
                label="간편한 연동"
                imgUrl="/images/landing/features/1.simple-sync.png"
                // imgStyle={{transform: 'scale(1.1)'}}
                imgClass="py-16"
                title={
                    <span>
                        클릭 하나로 <span className="block sm:inline-block">우리 회사 SaaS 찾기</span>
                    </span>
                }
                desc1={
                    <span>
                        1분만에 모든 SaaS를 찾아드려요.{' '}
                        <span className="block">안 쓰는데도 결제중인 서비스를 찾아낼지 몰라요.</span>
                    </span>
                }
                desc2={
                    <ul>
                        <li>🚩 구글 로그인으로 간단하고 쉬운 SaaS 연동</li>
                        <li>🚩 API 기반으로 청구서 메일만 집계</li>
                        <li>🚩 잊혀졌지만 아직 결제중인 SaaS 발견</li>
                    </ul>
                }
                imgWidth="50%"
                direct="right"
                CTAButton={<CTAButton className="btn btn-scordi btn-lg">지금 확인하기</CTAButton>}
            />

            {/* 구독현황 홈/분석 */}
            <USPSection2
                label="대시보드"
                imgUrl={t('section5.image')}
                title={<span>누가, 무엇을, 얼마에 쓰는지 구독 현황을 한눈에!</span>}
                desc1={
                    <span>
                        사람마다 팀마다 무얼 쓰는지,{' '}
                        <span className="block">서비스마다 바뀌는 구독 비용도 한 번에 파악해요</span>
                    </span>
                }
                desc2={
                    <ul>
                        <li>🚩 운영 관리 보드 구축</li>
                        <li>🚩 월별 지출 그래프 시각화</li>
                        <li>🚩 SaaS별 비용 증감 추이 및 원인 분석</li>
                    </ul>
                }
                imgWidth="50%"
                direct="left"
                CTAButton={<CTAButton className="btn btn-scordi btn-lg">클릭 한 번에 확인</CTAButton>}
            />

            {/* 결제내역 */}
            <USPSection2
                label="결제내역"
                imgUrl="/images/landing/features/3.notifications.png"
                imgStyle={{transform: 'scale(1)'}}
                imgClass="py-16"
                title={
                    <span>
                        벌써 SaaS별 <span className="block">구독 빌링 분류 끝</span>
                    </span>
                }
                desc1={
                    <span>
                        카드 결제내역과 인보이스를 찾지 않아도 돼요.
                        <span className="block">PDF 파일이 첨부되어 부가세 신고와 증빙할 때도 유용해요.</span>
                    </span>
                }
                desc2={
                    <ul>
                        <li>🚩 SaaS 가입 시 입력한 결제 수신 이메일 파악</li>
                        <li>🚩 SaaS별로 연결된 결제카드 및 결제 방식 조회</li>
                        <li>🚩 결제주기에 따른 최근 결제일과 예정일/금액 확인</li>
                    </ul>
                }
                imgWidth="50%"
                direct="right"
                CTAButton={<CTAButton className="btn btn-scordi btn-lg">SaaS 결제내역 모아보기</CTAButton>}
            />

            {/* 결제내역 */}
            <USPSection2
                label="주요알림"
                imgUrl="/images/landing/features/3.notifications.png"
                imgStyle={{transform: 'scale(1)'}}
                imgClass="py-16"
                title={
                    <span>
                        신경쓰지 않아도, <span className="block">스코디가 알려드릴게요</span>
                    </span>
                }
                desc1={
                    <span>
                        갑작스러운 지출에 놀랄 일 없도록.{' '}
                        <span className="block">기능과 요금제 변동, 구매 전 혜택까지.</span>
                        <span className="block">놓치지 않도록 챙겨드려요.</span>
                    </span>
                }
                desc2={
                    <ul>
                        <li>🚩 월결제 1주전, 연결제 1달전 결제 예정 알림</li>
                        <li>🚩 기능 업데이트로 인한 권한 설정 변동 시</li>
                        <li>🚩 요금제 변경이나 서비스 가격 변동 시</li>
                        <li>🚩 SaaS 구매 전 바우처, 브랜드 할인 혜택</li>
                        <li className="flex items-center gap-2">
                            🚩 슬랙 등 기업 메신저 연동까지{' '}
                            <span className="badge bg-scordi-light text-white">Soon</span>
                        </li>
                    </ul>
                }
                imgWidth="50%"
                direct="left"
                CTAButton={<CTAButton className="btn btn-scordi btn-lg">SaaS 관리 알림받기</CTAButton>}
            />

            {/* 일정과 알림 */}
            <USPSection2
                label="자산보호"
                imgUrl="/images/landing/features/4.assets-security.png"
                imgStyle={{transform: 'scale(1.1)'}}
                imgClass="py-16"
                title={
                    <span>
                        민감한 계정관리까지 <span className="block">안전하고 쉽게</span>
                    </span>
                }
                desc1={
                    <span className="sm:transform-[scale(1)]">
                        노션과 엑셀을 왔다갔다 하지 마세요.
                        <span className="block">매번 기록하지 않아도, 기억하지 않아도 OK</span>
                    </span>
                }
                desc2={
                    <ul>
                        <li>🚩 공용계정 보관 및 동기화</li>
                        <li>🚩 팀/구성원별 계정 접근 권한 제어</li>
                        <li>🚩 퇴사자 발생시 공용계정 비밀번호 변경 및 접근해제</li>
                        <li>🚩 확장프로그램을 통한 로그인 자동완성</li>
                    </ul>
                }
                imgWidth="50%"
                direct="right"
                CTAButton={<CTAButton className="btn btn-scordi btn-lg">SaaS 보안 챙기기</CTAButton>}
            />

            {/* 계정 */}
            <USPSection2
                label="관리권한"
                imgUrl={t('section5.image')}
                title={`조직도로 한 눈에 권한 파악`}
                desc1={
                    <span>
                        우리 회사 팀 체계에 맞게 배치하고,{` `}
                        <span className="block">구성원에 따라 SaaS 권한을 설정하세요.</span>
                    </span>
                }
                desc2={
                    <ul>
                        <li>🚩 구성원별 SaaS 권한 관리</li>
                        <li>🚩 입퇴사 발생 시 SaaS 관리자/사용자 확인 용이</li>
                        <li>🚩 SaaS 관리자 퇴사 시 다른 구성원에게 권한 배정</li>
                    </ul>
                }
                imgWidth="50%"
                direct="left"
                CTAButton={<CTAButton className="btn btn-scordi btn-lg">퇴사자 계정 제거하기</CTAButton>}
            />

            {/* 자동화 */}
            <USPSection2
                label="자동화"
                imgUrl={t('section5.image')}
                title={
                    <span>
                        SaaS 관리자 페이지는 <span className="block">스코디 하나로 끝</span>
                    </span>
                }
                desc1={
                    <span>
                        서비스마다 일일이 접속해야 했던 관리자 페이지.{' '}
                        <span className="block">번거로운건 스코디가 대신할게요.</span>
                    </span>
                }
                desc2={
                    <ul>
                        <li>🚩 입사자 온보딩, 팀에 맞게 일괄 초대</li>
                        <li>🚩 퇴사자 오프보딩, 이용중인 서비스 일괄 해제</li>
                        <li>🚩 서비스별 결제 수단 일괄 변경</li>
                    </ul>
                }
                imgWidth="50%"
                direct="right"
                CTAButton={<CTAButton className="btn btn-scordi btn-lg">Coming Soon</CTAButton>}
            />
        </div>
    );
});

// {/* 간단하고 쉬운 연동 */}
// <USPSection2
//     label="간편한 연동"
//     imgUrl={t('section4.image')}
//     title={`클릭 하나로 우리 회사 SaaS 찾기`}
//     desc1={
//         <span>
//                                 1분만에 모든 SaaS를 찾아드려요{' '}
//             <span className="block">안 쓰는데도 결제중인 서비스를 찾아낼지 몰라요.</span>
//                             </span>
//     }
//     desc2={
//         <ul>
//             <li>🚩 구글 로그인으로 간단하고 쉬운 SaaS 연동</li>
//             <li>🚩 API 기반으로 청구서 메일만 집계</li>
//             <li>🚩 잊혀졌지만 아직 결제중인 SaaS 발견</li>
//         </ul>
//     }
//     imgWidth="50%"
//     direct="right"
//     CTAButton={<HomePageCTAButton2 text={t('section4.cta')!} />}
// />
//
// {/* 구독현황 홈/분석 */}
// <USPSection2
//     label="구독현황 홈 & 분석"
//     imgUrl={t('section5.image')}
//     title={<span>누가, 무엇을, 얼마에 쓰는지 구독 현황을 한눈에!</span>}
//     desc1={<span>더 쉽게 파악하고, 필요한 조치를 확인하세요</span>}
//     desc2={
//         <ul>
//             <li>🚩 대시보드와 분석</li>
//             <li>🚩 팀별, 멤버별 서비스 이용현황</li>
//             <li>🚩 서비스별 결제수단 관리</li>
//         </ul>
//     }
//     imgWidth="50%"
//     direct="left"
//     CTAButton={<HomePageCTAButton2 text={t('section5.cta')!} />}
// />
//
// {/* 결제내역 */}
// <USPSection2
//     label="결제내역"
//     imgUrl={t('section5.image')}
//     title={<span></span>}
//     desc1={<span></span>}
//     desc2={<span></span>}
//     imgWidth="50%"
//     direct="right"
//     CTAButton={<HomePageCTAButton2 text={t('section5.cta')!} />}
// />
//
// {/* 일정과 알림 */}
// <USPSection2
//     label="일정과 알림"
//     imgUrl={t('section5.image')}
//     title={`신경쓰지 않아도, 놓칠 수 없도록!`}
//     desc1={
//         <span>
//                                 서비스별로 천차만별인 정책들부터,{' '}
//             <span className="block">주요 변경에 따른 알림까지.</span>
//                                 <span className="block">스코디가 지켜드릴게요!</span>
//                             </span>
//     }
//     desc2={
//         <ul>
//             <li>🚩 서비스 의사결정 어드바이저</li>
//             <li>🚩 업데이트 소식 알림</li>
//             <li>🚩 이상한 사용 패턴 탐지 & 위험 알림</li>
//         </ul>
//     }
//     imgWidth="50%"
//     direct="left"
//     CTAButton={<HomePageCTAButton2 text={t('section5.cta')!} />}
// />
//
// {/* 계정 */}
// <USPSection2
//     label="계정 & 보안"
//     imgUrl={t('section5.image')}
//     title={`가장 민감한 계정 공유도! 안전하고 손쉽게 관리하세요`}
//     desc1={
//         <span>
//                                 퇴사자로 인한 비밀번호 변경, 권한 제어..{' '}
//             <span className="block">노션과 엑셀로는 충분하지 않으니까</span>
//                             </span>
//     }
//     desc2={
//         <ul>
//             <li>🚩 계정 자동완성 확장프로그램</li>
//             <li>🚩 사용자별 공유 권한 설정</li>
//             <li>🚩 비밀번호 변경과 유지관리도 한 번에</li>
//         </ul>
//     }
//     imgWidth="50%"
//     direct="right"
//     CTAButton={<HomePageCTAButton2 text={t('section5.cta')!} />}
// />
//
// {/* 멤버 */}
// <USPSection2
//     label="멤버"
//     imgUrl={t('section5.image')}
//     title={<span></span>}
//     desc1={<span></span>}
//     desc2={<span></span>}
//     imgWidth="50%"
//     direct="left"
//     CTAButton={<HomePageCTAButton2 text={t('section5.cta')!} />}
// />
//
// {/* 자동화 */}
// <USPSection2
//     label="자동화"
//     imgUrl={t('section5.image')}
//     title={`필요한 조치도 일일이 들어가지 않고 한 곳에서!`}
//     desc1={<span></span>}
//     desc2={<span></span>}
//     imgWidth="50%"
//     direct="right"
//     CTAButton={<HomePageCTAButton2 text={t('section5.cta')!} />}
// />
