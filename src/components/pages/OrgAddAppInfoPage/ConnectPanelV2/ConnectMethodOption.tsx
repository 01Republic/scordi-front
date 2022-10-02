import { WithChildren } from '^types/globalTypes';
import React from 'react';

interface ConnectMethodOptionProps {
  title: string;
  desc?: string;
  btn: {
    className?: string;
    onClick: () => void;
  };
}

export function ConnectMethodOption(props: ConnectMethodOptionProps & WithChildren) {
  const {
    title,
    desc = '',
    btn,
  } = props;

  return (
    <div className="bs-col p-4 text-center">
      <h4 className="text-lg">{title}</h4>
      <div>
        <p className="text-sm" dangerouslySetInnerHTML={{ __html: desc.trim().split(/\n/).map(s => s.trim()).join('<br />') }} />
      </div>

      <br/>

      <button type="button" className={`btn btn-block ${btn.className || ''}`} onClick={btn.onClick}>시작하기</button>
    </div>
  )
}
