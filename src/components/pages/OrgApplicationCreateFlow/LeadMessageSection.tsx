import React, {memo} from 'react';
import {MobileSection} from '^components/v2/MobileSection';
import {useCreateFlow} from '^hooks/useProducts';

type LeadMessageSectionProps = {
    text: string;
};

export const LeadMessageSection = memo((props: LeadMessageSectionProps) => {
    const {text} = props;

    return (
        <MobileSection className="pt-5 pb-3">
            <h2 className="text-lg font-semibold">{text}</h2>
        </MobileSection>
    );
});
