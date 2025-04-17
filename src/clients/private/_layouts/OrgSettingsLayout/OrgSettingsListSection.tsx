import React, {memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';
import {LoadableBox} from '^components/util/loading';
import {ReactNodeElement, WithChildren} from '^types/global.type';
import {OrgSettingsCardSection} from '^clients/private/_layouts/OrgSettingsLayout/OrgSettingsCardSection';

interface OrgSettingsListSectionProps extends WithChildren {
    className?: string;
    title: ReactNodeElement;
    buttonHref?: string;
    buttonOnClick?: () => any;
    items?: {title: ReactNodeElement; desc: ReactNodeElement}[];
    isLoading?: boolean;
}

export const OrgSettingsListSection = memo(function (props: OrgSettingsListSectionProps) {
    const {className = '', title, buttonHref, buttonOnClick, items = [], isLoading = false, children} = props;

    return (
        <OrgSettingsCardSection
            className={className}
            title={title}
            right={
                (buttonHref || buttonOnClick) && (
                    <LinkTo
                        className={'text-blue-500 cursor-pointer text-12 hover:underline'}
                        href={buttonHref}
                        onClick={buttonOnClick}
                    >
                        변경
                    </LinkTo>
                )
            }
        >
            {children || (
                <LoadableBox isLoading={isLoading} loadingType={2} noPadding spinnerPos="center">
                    {items.map((item, i) => (
                        <div key={i} className={'grid grid-cols-5 items-center my-4 text-14'}>
                            <div className={'font-semibold text-gray-500'}>{item.title}</div>
                            <div className="col-span-4">{item.desc}</div>
                        </div>
                    ))}
                </LoadableBox>
            )}
        </OrgSettingsCardSection>
    );
});
