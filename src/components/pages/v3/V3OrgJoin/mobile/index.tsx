import React, {memo} from 'react';
import styles from '^styles/v3/V3MainLayout.module.scss';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {JoinPageBody} from '^v3/V3OrgJoin/JoinPageBody';

export const V30JoinMobile = memo(() => {
    return (
        <div className={styles.viewport}>
            <style dangerouslySetInnerHTML={{__html: `html, body, #__next { min-height: 100vh }`}} />
            <div className={`${styles.layout}`}>
                <MobileSection.Padding>
                    <JoinPageBody />
                </MobileSection.Padding>
            </div>
        </div>
    );
});
