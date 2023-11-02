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
                    question="Gmail 권한을 부여하면 모든 메일 정보를 읽을 수 있지 않나요?"
                    answer={`아닙니다. 스코디는 Gmail API 위에 추가개발한 자체 기술로 인보이스 메일만을 추출합니다.
                    따라서 모든 메일 정보를 확인할 수 없으니 안심하고 이용하셔도 됩니다.`}
                />
                <QuestionItem
                    question="SaaS 비용을 줄이고 나면 관리 필요성이 없어지지 않나요?"
                    answer={`SaaS 관리는 비용 뿐만 아니라 권한이 부여된 계정과 아이디/비밀번호, 필요한 Key 값과 같은 전반적인 영역을 포함합니다. 더불어 비용 측면만 보더라도 월별, 분기별로 자금일보와 별도로 SaaS 구독 비용 증감으로 인한 엑셀 작업을 지속적으로 하게 되어 SaaS 관리 필요성은 높아집니다.`}
                />
                <QuestionItem
                    question="공용계정 관리도 결국 노션이나 엑셀에 관리하는거랑 똑같지 않나요?"
                    answer={`스코디에 SaaS 공용계정을 입력하면 크롬 익스텐션을 기반으로 비밀번호 자동완성과 퇴사자 발생 시 변경 업데이트 작업이 이뤄집니다. 기존에 노션이나 엑셀, 구글 스프레드시트 등으로 아이디, 패스워드를 쌓고만 계셨다면 이제 스코디로 워크플로우 간소화 및 자동화를 경험해보세요.`}
                />
                <QuestionItem
                    question="카드내역과 홈택스 등 연동도 가능한가요?"
                    answer={`현재 해당 부분을 개발중에 있습니다. 빠르면 내년 1월 중 오픈할 예정입니다. 스코디는 모든 회사가 사용하는 SaaS를 한 곳에서 관리할 수 있도록 비용 지출 측면에서도 많은 노력을 기울이고 있습니다.`}
                />
                <QuestionItem
                    question="SaaS 분석은 얼마나 구체적으로 가능한가요?"
                    answer={`현재 청구서 이메일을 기준으로만 분석 해 드리고 있습니다. 지금 재무회계 측면의 구독비용 관리 외에도 보안 및 온보딩/오프보딩 시 계정 운영 관리까지 개선하고 있습니다. 모든 SaaS 정보를 관리하고 한 눈에 볼 수 있도록 빠르게 업데이트 할 예정입니다.`}
                />
            </ul>
        </HomePageSection>
    );
});
