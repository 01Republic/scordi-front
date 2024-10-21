import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {LoadableBox} from '^components/util/loading';

interface SettingsPaymentSectionProps extends WithChildren {
    title: string;
    buttonText?: string;
    buttonOnClick?: () => any;
    isLoading?: boolean;
}

export const SettingsPaymentSection = memo((props: SettingsPaymentSectionProps) => {
    const {title, buttonText, buttonOnClick, isLoading = false, children} = props;

    return (
        <div className="border rounded-lg p-4 mb-6">
            <div className={'flex justify-between items-center mb-4'}>
                <div className={'font-bold'}>{title}</div>

                {buttonOnClick && (
                    <button
                        className="px-4 py-2 text-gray-400 border rounded-md hover:bg-gray-50"
                        onClick={buttonOnClick}
                    >
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
