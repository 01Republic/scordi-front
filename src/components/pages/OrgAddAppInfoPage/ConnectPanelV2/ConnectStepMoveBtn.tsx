import React from 'react';
import { IconType } from '@react-icons/all-files';
import { IoChevronForwardOutline } from '@react-icons/all-files/io5/IoChevronForwardOutline';
import { IoChevronBackOutline } from '@react-icons/all-files/io5/IoChevronBackOutline';
import { WithChildren } from '^types/globalTypes';

interface ConnectStepMoveBtnProps {
  icon: IconType;
  onClick: () => void;
  text?: string;
}

export function ConnectStepMoveBtn(props: ConnectStepMoveBtnProps) {
  const { icon: Icon, onClick, text = '', ...res } = props;

  return (
    <button
      type="button"
      className="btn btn-sm px-2 border-[#bcc2cd] bg-white gap-1 hover:bg-white"
      onClick={onClick}
      {...res}
    >
      <Icon /> {text}
    </button>
  )
}

export function ConnectMoveForwardBtn({ onClick, ...res }: {
  onClick: () => void;
  text?: string;
}) {
  return (
    <ConnectStepMoveBtn icon={IoChevronForwardOutline} onClick={onClick} {...res} />
  )
}

export function ConnectMoveBackwardBtn({ onClick, ...res }: {
  onClick: () => void;
  text?: string;
}) {
  return (
    <ConnectStepMoveBtn icon={IoChevronBackOutline} onClick={onClick} {...res} />
  )
}
