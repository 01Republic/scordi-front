import React, {memo} from 'react';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {FindByGmailButton} from './FindByGmailButton';
import {TastingPageProps} from '^pages/tasting';
import {EmailParsedTable} from '^components/pages/TastingPage/EmailParsedTable';

export const TastingPage = memo((props: TastingPageProps) => {
    const {} = props;

    return (
        <div id="TastingPage">
            <LandingPageNavBar showLoginButton={false} />

            <section id="section-account" className="container pt-24 mb-12 md:pt-36">
                <div className="text-center">
                    <div className="mb-10">
                        <h1 className="text-5xl mb-3">Find all your team subscription usage</h1>
                        <p className="text-lg text-gray-500">(This is just a tasting. It will never be saved.)</p>
                    </div>

                    <FindByGmailButton />
                </div>
            </section>

            <section className="container mb-24">
                <div className="text-center">
                    <EmailParsedTable />
                </div>
            </section>

            <section className="container">
                <br />
            </section>
        </div>
    );
});
