import React from 'react';
import styles from '^styles/v3/V3MainLayout.module.scss';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {InviteOrgErrorBody} from '^v3/V3OrgJoin/InviteOrgError/body/InviteOrgError';

export const InviteOrgErrorMobile = () => {
    return (
        <div className={styles.viewport}>
            <style dangerouslySetInnerHTML={{__html: `html, body, #__next { min-height: 100vh }`}} />
            <div className={`${styles.layout}`}>
                <MobileSection.Padding>
                    <InviteOrgErrorBody />
                </MobileSection.Padding>
            </div>
        </div>
    );
};
