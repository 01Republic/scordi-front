import {memo} from 'react';
import {BetaUserApplyCTAButton} from './CTAButton';

interface USPSectionProps {
    imgUrl: string;
    imgWidth?: string;
    title: string;
    desc1?: string;
    desc2?: string;
    direct: 'left' | 'right';
    bgGray?: boolean;
}

export const USPSection = memo((props: USPSectionProps) => {
    const {direct, imgUrl, imgWidth = '60%', title, desc1, desc2, bgGray = false} = props;

    return (
        <div className={`hero md:min-h-[80vh] ${bgGray ? 'bg-base-200' : ''}`}>
            <div
                className={`hero-content text-center px-10 md:text-left justify-between w-full flex-col ${
                    direct === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
            >
                <img
                    src={imgUrl}
                    className={`md:w-[${imgWidth}] rounded-lg relative`}
                    data-aos="fade-up"
                    data-aos-anchor-placement="center-bottom"
                />
                <div>
                    <h1
                        className="text-4xl md:text-5xl font-bold mb-6"
                        dangerouslySetInnerHTML={{__html: title}}
                        data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom"
                    />
                    {desc1 && (
                        <p
                            className="mb-3 text-lg md:text-xl italic text-gray-500 font-light"
                            dangerouslySetInnerHTML={{__html: desc1}}
                            data-aos="fade-up"
                            data-aos-anchor-placement="center-bottom"
                        />
                    )}
                    {desc2 && (
                        <p
                            className="mb-10 font-semibold md:font-normal text-lg md:text-xl text-gray-600"
                            dangerouslySetInnerHTML={{__html: desc2}}
                            data-aos="fade-up"
                            data-aos-anchor-placement="center-bottom"
                        />
                    )}
                    <BetaUserApplyCTAButton />
                </div>
            </div>
        </div>
    );
});
