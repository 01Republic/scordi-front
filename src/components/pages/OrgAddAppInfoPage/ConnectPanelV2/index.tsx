import React, {useState} from 'react';
import {ProductDto} from '^types/product.type';
import {SubscriptionPaymentPlanDto} from '^types/subscriptionPaymentPlan.type';
import {ConnectMethod, SelectConnectMethod} from './SelectConnectMethod';
import {ConnectLoginForm} from './ConnectLoginForm';
import {ConnectInManual} from '^components/pages/OrgAddAppInfoPage/ConnectPanelV2/ConnectInManual';

interface ConnectPanelV2Props {
    protoApp: ProductDto;
    selectedPlan: SubscriptionPaymentPlanDto;
    setSelectedPlanId: React.Dispatch<React.SetStateAction<number>>;
}

export const ConnectPanelV2 = (props: ConnectPanelV2Props) => {
    const {protoApp, selectedPlan, setSelectedPlanId} = props;
    const [connectMethod, setConnectMethod] = useState<ConnectMethod>();

    return (
        <>
            {connectMethod === undefined && <SelectConnectMethod setConnectMethod={setConnectMethod} />}

            {connectMethod === ConnectMethod.auto && (
                <ConnectLoginForm protoApp={protoApp} setConnectMethod={setConnectMethod} />
            )}

            {connectMethod === ConnectMethod.manual && (
                <ConnectInManual protoApp={protoApp} setConnectMethod={setConnectMethod} />
            )}
        </>
    );
};
