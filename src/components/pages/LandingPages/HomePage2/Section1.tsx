import {memo, useEffect, useState} from 'react';
import {HomePageSection} from './HomePageSection';
import {CountUp} from 'countup.js';

export const Section1 = memo(() => {
    return (
        <HomePageSection sectionClass="bg-white">
            <div>
                <h2 className="text-center text-4xl mb-[4rem]">
                    스코디와 함께하면{' '}
                    <span className="block">
                        <span className="text-scordi">이만큼</span> 아낄 수 있어요
                    </span>
                </h2>
            </div>

            <div className="block sm:flex items-stretch justify-around">
                <Section1_Card
                    id="save-hour"
                    preLine={`1년 중 단순 업무 시간 620H`}
                    lead={`낭비 시간 620H 중`}
                    count={248}
                    unit="H"
                />
                <div className="hidden sm:block w-[1px] h-auto bg-gray-300" />
                <Section1_Card
                    id="save-cost"
                    preLine={`SaaS에 들어갔던 월 평균 비용`}
                    lead={`700,000원 중`}
                    count={100000}
                    unit="원"
                />
            </div>
        </HomePageSection>
    );
});

export const Section1_Card = memo((props: {id: string; preLine: string; lead: string; count: number; unit: string}) => {
    const {id, preLine, lead, count, unit} = props;
    const [activated, setActivated] = useState(false);

    useEffect(() => {
        const elem = document.getElementById(id)!;
        const offsetTop = elem.offsetTop;
        const binding = () => {
            const scrollSize = window.innerHeight + window.scrollY;
            setActivated(scrollSize >= offsetTop);
        };
        window.addEventListener('scroll', binding);

        return () => window.removeEventListener('scroll', binding);
    }, []);

    useEffect(() => {
        const option = {
            duration: 0.5,
            decimalPlaces: 0,
            separator: ',',
            decimal: '.',
        };
        const val = activated ? count : 0;
        const countUp = new CountUp(id, val, option);
        setTimeout(() => countUp.start());
    }, [activated]);

    return (
        <div className="flex-1 text-center py-[2.5rem]">
            <p className="text-xl text-gray-500 mb-4">{preLine}</p>
            <p className="text-xl font-semibold mb-2">{lead}</p>
            <p className="text-scordi font-bold text-6xl">
                <span id={id}></span>
                <span>{unit}</span>
            </p>
        </div>
    );
});
