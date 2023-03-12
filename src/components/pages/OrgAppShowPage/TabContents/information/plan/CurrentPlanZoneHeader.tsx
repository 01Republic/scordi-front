import {HTMLAttributeAnchorTarget, memo} from 'react';
import {WithChildren} from '^types/global.type';
import {ApplicationDto} from '^types/application.type';
import {ButtonTo} from '^components/ButtonTo';

interface CurrentPlanZoneHeaderProps {
    application: ApplicationDto;
}

export const CurrentPlanZoneHeader = memo((props: CurrentPlanZoneHeaderProps) => {
    const {application} = props;

    const {prototype} = application;

    const appSlug = application.displayName; // TODO: application.slug
    const planCompareUrlStr = 'https://github.com/organizations/${appSlug}/billing/plans';
    const upgradePageUrlStr = 'https://github.com/organizations/${appSlug}/billing/plans';
    const planCompareUrl = eval(`\`${planCompareUrlStr}\``) as string; // TODO: 프로토타입에 planCompareUrl
    const upgradePageUrl = eval(`\`${upgradePageUrlStr}\``) as string; // TODO: 프로토타입에 upgradePageUrl

    return (
        <div className="bs-row items-center mb-4">
            {/* Left */}
            <div>
                <h3 className="leading-none">Current Plan</h3>
            </div>

            {/* Right */}
            <div className="ml-auto flex gap-2">
                {planCompareUrlStr && (
                    <ButtonTo href={planCompareUrl} target="_blank" color="gray" outline text="Compare all plans" />
                )}
                {upgradePageUrlStr && <ButtonTo href={upgradePageUrl} target="_blank" color="success" text="Upgrade" />}
            </div>
        </div>
    );
});
