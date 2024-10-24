import {memo, useState} from 'react';
import {MainLayout} from '^clients/private/_layouts/MainLayout';
import {LogoImg} from './LogoImg';
import {MainInputBox} from './MainInputBox';
import {AppUnitList} from './AppUnitList';
import {BannerFeedback} from '^clients/private/orgs/OrgMainPage/BannerFeedback';
import {BannerRecommend} from '^clients/private/orgs/OrgMainPage/BannerRecommend';

export const OrgMainPage = memo(function OrgMainPage() {
    return (
        <MainLayout>
            <div className="container-fluid" />

            <section className="container px-4 pt-20">
                <LogoImg />
                <MainInputBox />
            </section>

            <section className="container px-4">
                <AppUnitList />
            </section>
            <section className="w-full mt-10">
                <div className="flex items-center justify-center gap-[47px]">
                    <BannerFeedback />
                    <BannerRecommend />
                </div>
            </section>
        </MainLayout>
    );
});
