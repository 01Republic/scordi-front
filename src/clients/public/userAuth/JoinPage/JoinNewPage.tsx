import React, {memo, useEffect} from 'react';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useOnResize2} from '^components/util/onResize2';
import {useRouter} from 'next/router';
import {useSetRecoilState} from 'recoil';
import {invitedOrgIdAtom, isCopiedAtom} from '^v3/V3OrgJoin/atom';
import styles from '^styles/v3/V3MainLayout.module.scss';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {JoinNewBodySection} from '^clients/public/userAuth/JoinPage/JoinNewBodySection';

export const JoinNewPage = memo(() => {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    const isDesktop = useOnResize2();
    const router = useRouter();
    const setInvitedOrgId = useSetRecoilState(invitedOrgIdAtom);
    const setIsFromInviteLink = useSetRecoilState(isCopiedAtom);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;

        setInvitedOrgId(orgId);
        setIsFromInviteLink(!!router.query.isCopied || false);
    }, [orgId, router.query]);

    if (!orgId || isNaN(orgId)) return <></>;

    return (
        <>
            {isDesktop ? (
                <>
                    <style dangerouslySetInnerHTML={{__html: `html, body, #__next { min-height: 100vh }`}} />
                    <div className={`${styles.layout} h-full`}>
                        <JoinNewBodySection />
                    </div>
                </>
            ) : (
                <div className={styles.viewport}>
                    <style dangerouslySetInnerHTML={{__html: `html, body, #__next { min-height: 100vh }`}} />
                    <div className={`${styles.layout}`}>
                        <MobileSection.Padding>
                            <JoinNewBodySection />
                        </MobileSection.Padding>
                    </div>
                </div>
            )}
        </>
    );
});
