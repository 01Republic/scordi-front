import {memo} from 'react';
import {HomePageSection} from '../HomePageSection';
import {ReviewItem} from './ReviewItem';

export const Review = memo(function Review() {
    return (
        <HomePageSection sectionClass="py-20">
            <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="500">
                <p className="text-center text-scordi font-semibold mb-4 !leading-snug">WHAT PEOPLE SAY</p>
                <h2 className="text-center text-3xl sm:text-4xl mb-10 !leading-snug">파트너사 후기</h2>
            </div>
            <br />

            <div
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                data-aos-anchor-placement="bottom-bottom"
                data-aos-duration="500"
            >
                <ReviewItem
                    duration={500}
                    reviewer="허백"
                    company="테스트뱅크"
                    role="CPO"
                    logo="/images/landing/featured-customer-logo/testbank.png"
                    title="첫 인상이 짜릿하네요."
                    content={`다른 팀원들까지 모여 모니터 화면 보면서 클릭 하자마자 서비스랑 결제 내역 쫙 모아주는거 구경했어요.

노션으로 계정 정리하고 있었는데 멤버들이 늘어나면서 쓰는 것도 많아지고 점점 관리가 안돼서 힘들었어요. 정확히 지금 필요한 서비스에요.
SaaS 관리에 필요한 추가 기능이 앞으로 더 생겼을 때는 정말 환상적일 것 같아요.`}
                />
                <ReviewItem
                    duration={750}
                    reviewer="박태훈"
                    company="비즈니스캔버스"
                    role="PO"
                    logo="/images/landing/featured-customer-logo/business-canvas.png"
                    title="오! 대박이다! 어떻게 클릭 한 번에 서비스랑 내역이 보여질 수 있나요?"
                    content={`저희는 SaaS 관리는 팀 매니저들이 하고, 구독결제는 오퍼레이션팀에서 관리하고 있어요. 저희 운영팀의 문제를 해결해 줄 수 있겠네요. 진짜 최곤거같아요.`}
                />
                <ReviewItem
                    duration={1000}
                    reviewer="최현일"
                    company="코스모스이펙트"
                    role="CEO"
                    logo="/images/landing/featured-customer-logo/peopet.png"
                    title="처음엔 'SaaS비용, 해봤자 얼마나 돈 버리겠어' 라고 생각했어요."
                    content={`스코디 연동해서 보니 실제로 SaaS에 돈을 생각했던 것보다 더 많이 쓰고 있더라고요. 인원이 많아지면 점점 손실이 커질텐데, 스코디로 미리 방지할 수 있을 것 같아요. 덕분에 SaaS 를 쓰면서 낭비하고 있던 비용도 아꼈어요.`}
                />
            </div>

            {/*<div className="carousel carousel-center space-x-4">*/}
            {/*    <div className="carousel-item">*/}
            {/*        <ReviewItem reviewer="허O" company="Testbank" role="CPO" />*/}
            {/*        /!*<img src="/images/stock/photo-1559703248-dcaaec9fab78.jpg" className="rounded-box" />*!/*/}
            {/*    </div>*/}
            {/*    <div className="carousel-item">*/}
            {/*        <ReviewItem reviewer="김태O" company="비즈니스캔버스" role="PO" />*/}
            {/*        /!*<img src="/images/stock/photo-1565098772267-60af42b81ef2.jpg" className="rounded-box" />*!/*/}
            {/*    </div>*/}
            {/*    <div className="carousel-item">*/}
            {/*        <ReviewItem reviewer="이주O" company="팀스파르타" role="Accountant" />*/}
            {/*        /!*<img src="/images/stock/photo-1572635148818-ef6fd45eb394.jpg" className="rounded-box" />*!/*/}
            {/*    </div>*/}
            {/*</div>*/}
        </HomePageSection>
    );
});
