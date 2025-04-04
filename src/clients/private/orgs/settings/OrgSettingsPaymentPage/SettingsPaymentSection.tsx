import React, {memo} from 'react';
import {ReactNodeElement, WithChildren} from '^types/global.type';
import {LoadableBox} from '^components/util/loading';
import {OrgSettingsCardSection} from '^clients/private/_layouts/OrgSettingsLayout/OrgSettingsCardSection';
import {LinkTo} from '^components/util/LinkTo';

interface SettingsPaymentSectionProps extends WithChildren {
    title: ReactNodeElement;
    titleNoMargin?: boolean;
    right?: ReactNodeElement;
    buttonText?: string;
    buttonOnClick?: () => any;
    isLoading?: boolean;
}

export const SettingsPaymentSection = memo((props: SettingsPaymentSectionProps) => {
    const {title, titleNoMargin = false, right, buttonText, buttonOnClick, isLoading = false, children} = props;

    return (
        <OrgSettingsCardSection
            title={title}
            titleNoMargin={titleNoMargin}
            right={
                right
                    ? right
                    : buttonOnClick && (
                          <LinkTo
                              className={'text-blue-500 cursor-pointer text-12 hover:underline'}
                              onClick={buttonOnClick}
                          >
                              {buttonText}
                          </LinkTo>
                      )
            }
        >
            <LoadableBox isLoading={isLoading} loadingType={2} noPadding spinnerPos="center">
                {children}
            </LoadableBox>
        </OrgSettingsCardSection>
    );
});
SettingsPaymentSection.displayName = 'SettingsPaymentSection';
