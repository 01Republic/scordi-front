import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {USPSectionCentered} from '^clients/public/home/LandingPages/components';
import {useTranslation} from 'next-i18next';

export const HomePageSection3 = memo(() => {
    const {t} = useTranslation('publicMain');

    return (
        <USPSectionCentered
            title={
                <span data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                    <span className="hidden sm:inline-block" dangerouslySetInnerHTML={{__html: t('section3.title')}} />
                    <span
                        className="inline-block sm:hidden"
                        dangerouslySetInnerHTML={{__html: t('section3.titleMobile')}}
                    />
                </span>
            }
            showCTA={false}
        >
            <div className="text-center" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                <div className="w-full px-8 pt-8 sm:pt-0">
                    <img className="mx-auto" src={t('section3.left.image')!} style={{maxHeight: '300px'}} />
                </div>

                <div className="btn btn-block rounded-full sm:btn-lg bg-gray-200 hover:bg-gray-200 shadow text-xl sm:text-2xl font-bold text-gray-400">
                    {t('section3.left.text')}
                </div>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                <div className="w-full px-8 pt-8 sm:pt-0">
                    <img className="mx-auto" src={t('section3.right.image')!} style={{maxHeight: '300px'}} />
                </div>

                <div className="btn btn-block rounded-full sm:btn-lg bg-scordi-200 hover:bg-scordi-200 shadow text-xl sm:text-2xl font-bold text-scordi-600">
                    {t('section3.right.text')}
                </div>
            </div>
        </USPSectionCentered>
    );
});
