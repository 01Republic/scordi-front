import {memo} from 'react';
import {HomePageSection} from './HomePageSection';
import {ReactElementLike} from 'prop-types';

export const Section2 = memo(() => {
    return (
        <HomePageSection sectionClass="bg-[#181719]">
            <div>
                <h2 className="text-center text-white text-2xl sm:text-4xl mb-[4rem]">
                    운영 업무 자동화가 필요한 순간,{' '}
                    <span className="block sm:inline-block">
                        <span className="text-scordi">스코디</span>를 도입한다면?
                    </span>
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                <Section2_Card
                    label="대표"
                    src="/home/202308/section2-persona-1.png"
                    desc={
                        <span>
                            우선순위에 밀려 놓쳤던
                            <br />
                            회사 운영 관리를 로그인 한 번에
                            <br />다 볼 수 있어서 너무 좋습니다.
                        </span>
                    }
                />
                <Section2_Card
                    label="팀 관리자"
                    src="/home/202308/section2-persona-2.png"
                    desc={
                        <span>
                            갑작스럽게 누가 뭘 쓰는지
                            <br />
                            파악해야 할 때 부담스러웠는데,
                            <br />
                            이젠 부담없이 확인할 수 있습니다.
                        </span>
                    }
                />
                <Section2_Card
                    label="경영지원/IR 담당자"
                    src="/home/202308/section2-persona-3.png"
                    desc={
                        <span>
                            매일 30분씩 만들던 리포트를
                            <br />
                            자동으로 받게 되면서 HR업무에
                            <br />
                            집중할 수 있게 되었습니다.
                        </span>
                    }
                />
            </div>
        </HomePageSection>
    );
});

export const Section2_Card = memo((props: {label: string; src: string; desc: ReactElementLike}) => {
    const {label, src, desc} = props;

    return (
        <div className="card bg-[#212022] shadow-2xl transition-all hover:-translate-y-4">
            <div className="hidden sm:flex card-body">
                <p className="text-white opacity-70 text-lg mb-8">{label}</p>
                <div className="flex justify-center mb-8">
                    <img src={src} alt="persona img" className="w-2/3" loading="lazy" />
                </div>
                <p className="text-white text-lg">{desc}</p>
            </div>

            <div className="flex sm:hidden card-body">
                <div className="flex gap-6">
                    <div className="flex justify-center mb-8">
                        <img src={src} alt="persona img" className="w-[90px] h-[90px]" loading="lazy" />
                    </div>
                    <div className="flex-1">
                        <p className="text-scordi-light sm:text-lg mb-4">{label}</p>
                        <p className="text-white sm:text-lg">{desc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
});
