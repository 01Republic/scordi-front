import {HTMLAttributeAnchorTarget, memo} from 'react';
import {WithChildren} from '^types/global.type';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {ButtonTo} from '^components/ButtonTo';

interface CurrentPlanZoneHeaderProps {
    subscription: SubscriptionDto;
}

export const CurrentPlanZoneHeader = memo((props: CurrentPlanZoneHeaderProps) => {
    const {subscription} = props;

    const {product} = subscription;

    const {
        workspace: {slug},
    } = subscription;
    const planCompareUrl = eval(`\`${product.planComparePageUrlScheme}\``) as string;
    const upgradePageUrl = eval(`\`${product.upgradePlanPageUrlScheme}\``) as string;

    return (
        <div className="bs-row items-center mb-4">
            {/* Left */}
            <div>
                <h3 className="leading-none">Current Plan</h3>
            </div>

            {/* Right */}
            <div className="ml-auto flex gap-2">
                {planCompareUrl && (
                    <ButtonTo href={planCompareUrl} target="_blank" color="gray" outline text="Compare all plans" />
                )}
                {upgradePageUrl && <ButtonTo href={upgradePageUrl} target="_blank" color="success" text="Upgrade" />}
            </div>
        </div>
    );
});
