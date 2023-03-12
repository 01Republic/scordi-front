import {HTMLAttributeAnchorTarget, memo} from 'react';
import {WithChildren} from '^types/global.type';
import {ApplicationDto} from '^types/application.type';

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

interface ButtonToProps {
    href?: string;
    text?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    color?: 'success' | 'gray';
    outline?: boolean;
    className?: string;
    target?: HTMLAttributeAnchorTarget;
    onClick?: () => any;
}

const ButtonTo = memo((props: ButtonToProps & WithChildren) => {
    const {text, size = 'sm', color, outline = false, className = '', children, ...attrs} = props;

    const classNames = ['btn normal-case'];

    // size
    if (size !== 'md') classNames.push(`btn-${size}`);

    // colors
    if (color === 'success') classNames.push('btn-success border border-success text-white');
    if (color === 'gray') classNames.push('btn-gray');

    if (outline) classNames.push('btn-outline');

    return (
        <a className={classNames.join(' ')} {...attrs}>
            {text || children}
        </a>
    );
});
