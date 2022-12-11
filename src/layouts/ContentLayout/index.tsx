import React, {FC} from 'react';
import styles from './index.module.css';
import {ContentHeading} from './ContentHeading';
import {WithChildren} from '^types/global.type';

export const ContentLayout: FC<
    WithChildren & {
        title?: string;
    }
> = ({title, children}) => {
    return (
        <div className={`${styles.orgMainContentLayout} p-[20px]`}>
            {title && <ContentHeading title={title} />}
            {children}
        </div>
    );
};
