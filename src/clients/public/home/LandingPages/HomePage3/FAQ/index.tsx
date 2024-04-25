import {memo} from 'react';
import {HomePageSection} from '../HomePageSection';
import {QuestionItem} from './QuestionItem';

export const FAQ = memo(function FAQ() {
    return (
        <HomePageSection sectionClass="bg-scordi-light-100 z-20">
            <h2 className="text-center text-3xl sm:text-4xl mb-6 !leading-snug">
                스코디에 대해 <span className="block">궁금한 점이 있으신가요?</span>
            </h2>

            <ul id="faq-list">
                <QuestionItem
                    question={
                        <span>
                            Gmail 권한을 부여하면{' '}
                            <span className="block sm:inline">모든 메일 정보를 읽을 수 있지 않나요?</span>
                        </span>
                    }
                    answer={`걱정하지 마세요.
                    스코디는 Gmail API 위에 추가개발한 자체 기술로 인보이스(결제청구서) 메일만을 추출하고 있습니다.
                    이 부분은 별도의 까다로운 Google 보안 심사와 외부 감사를 거쳐 안전성을 인증받고 있어요.
                    따라서 내부에서도 모든 메일 정보를 확인할 수 없으니 안심하고 이용하셔도 됩니다.`}
                />
                <QuestionItem
                    question={
                        <span>
                            SaaS 비용을 줄이고 나면 <span className="block sm:inline">더 관리 할 필요가 있나요?</span>
                        </span>
                    }
                    answer={`SaaS 관리는 비용 뿐만 아니라 권한이 부여된 계정과 아이디/비밀번호, 필요한 Key 값과 결제수단 관리 등 훨씬 넓은 영역에서 필요해요.
                     
                     비용만 하더라도 자금일보와 별도로, SaaS 구독 비용 증감으로 인해 지속적인 추적 작업이 필요하죠. 잘 관리하기 위해서는 필연적으로 리더십과 실무진의 시간과 노력이 많이 쓰이게 된답니다.`}
                />
                <QuestionItem
                    question={
                        <span>
                            공용계정 관리도 결국 노션이나{' '}
                            <span className="block sm:inline">엑셀에 관리하는거랑 똑같지 않나요?</span>
                        </span>
                    }
                    answer={`기존의 도구들은 사람이 직접 기록하고, 변경이 있을 때마다 돌아와 지속적으로 업데이트 해줘야 하는 등 '메모 도구'에 불과했어요. 이런 방식은 안전하지 않을 뿐더러, 조금만 잊고 있어도 최신 상태를 벗어나는 경우가 많아요. 
                    
                    스코디에서 SaaS 공용계정을 보관하면, 계정을 찾거나 기록하러 돌아오지 않아도 괜찮아요. 크롬 확장프로그램을 기반으로 서비스별 로그인 페이지에서 자동완성과 업데이트가 이뤄지고, 최신 상태를 모두가 동기화 할 수 있어요.
                    
                    게다가 가장 많이 걱정하시는 퇴사자 발생 시 각종 권한 해제와 변경 업데이트 작업까지 단숨에 처리 할 수 있답니다.
                    
                    기존에 노션이나 엑셀, 구글 스프레드시트 등으로 아이디와 패스워드를 기록만 하고 계셨다면, 이제 스코디로 최적화된 게정관리를 경험해보세요.`}
                />
                <QuestionItem
                    question="카드내역과 홈택스도 연동이 되나요?"
                    answer={`해당 부분은 현재 열심히 개발하고 있어요. 빠르면 내년 1월 중 오픈할 예정입니다.
                    
                    스코디는 회사가 사용하는 모든 SaaS를 한 곳에서 온전히 관리 할 수 있도록 많은 노력을 기울이고 있어요. 카드내역과 홈택스도 결제수단과 거래 확인의 주요 출처로서 중요하게 다루고 있답니다.`}
                />
                <QuestionItem
                    question="SaaS 분석은 얼마나 구체적으로 가능한가요?"
                    answer={`현재 청구서 이메일을 기준으로만 분석 해 드리고 있습니다. 지금 재무회계 측면의 구독비용 관리 외에도 보안 및 온보딩/오프보딩 시 계정 운영 관리까지 개선하고 있습니다. 모든 SaaS 정보를 관리하고 한 눈에 볼 수 있도록 빠르게 업데이트 할 예정입니다.`}
                />
            </ul>
        </HomePageSection>
    );
});
