import React, {memo} from 'react';
import {ReactNodeElement, WithChildren} from '^types/global.type';
import {LoadableBox} from '^components/util/loading';

interface SettingsPaymentSectionProps extends WithChildren {
    title: ReactNodeElement;
    right?: ReactNodeElement;
    buttonText?: string;
    buttonOnClick?: () => any;
    isLoading?: boolean;
}

export const SettingsPaymentSection = memo((props: SettingsPaymentSectionProps) => {
    const {title, right, buttonText, buttonOnClick, isLoading = false, children} = props;

    return (
        <div className="border rounded-lg p-4 mb-6">
            <div className={'flex justify-between items-center mb-4'}>
                <div className={'font-bold'}>{title}</div>

                {right
                    ? right
                    : buttonOnClick && (
                          <button className="btn3" onClick={buttonOnClick}>
                              {buttonText}
                          </button>
                      )}
            </div>

            <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
                {children}
            </LoadableBox>
        </div>
    );
});
SettingsPaymentSection.displayName = 'SettingsPaymentSection';
