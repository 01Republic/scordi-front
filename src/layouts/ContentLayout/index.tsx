import React, { FC } from 'react';
import styles from './index.module.css';
import { ContentHeading } from './ContentHeading';
import { WithChildren } from '^types/globalTypes';

export const ContentLayout: FC<WithChildren & {
  title?: string;
}> = ({ title, children }) => {
  return (
    <div className={`${styles.orgMainContentLayout} bg-neutral p-6`}>
      {title && <ContentHeading title={title} />}
      {children}
    </div>
  )
};
