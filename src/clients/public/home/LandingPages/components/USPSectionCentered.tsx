import React, {ComponentType, FunctionComponent, memo, MemoExoticComponent, ReactElement} from 'react';
import Image from 'next/image';
import {BetaUserApplyCTAButton} from '^clients/public/home/LandingPages/components/CTAButton';
import {WithChildren} from '^types/global.type';

interface USPSectionCenteredProps<T = FunctionComponent<any>> extends WithChildren {
    title: string | ReactElement;
    desc1?: string;
    showCTA?: boolean;
    CTAButton?: ReactElement;
}

export const USPSectionCentered = memo((props: USPSectionCenteredProps) => {
    const {title, desc1, CTAButton, showCTA = false, children} = props;

    return (
        <section className="bg-scordi-light-100 py-20">
            <div
                className="container"
                // data-aos="fade-up"
                // data-aos-anchor-placement="center-bottom"
            >
                {typeof title === 'string' ? (
                    <h2
                        className="text-center text-3xl sm:text-4xl mb-6 !leading-snug"
                        dangerouslySetInnerHTML={{__html: title}}
                        // data-aos="fade-up"
                        // data-aos-anchor-placement="center-bottom"
                    />
                ) : (
                    <h2
                        className="text-center text-3xl sm:text-4xl mb-6 !leading-snug"
                        // data-aos="fade-up"
                        // data-aos-anchor-placement="center-bottom"
                    >
                        {title}
                    </h2>
                )}

                {desc1 && (
                    <p
                        className="text-center mb-6 font-semibold md:font-normal text-lg md:text-xl text-gray-600"
                        dangerouslySetInnerHTML={{__html: desc1}}
                        // data-aos="fade-up"
                        // data-aos-anchor-placement="center-bottom"
                    />
                )}

                {showCTA && (
                    <div
                        className="mb-6 w-full flex items-center justify-center"
                        // data-aos="fade-up"
                        // data-aos-anchor-placement="center-bottom"
                    >
                        {CTAButton ? CTAButton : <BetaUserApplyCTAButton />}
                    </div>
                )}

                {(desc1 || showCTA) && (
                    <>
                        <br />
                        <br />
                        <br />
                    </>
                )}

                <div className="px-10 md:px-0 md:flex justify-evenly">{children}</div>
            </div>
        </section>
    );
});
