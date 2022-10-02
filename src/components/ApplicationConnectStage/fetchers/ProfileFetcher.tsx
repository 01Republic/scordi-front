import React, { useEffect, useState } from 'react';
import { LoginDto } from '../dto/login.dto';
import { FetchedProfileDto } from '../dto/fetched.responses.dto';
import { FetcherUI } from '../fetchers/FetcherUI';
import { FetcherProps } from '../fetchers/fetcherProps.type';

export function ProfileFetcher(props: FetcherProps<LoginDto, FetchedProfileDto>) {
  const { api, orgName, params, onComplete } = props;
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsPending(true);
    api.getOrgProfile(orgName, params)
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
      title="기본 정보 연동"
      description=""
      isPending={isPending}
      isSuccess={isSuccess}
      errorMessage={errorMessage}
    />
  )
}
