import {memo} from 'react';
import {ApplicationDto} from '^types/application.type';
import {CurrentPlanPanelHeader} from './plan/CurrentPlanPanelHeader';
import {CurrentPlanZoneHeader} from './plan/CurrentPlanZoneHeader';
import {CurrentPlanPaidAccountStatus} from './plan/CurrentPlanPaidAccountStatus';

interface CurrentPlanZoneProps {
    application: ApplicationDto;
}

export const CurrentPlanZone = memo((props: CurrentPlanZoneProps) => {
    const {application} = props;
    const {prototype, paymentPlan} = application;

    return (
        <div className="bs-container mb-10">
            <CurrentPlanZoneHeader application={application} />

            <div className="divider mb-4 -mx-[20px]" />

            <div className="bs-row mb-3">
                <div className="bs-col px-0">
                    <div className="card w-full bg-white shadow border">
                        <CurrentPlanPanelHeader application={application} />

                        <div className="card-body">
                            {/* Plan Content */}
                            <div className="bs-row m-0">
                                <div className="bs-col-6">
                                    <p className="h5 color-fg-muted">included:</p>
                                    <ul className="list-style-none">
                                        <li className="mb-2 ml-4">Unlimited public/private repos</li>
                                        <li className="mb-2 ml-4">Unlimited collaborators</li>
                                        <li className="mb-2 ml-4">2,000 Actions minutes/month</li>
                                        <li className="mb-2 ml-4">500MB of Packages storage</li>
                                        <li className="mb-2 ml-4">120 core-hours of Codespaces compute</li>
                                        <li className="mb-2 ml-4">15GB of Codespaces storage</li>
                                        <li className="mb-2 ml-4">Community support</li>
                                    </ul>
                                </div>
                                <div className="bs-col-6">
                                    <p className="h5 color-fg-muted">Not included:</p>
                                    <ul className="list-style-none">
                                        <li className="mb-2 ml-4">Protected branches on all repos</li>
                                        <li className="mb-2 ml-4">Access to Codespaces</li>
                                        <li className="mb-2 ml-4">Multiple reviewers in pull requests</li>
                                        <li className="mb-2 ml-4">Required status checks</li>
                                        <li className="mb-2 ml-4">Code owners</li>
                                        <li className="mb-2 ml-4">Required reviewers</li>
                                        <li className="mb-2 ml-4">Pages for static website hosting</li>
                                        <li className="mb-2 ml-4">Web-based support</li>
                                    </ul>
                                    <p className="mt-3">
                                        <a
                                            href="/organizations/theplaza/billing/plans"
                                            data-analytics-event='{"category":"Account","action":"click to compare plans","label":"location:current plan;text:See all features and compare plans"}'
                                        >
                                            See all features and compare plans
                                        </a>
                                    </p>
                                </div>
                            </div>

                            {/*<div className="card-actions justify-end">*/}
                            {/*    <button className="btn btn-primary">Buy Now</button>*/}
                            {/*</div>*/}
                        </div>

                        <CurrentPlanPaidAccountStatus application={application} />
                    </div>
                </div>
            </div>
        </div>
    );
});
