import React, {memo} from 'react';
import {ApplicationDto} from '^types/application.type';
import {TitleSection} from '^components/v2/TitleSection';

type AppNextPayInfoBlockProps = {
    application: ApplicationDto;
};

export const AppNextPayInfoBlock = memo((props: AppNextPayInfoBlockProps) => {
    const {application} = props;

    return (
        <TitleSection.Title size="lg" className="text-right">
            <div className="text-base font-medium">Next {application.nextBillingDate}</div>
            <div>US${application.nextBillingAmount.toLocaleString()}</div>
        </TitleSection.Title>
    );
});
