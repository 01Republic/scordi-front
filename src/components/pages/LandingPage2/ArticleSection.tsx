import React, {memo} from 'react';

interface ArticleSectionProps {
    iconUrl: string;
    title: string;
    subtitle: string;
    desc: string;
    imgUrl: string;
    left?: boolean;
}

export const ArticleSection = memo((props: ArticleSectionProps) => {
    const {iconUrl, title, subtitle, desc, imgUrl, left = true} = props;

    return (
        <section
            id="section-5"
            className="hidden sm:flex sm:justify-center section-box pt-14 pb-10 lg:pt-20 lg:pb-12 lg:text-left"
        >
            <div className={`section-5-box section-inner ${left ? '' : 'lg:!flex-row-reverse !flex-col'}`}>
                <div className="section-5-left section-desc">
                    <div className="section-5-left-title">
                        {/* Sub title */}
                        <div
                            className="title-top justify-center lg:justify-start"
                            data-aos="fade-up"
                            data-aos-anchor-placement="center-bottom"
                        >
                            <div className="inline-block w-10 mr-3">
                                <img src={iconUrl} alt="icon" className="w-full" />
                            </div>
                            <p className="s-text-top mt-1 lg:mt-2">{subtitle}</p>
                        </div>
                        {/* Title */}
                        <h2
                            className="h2-text"
                            data-aos="fade-up"
                            data-aos-anchor-placement="center-bottom"
                            dangerouslySetInnerHTML={{__html: title}}
                        />
                    </div>
                    {/* Description */}
                    <div
                        className="section-5-left-desc flex flex-col justify-start shrink-0"
                        data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom"
                    >
                        <p className="s-text-sm" dangerouslySetInnerHTML={{__html: desc}} />
                    </div>

                    <div
                        className="section-5-left-btn hidden lg:block"
                        data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom"
                    >
                        <button className="btn closeBeta-btn">클로즈베타 신청하기</button>
                    </div>
                </div>

                <div
                    className={`section-5-right w-2/4 sm:w-[80%] lg:w-[45%] sm:pt-10 sm:pb-6 lg:py-0 flex ${
                        left ? 'justify-center lg:justify-end' : ''
                    }`}
                >
                    <img
                        src={imgUrl}
                        alt="service preview image"
                        className="w-full"
                        data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom"
                    />
                </div>
                <div
                    className="section-5-left-btn block lg:hidden"
                    data-aos="fade-up"
                    data-aos-anchor-placement="center-bottom"
                >
                    <button className="btn closeBeta-btn">클로즈베타 신청하기</button>
                </div>
            </div>
        </section>
    );
});
