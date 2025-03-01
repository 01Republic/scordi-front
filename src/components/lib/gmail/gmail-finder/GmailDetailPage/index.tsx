import React, {memo, useState} from 'react';
import {useGmailContent} from './useGmailContent';
import {GmailContentTopbar} from './GmailContentTopbar';
import {GmailContentDisplay} from './GmailContentDisplay';
import {GmailHeaderInfo} from './GmailHeaderInfo';
import {CreateBillingHistoryByGmailSection} from '../common/billing-history/CreateBillingHistoryByGmailSection';

interface GmailDetailPageProps {
    orgId: number;
    invoiceAccountId: number;
    messageId: string;
}

export const GmailDetailPage = memo((props: GmailDetailPageProps) => {
    const {email, original, url} = useGmailContent(props);
    const [isDataMode, setIsDataMode] = useState(false);
    const [isCreateBillingHistoryModalOpened, setIsCreateBillingHistoryModalOpened] = useState(false);

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

            <div className="col-span-2 px-8 py-8 sm:max-h-screen sm:overflow-auto no-scrollbar">
                <GmailHeaderInfo isLoading={email.isFetching} email={email.data} url={url} />
                <br />
                <hr className="mb-4" />

                {!isCreateBillingHistoryModalOpened && (
                    <button
                        className={`btn btn-block btn-scordi ${
                            email.isFetching ? 'loading' : ''
                        } disabled:bg-gray-100 disabled:text-gray-300 disabled:border-gray-100`}
                        onClick={() => setIsCreateBillingHistoryModalOpened(true)}
                        disabled={email.isFetching || !email.data}
                    >
                        이 이메일을 결제내역에 추가하기
                    </button>
                )}

                {email?.data && (
                    <CreateBillingHistoryByGmailSection
                        isOpened={isCreateBillingHistoryModalOpened}
                        onClose={() => setIsCreateBillingHistoryModalOpened(false)}
                        email={email.data}
                        {...props}
                    />
                )}
            </div>
        </div>
    );
});
GmailDetailPage.displayName = 'GmailDetailPage';
