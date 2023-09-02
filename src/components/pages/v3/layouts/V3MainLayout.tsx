import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {V3TopNav} from '^v3/share/TobNav/TopNav';
import styles from '^styles/v3/V3MainLayout.module.scss';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^hooks/useCurrentOrg';
import {UserEditModal} from '^v3/share/modals/UserEditModal';
import {AddressModal} from '^v3/share/modals/AddressModal';
import {V3Footer} from '^v3/share/Footer';

interface V3MainLayoutProps extends WithChildren {
    //
}

export const V3MainLayout = memo((props: V3MainLayoutProps) => {
    const {children} = props;
    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `html, body, #__next { min-height: 100vh }`}} />
            <div className={`${styles.layout} h-full`}>
                <V3TopNav />
                {children}
                <V3Footer />
            </div>
            <UserEditModal />
            <AddressModal />
        </>
    );
});

export * from './V3MainLayout/Container';
