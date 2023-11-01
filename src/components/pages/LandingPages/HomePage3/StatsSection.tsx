import {memo} from 'react';

export const StatsSection = memo(function StatsSection() {
    return (
        <section id="StatsSection" className="pb-16">
            <div className="container px-4 sm:px-0">
                <h2 className="text-center mb-16">
                    <p
                        className="font-bold text-3xl sm:text-4xl !leading-snug"
                        data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom"
                        data-aos-duration={500}
                    >
                        알게 모르게 나가던 돈과 시간
                    </p>
                    <p
                        className="font-bold text-3xl sm:text-4xl !leading-snug"
                        data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom"
                        data-aos-duration={750}
                    >
                        이젠, 그냥 두지 마세요
                    </p>
                </h2>

                <div className="sm:grid grid-cols-3 gap-2">
                    {/*몇 개의 기업이 가입했고*/}
                    {/*총 몇 개의 사스를 스코디에 등록했고*/}
                    {/*총 아껴드린 시간은 몇 시간*/}
                    {/*<StatBox title="가입한 기업" stat={'총 10개'} text="의 기업이 쓰고 계세요" />*/}
                    <StatBox
                        title="고객이 이용중인 SaaS"
                        stat={'총 0개'}
                        num={293}
                        text="를 관리하고 있어요"
                        duration={500}
                    />
                    <StatBox
                        title="30인 기업 기준"
                        stat={'평균 0개'}
                        num={31}
                        text="의 SaaS 를 쓰고계세요"
                        duration={750}
                    />
                    <StatBox title="스코디를 통해" stat={'+0 H'} num={290} text="시간을 아껴드렸어요" duration={1000} />
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
            className="text-center mb-16"
            data-aos="fade-up"
            data-aos-anchor-placement="bottom-bottom"
            data-aos-duration={duration}
        >
            <div className="font-semibold text-gray-500 text-xl sm:text-lg mb-2">{title}</div>
            <div className="font-semibold text-5xl md:text-5xl text-scordi mb-2">{statText}</div>
            <div className="font-semibold text-gray-500 text-2xl sm:text-xl">{text}</div>
        </div>
    );
});
