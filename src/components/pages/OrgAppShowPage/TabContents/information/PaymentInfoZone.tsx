import {memo} from 'react';
import {SubscriptionDto} from '^types/subscription.type';

interface PaymentInfoZoneProps {
    subscription: SubscriptionDto;
}

export const PaymentInfoZone = memo((props: PaymentInfoZoneProps) => {
    const {subscription} = props;
    const {product, paymentPlan} = subscription;

    const {publicEmail, billingEmail} = subscription;

    return (
        <div className="bs-container mb-20">
            <div className="bs-row items-center mb-4">
                {/* Left */}
                <div>
                    <h3 className="leading-none">Payment Information</h3>
                </div>

                {/* Right */}
                <div className="ml-auto flex gap-2">
                    {/*{planCompareUrlStr && (*/}
                    {/*    <ButtonTo href={planCompareUrl} target="_blank" color="gray" outline text="Compare all plans" />*/}
                    {/*)}*/}
                    {/*{upgradePageUrlStr && <ButtonTo href={upgradePageUrl} target="_blank" color="success" text="Upgrade" />}*/}
                </div>
            </div>

            <div className="divider mb-4 -mx-[20px]" />

            <div className="bs-row mb-3 gap-6">
                {/*<div className="flex-1">*/}
                {/*    <div className="card w-full bg-white shadow border">*/}
                {/*        <div className="card-body">*/}
                {/*            <div>Credit Card</div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="flex-1">
                    <div className="card w-full bg-white shadow border">
                        <div className="card-body">
                            <div className="bs-row m-0">
                                <div className="bs-col-6">
                                    <p className="card-title">Public Email</p>
                                    <p>{publicEmail || <span className="text-gray-400">No email set</span>}</p>
                                </div>

                                <div className="bs-col-6">
                                    <p className="card-title">Billing Email</p>
                                    <p>{billingEmail || <span className="text-gray-400">No email set</span>}</p>
                                </div>
                            </div>
                        </div>

                        <div className="card-body p-0 overflow-x-auto">
                            <table className="table w-full border-t">
                                <thead>
                                    <tr>
                                        <th
                                            className="normal-case"
                                            style={{borderTopLeftRadius: 0, borderTopRightRadius: 0}}
                                        >
                                            Registered Payment Methods
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Credit Card</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
