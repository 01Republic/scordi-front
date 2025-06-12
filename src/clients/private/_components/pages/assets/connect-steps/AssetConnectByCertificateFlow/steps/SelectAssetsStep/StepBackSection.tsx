import React, {memo} from 'react';
import {ArrowLeft} from 'lucide-react';
import {LinkTo} from '^components/util/LinkTo';
import {PureLayoutContainerSection} from '^clients/private/_layouts/PureLayout/PureLayoutContainerSection';

interface StepBackSectionProps {
    onBack?: () => any;
}

export const StepBackSection = memo((props: StepBackSectionProps) => {
    const {onBack} = props;

    return (
        <PureLayoutContainerSection className="mb-12">
            <div>
                <LinkTo
                    className="flex gap-1 items-center text-14 cursor-pointer text-gray-600 transition-all hover:text-gray-800 hover:font-semibold"
                    onClick={onBack}
                    displayLoading={false}
                >
                    <ArrowLeft />
                    뒤로가기
                </LinkTo>
            </div>
        </PureLayoutContainerSection>
    );
});
StepBackSection.displayName = 'StepBackSection';
