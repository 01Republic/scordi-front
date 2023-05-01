import React, {memo, ReactElement} from 'react';

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
        <section id="section-5" className="section-box pt-48 pb-24">
            <div className={`section-5-box section-inner ${left ? '' : '!flex-row-reverse'}`}>
                <div className="section-5-left section-desc">
                    <div className="section-5-left-title">
                        <div className="title-top" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                            <div className="inline-block w-10 mr-3">
                                <img src={iconUrl} alt="icon" className="w-full" />
                            </div>
                            <p className="s-text-top mt-3">{subtitle}</p>
                        </div>

                        <h2
                            className="h2-text"
                            data-aos="fade-up"
                            data-aos-anchor-placement="center-bottom"
                            dangerouslySetInnerHTML={{__html: title}}
                        />
                    </div>

                    <div
                        className="section-5-left-desc flex flex-col justify-start shrink-0"
                        data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom"
                    >
                        <p className="s-text-sm" dangerouslySetInnerHTML={{__html: desc}} />
                    </div>

                    <div className="section-5-left-btn" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                        <button className="btn closeBeta-btn">클로즈베타 신청하기</button>
                    </div>
                </div>

                <div className={`section-5-right w-2/4 flex ${left ? 'justify-end' : ''}`}>
                    <img
                        src={imgUrl}
                        alt="service preview image"
                        className="w-10/12"
                        data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom"
                    />
                </div>
            </div>
        </section>
    );
});
