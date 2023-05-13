import React, {memo} from 'react';

interface ArticleSectionMobileProps {
    iconUrl: string;
    title: string;
    subtitle: string;
    desc: string;
    imgUrl: string;
    left?: boolean;
}

export const ArticleSectionMobile = memo((props: ArticleSectionMobileProps) => {
    const {iconUrl, title, subtitle, desc, imgUrl, left = true} = props;

    return (
        <section id="article-section-mobile" className="flex sm:hidden section-box-mobile py-8">
            <div className={`article-section-mobile-box section-inner`}>
                <div className="article-section-mobile-left section-desc">
                    <div className="article-section-mobile-left-title">
                        {/* Sub title */}
                        <div className="title-top" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                            <div className="inline-block w-10 mr-3">
                                <img src={iconUrl} alt="icon" className="w-full" />
                            </div>
                            <p className="s-text-top mt-1">{subtitle}</p>
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
                        className="article-section-mobile-left-desc flex flex-col shrink-0"
                        data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom"
                    >
                        <p className="s-text-sm" dangerouslySetInnerHTML={{__html: desc}} />
                    </div>
                </div>

                <div className={`article-section-mobile-right w-[80%] flex mt-7`}>
                    <img
                        src={imgUrl}
                        alt="service preview image"
                        className="w-full"
                        data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom"
                    />
                </div>
                <div
                    className="article-section-mobile-left-btn"
                    data-aos="fade-up"
                    data-aos-anchor-placement="center-bottom"
                >
                    <button className="btn closeBeta-btn mt-5">클로즈베타 신청하기</button>
                </div>
            </div>
        </section>
    );
});
