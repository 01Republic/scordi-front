import {memo} from 'react';
import {HomePageSection} from '../HomePageSection';
import {ReviewItem} from './ReviewItem';

export const Review = memo(function Review() {
    return (
        <HomePageSection sectionClass="py-20">
            {/*<h2 className="text-center text-3xl sm:text-4xl mb-6 !leading-snug"></h2>*/}
            <div></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ReviewItem reviewer="허O" company="Testbank Inc." role="CPO" />
                <ReviewItem reviewer="김태O" company="비즈니스캔버스" role="PO" />
                <ReviewItem reviewer="이주O" company="팀스파르타(주)" role="Accountant" />
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
