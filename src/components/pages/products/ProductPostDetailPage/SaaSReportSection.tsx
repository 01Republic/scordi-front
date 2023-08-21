import {memo} from 'react';

export const SaaSReportSection = memo(() => {
    return (
        <>
            <section className="w-full bg-black">
                <div className="card card-side !rounded-none py-2 px-[18rem]">
                    <figure>
                        <img
                            src="/images/illustration/saas-section-img01.png"
                            alt="new letter section background"
                            draggable={false}
                            loading="lazy"
                        />
                    </figure>
                    <div className="card-compact text-white text-left align-middle py-5 px-5">
                        <h1 className="card-title pt-[3rem] text-2xl">SaaS를 모으면 생산성이 올라가요.</h1>
                        <p className="py-[1rem]">
                            생산성을 높여 시간의 가치를 높이고 싶습니다. <br /> 지금바로 SaaS를 공유해주세요.
                        </p>
                        <div className="card-actions">
                            <button className="btn btn-primary">SaaS 공유하기</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
});
