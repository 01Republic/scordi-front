import {memo} from 'react';
import {ApplicationDto} from '^types/application.type';
import {ContentPanelHeading} from '^layouts/ContentLayout';
import {BsFillCaretDownFill} from 'react-icons/bs';
import {Locale, t_BillingCycleTerm} from '^types/applicationBillingCycle.type';

interface CurrentPlanPanelHeader {
    application: ApplicationDto;
}

export const CurrentPlanPanelHeader = memo((props: CurrentPlanPanelHeader) => {
    const {application} = props;

    const {prototype, paymentPlan, billingCycle} = application;

    const protoName = prototype.name;
    const protoImage = prototype.image;
    const planName = paymentPlan.name;
    const planDesc = 'The basics for organizations and developers';
    const cycleName = t_BillingCycleTerm(billingCycle.term, true, Locale.en);

    return (
        <ContentPanelHeading>
            <div className="flex items-center w-full px-3.5">
                <div className="flex items-center gap-3">
                    <img
                        src={protoImage}
                        alt={`${protoName}'s logo`}
                        className="w-8 h-8 bg-white border shadow rounded-full"
                    />

                    <div>
                        <p className="font-semibold">
                            {planName} / <span className="capitalize">{cycleName}</span>
                        </p>
                        <p className="leading-none text-xs text-gray-500">{planDesc}</p>
                    </div>
                </div>

                <div className="ml-auto">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-sm btn-gray shadow normal-case gap-1">
                            <span>Edit</span>
                            <BsFillCaretDownFill size={10} />
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-0 mt-2 shadow bg-base-100 rounded-lg">
                            <li>
                                <a className="whitespace-nowrap text-sm">Add accounts</a>
                            </li>
                            <li>
                                <a className="whitespace-nowrap text-sm">Remove accounts</a>
                            </li>
                            <div className="divider my-0" style={{height: 'initial'}} />
                            <li>
                                <a className="whitespace-nowrap text-sm">Downgrade to Free</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </ContentPanelHeading>
    );
});
