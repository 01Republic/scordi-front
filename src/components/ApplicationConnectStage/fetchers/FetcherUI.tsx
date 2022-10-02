import React from 'react';
import { ThreeDots } from 'react-loading-icons';

export function FetcherUI(props: {
  title: string;
  description: string;
  isPending: boolean;
  isSuccess: boolean;
  errorMessage: string;
}) {
  const { title, isPending, isSuccess, errorMessage } = props;
  const mark = (() => {
    if (isPending) return '?';
    if (isSuccess) return '✓';
    if (errorMessage) return '✕';
    return '!';
  })();

  const color = (() => {
    if (isPending) return 'text-gray-400';
    if (isSuccess) return 'text-accent';
    if (errorMessage) return 'text-error';
    return 'text-gray-400';
  })();

  const spinner = {
    color: '#999',
    size: '1.25em',
  };

  return (
    <li
      data-content={mark}
      className={`step ${
        isSuccess ? 'step-accent' : ''
      } ${
        errorMessage ? 'step-error' : ''
      }`}
    >
      <p className={`text-sm font-semibold flex items-center gap-2 ${color}`}>
        <span>{title}</span>
        {isPending && (
          <ThreeDots
            stroke={spinner.color}
            fill={spinner.color}
            width={spinner.size}
            height={spinner.size}
          />
        )}
      </p>
    </li>
  )
}
