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
        <main id="ContentLayout" className={`${styles.orgMainContentLayout} px-11 py-9`}>
            {title && <ContentHeading title={title} />}
            {children}
        </main>
    );
};

export * from './ContentHeading';
export * from './ContentPanel';
export * from './ContentForm';
