import {CSSProperties, memo, ReactElement} from 'react';
import {BetaUserApplyCTAButton} from './CTAButton';
import {ReactNodeLike} from 'prop-types';

interface USPSectionProps {
    label: string;
    imgUrl: string;
    imgWidth?: string;
    imgStyle?: CSSProperties;
    imgClass?: string;
    title: ReactNodeLike;
    desc1?: ReactNodeLike;
    desc2?: ReactNodeLike;
    direct: 'left' | 'right';
    bgGray?: boolean;
    showCTA?: boolean;
    CTAButton?: ReactElement;
}

export const USPSection2 = memo((props: USPSectionProps) => {
    const {
        label,
        direct,
        imgUrl,
        imgWidth = '60%',
        imgStyle,
        imgClass = '',
        title,
        desc1,
        desc2,
        bgGray = false,
        showCTA = true,
        CTAButton,
    } = props;

    return (
        <div className={`hero md:min-h-[80vh] ${bgGray ? 'bg-base-200' : ''}`}>
            <div
                className={`hero-content text-center px-10 md:text-left justify-between w-full flex-col ${
                    direct === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
            >
                <img
                    src={imgUrl}
                    className={`md:w-[${imgWidth}] rounded-lg relative ${imgClass}`}
                    style={imgStyle}
                    // data-aos="fade-up"
                    // data-aos-anchor-placement="center-bottom"
                />
                <div>
                    <p className="font-semibold text-scordi">{label}</p>
                    <h2
                        className="text-3xl md:text-5xl font-bold mb-6 !leading-snug keep-all"
                        // data-aos="fade-up"
                        // data-aos-anchor-placement="center-bottom"
                    >
                        {title}
                    </h2>
                    {desc1 && (
                        <p
                            className="mb-3 md:text-xl italic text-gray-500 font-light"
                            // data-aos="fade-up"
                            // data-aos-anchor-placement="center-bottom"
                        >
                            {desc1}
                        </p>
                    )}
                    {desc2 && (
                        <div
                            className="mb-10 font-semibold md:font-normal md:text-xl text-gray-600"
                            // data-aos="fade-up"
                            // data-aos-anchor-placement="center-bottom"
                        >
                            {desc2}
                        </div>
                    )}

                    {showCTA && (
                        <div
                        // data-aos="fade-up"
                        // data-aos-anchor-placement="center-bottom"
                        >
                            {CTAButton ? CTAButton : <BetaUserApplyCTAButton />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});
