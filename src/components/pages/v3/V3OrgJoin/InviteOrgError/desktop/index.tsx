import React, {memo} from 'react';
import styles from '^styles/v3/V3MainLayout.module.scss';
import {InviteOrgErrorBody} from '^v3/V3OrgJoin/InviteOrgError/body/InviteOrgError';

export const V3InviteErrorDesktop = memo(() => {
    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `html, body, #__next { min-height: 100vh }`}} />
            <div className={`${styles.layout} h-full`}>
                <InviteOrgErrorBody />
            </div>
        </>
    );
});
