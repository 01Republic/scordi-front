import React, {memo, useState} from 'react';
import {useGmailContent} from './useGmailContent';
import {GmailContentTopbar} from './GmailContentTopbar';
import {GmailContentDisplay} from './GmailContentDisplay';
import {GmailHeaderInfo} from './GmailHeaderInfo';

interface GmailDetailPageProps {
    orgId: number;
    invoiceAccountId: number;
    messageId: string;
}

export const GmailDetailPage = memo((props: GmailDetailPageProps) => {
    const {email, original, url} = useGmailContent(props);
    const [isDataMode, setIsDataMode] = useState(false);

    return (
        <div className="bg-white grid grid-cols-5 h-screen">
            <div className="col-span-3 bg-gray-50 relative">
                <GmailContentTopbar
                    viewMode={isDataMode ? 'rawData' : 'parsed'}
                    changeViewMode={() => setIsDataMode((val) => !val)}
                />
                {email.isError ? (
                    <div>{email.error.message}</div>
                ) : (
                    <GmailContentDisplay
                        isDataMode={isDataMode}
                        isLoading={email.isFetching}
                        email={email.data}
                        rawData={original.data}
                    />
                )}
            </div>

            <div className="col-span-2 px-8 py-8">
                <GmailHeaderInfo isLoading={email.isFetching} email={email.data} url={url} />
                <br />
                <hr className="mb-4" />
            </div>
        </div>
    );
});
GmailDetailPage.displayName = 'GmailDetailPage';
