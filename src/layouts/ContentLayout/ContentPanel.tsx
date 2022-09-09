import React, { FC } from 'react';
import { WithChildren } from '^types/globalTypes';

interface ContentPanelProps {
  title?: string;
}

export const ContentPanel: FC<WithChildren & ContentPanelProps> = ({ title, children }) => {
  return (
    <div className="w-full border border-[#dbd6e1] bg-white rounded shadow mb-5">
      {title && <ContentPanelHeading title={title} />}

      <ContentPanelBody>
        {children}
      </ContentPanelBody>
    </div>
  )
};

export function ContentPanelHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center p-4 bg-neutral border-b border-b-[#dbd6e1]">
      <div>
        <h2 className="m-0 text-sm text-gray-600 font-semibold uppercase">{title}</h2>
      </div>
    </div>
  )
}

export function ContentPanelBody({ children }: WithChildren) {
  return (
    <div className="p-4 bg-white">
      {children}
    </div>
  )
}

export function ContentPanelItemTitle({ text, className = '' }: { text: string, className?: string }) {
  return (
    <p className={`mr-2 ${className}`}>{text}</p>
  )
}

export function ContentPanelItemText({ text }: { text: string }) {
  return (
    <p className="text-xs text-gray-500" dangerouslySetInnerHTML={{
      __html: text
    }} />
  )
}

type ContentPanelItemProps = {}
export function ContentPanelItem({ children }: WithChildren & ContentPanelItemProps) {
  return (
    <div className="p-4 border-b border-b-[#dbd6e1]">
      <div className="flex items-center">
        {children}
      </div>
    </div>
  )
}

export function ContentPanelList({ children }: WithChildren) {
  return (
    <div className="-m-4">{children}</div>
  )
}

export function ContentPanelInput({ title, text = '', required, value, type = 'text', placeholder = '', children }: WithChildren & ContentPanelItemProps & {
  title: string;
  text?: string;
  required?: boolean;
  value?: any;
  type?: 'text' | 'number' | 'radio';
  placeholder?: string;
}) {
  return (
    <ContentPanelItem>
      <div className="flex-1">
        <div className="indicator">
          {required && (
            <span className="indicator-item badge badge-secondary badge-3xs indicator-middle" style={{ top: '33%' }} />
          )}
          <ContentPanelItemTitle text={title} className="mr-[5px]" />
        </div>
        {text && <ContentPanelItemText text={text} />}
      </div>
      <div className="flex-1">
        {children ? children : (
          <input type={type} placeholder={placeholder} className="input input-bordered w-full" value={value} />
        )}
      </div>
    </ContentPanelItem>
  )
}
