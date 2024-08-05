import React, {useEffect, useState} from 'react';
import {LoginDto} from '../dto/login.dto';
import {FetchedOrgBillingHistoryDto} from '../dto/fetched.responses.dto';
import {FetcherProps} from '../fetchers/fetcherProps.type';
import {FetcherUI} from '../fetchers/FetcherUI';

export function BillingHistoriesFetcher(props: FetcherProps<LoginDto, FetchedOrgBillingHistoryDto>) {
    const {api, orgName, params, onComplete} = props;
    const [isPending, setIsPending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setIsPending(true);
        api.getOrgBillingHistories(orgName, params)
            .then((res) => {
                onComplete(res.data);
                setIsSuccess(true);
                setErrorMessage('');
            })
            .catch((e) => {
                console.error(e);
                setErrorMessage(e.response.data.message);
                setIsSuccess(false);
            })
            .finally(() => setIsPending(false));
    }, []);

    return (
        <FetcherUI
            title="결제내역 연동"
            description=""
            isPending={isPending}
            isSuccess={isSuccess}
            errorMessage={errorMessage}
        />
    );
}
