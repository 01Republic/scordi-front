import {memo} from 'react';
import {HomePageSection} from '../HomePageSection';
import {QuestionItem} from './QuestionItem';

export const FAQ = memo(function FAQ() {
    return (
        <HomePageSection sectionClass="bg-scordi-light-100 py-20 z-20">
            <h2 className="text-center text-3xl sm:text-4xl mb-6 !leading-snug">자주 묻는 질문</h2>

            <ul id="faq-list">
                <QuestionItem
                    question="결제대행사와 계약을 진행하기 전에 무엇을 준비해야 하나요?"
                    answer={`결제대행사 계약을 위해 가장 먼저 서비스 구현이 필요합니다.
                     입점 심사를 위한 기본 정보가 홈페이지 또는 앱에 구현되어있다면 계약 진행이 가능합니다.`}
                />
                <QuestionItem
                    question="결제대행사 신청 후 실제 결제 이용까지 기간은 얼마나 걸리나요?"
                    answer={`신규 계약 신청 후 결제대행사 최종 심사완료까지 약 3~4주의 기간이 소요됩니다. 서비스 오픈 일정은 결제대행사 계약 전/후에 충분한 연동 테스트를 위한 일정을 함께 고려하시길 권장드립니다. 이보다 빠른 서비스 오픈을 원하신다면 바로오픈 서비스를 이용하시길 추천드립니다. *바로오픈 서비스는 현재 KG이니시스에 한하여 이용 가능합니다. 추후 결제대행사 추가 예정입니다.`}
                />
                <QuestionItem
                    question="포트원을 통해 결제대행사를 연동하면 어떤 비용이 발생하나요?"
                    answer={`결제대행사와의 계약 단계에서 가입비, 연 관리비, 보증보험 가입 수수료가 청구되나, 이 중 가입비와 연 관리비는 포트원 이용시 무료로 적용되므로 보증보험 가입 수수료만 납부하면 됩니다. 계약 후 실 서비스 이용시 결제수단별 수수료가 발생합니다. *결제대행사의 부가서비스 이용시 추가 비용이 발생할 수 있습니다`}
                />
                <QuestionItem
                    question="결제대행사는 어떤 기준으로 선택해야 하나요?"
                    answer={`결제대행사는 판매하고자 하시는 비즈니스 모델에 적합한 결제수단, 연동방식을 고려하시는 것이 좋으며 그 외에도 수수료율, 결제대행사 인지도 등을 복합적으로 비교하여 선택하시길 권장드립니다.`}
                />
            </ul>
        </HomePageSection>
    );
});
