import {memo} from 'react';

export const StatsSection = memo(function StatsSection() {
    return (
        <section id="StatsSection" className="py-16 bg-scordi-light-100">
            <div className="container px-4 sm:px-0">
                <h2 className="text-center mb-16">
                    <p
                        className="font-bold text-2xl sm:text-4xl !leading-snug"
                        data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom"
                        data-aos-duration={500}
                    >
                        몇 개 쓰는지 정확히 몰랐다면
                    </p>
                    <p
                        className="font-bold text-2xl sm:text-4xl !leading-snug"
                        data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom"
                        data-aos-duration={750}
                    >
                        SaaS 관리를 시작 해야 할 때
                    </p>
                </h2>

                <div className="sm:grid grid-cols-3 gap-2">
                    {/*몇 개의 기업이 가입했고*/}
                    {/*총 몇 개의 사스를 스코디에 등록했고*/}
                    {/*총 아껴드린 시간은 몇 시간*/}
                    {/*<StatBox title="가입한 기업" stat={'총 10개'} text="의 기업이 쓰고 계세요" />*/}
                    <StatBox
                        title="고객이 관리중인 SaaS는"
                        stat={'총 0개'}
                        num={293}
                        text="보다 점점 늘어나고 있어요"
                        duration={500}
                    />
                    <StatBox
                        title="30명대 기업 기준으로"
                        stat={'평균 0개'}
                        num={39}
                        text="의 SaaS를 쓰고 계세요"
                        duration={750}
                    />
                    <StatBox
                        title="스코디를 통해 1년에"
                        stat={'+0시간'}
                        num={960}
                        text="을 아껴드렸어요"
                        duration={1000}
                    />
                </div>
            </div>
        </section>
    );
});

interface StatBoxProps {
    title: string;
    stat: string;
    text: string;
    num?: number;
    duration?: number;
}

const StatBox = memo((props: StatBoxProps) => {
    const {title, stat, num = 0, text, duration} = props;

    let statText = stat;
    if (num) {
        statText = stat.replace('0', num.toString());
    }

    return (
        <div
            className="text-center mb-12"
            data-aos="fade-up"
            data-aos-anchor-placement="bottom-bottom"
            data-aos-duration={duration}
        >
            <div className="font-semibold text-gray-500 text-lg sm:text-lg mb-2">{title}</div>
            <div className="font-semibold text-4xl md:text-5xl text-scordi mb-2">{statText}</div>
            <div className="font-semibold text-gray-500 text-xl sm:text-xl">{text}</div>
        </div>
    );
});
