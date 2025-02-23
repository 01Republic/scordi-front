import React, {memo} from 'react';
import {LoadableBox} from '^components/util/loading';
import {GmailContentReadableDto} from '^models/InvoiceAccount/type';

interface GmailContentDisplayProps {
    isDataMode: boolean;
    isLoading: boolean;
    email?: GmailContentReadableDto;
    rawData?: object;
}

export const GmailContentDisplay = memo((props: GmailContentDisplayProps) => {
    const {isDataMode, isLoading, email, rawData} = props;

    return (
        <LoadableBox isLoading={isLoading} loadingType={2} noPadding spinnerPos="center">
            <section
                className={`h-full max-h-screen overflow-auto ${
                    isDataMode ? 'bg-gray-800 text-white' : 'no-scrollbar'
                }`}
            >
                {!isDataMode ? (
                    <div className="p-8" dangerouslySetInnerHTML={{__html: email?.contents[0] || ''}} />
                ) : (
                    <div className="w-full whitespace-pre p-8">{JSON.stringify(rawData, null, 4)}</div>
                )}
            </section>
        </LoadableBox>
    );
});
GmailContentDisplay.displayName = 'GmailContentDisplay';
