import React, {memo} from 'react';
import styles from '^styles/v3/V3MainLayout.module.scss';
import {JoinPageBody} from '^v3/V3OrgJoin/JoinPageBody';

export const V3OrgJoinDesktop = memo(() => {
    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `html, body, #__next { min-height: 100vh }`}} />
            <div className={`${styles.layout} h-full`}>
                <JoinPageBody />
            </div>
        </>
    );
});
