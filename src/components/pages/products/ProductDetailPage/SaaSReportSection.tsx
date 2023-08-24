import {memo} from 'react';

export const SaaSReportSection = memo(() => {
    return (
        <>
            <section className="w-full bg-black py-2 px-4 flex justify-center">
                <div className="card sm:card-side !rounded-none">
                    <figure>
                        <img
                            src="/images/illustration/saas-section-img01.png"
                            alt="new letter section background"
                            draggable={false}
                            loading="lazy"
                        />
                    </figure>
                    <div className="card-compact text-white text-left align-middle py-5 px-5">
                        <h1 className="card-title sm:pt-[3rem] text-2xl">SaaS를 모으면 생산성이 올라가요.</h1>
                        <p className="py-[1rem]">
                            생산성을 높여 시간의 가치를 높이고 싶습니다. <br /> 지금바로 SaaS를 공유해주세요.
                        </p>
                        <div className="card-actions mb-4">
                            <button className="btn btn-scordi normal-case">SaaS 공유하기</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
});
