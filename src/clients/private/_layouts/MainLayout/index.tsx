import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {Background} from './Background';
import {OrgTopBar} from './OrgTopBar';
import {TobNavBar} from './TobNavBar';
import {Footer} from '../_shared/Footer';

interface MainLayoutProps extends WithChildren {
    //
}

export const MainLayout = memo((props: MainLayoutProps) => {
    const {children} = props;

    return (
        <div>
            <Background />

            {/* Body */}
            <div>
                <OrgTopBar />
                <TobNavBar />

                {children}

                <Footer />
            </div>
        </div>
    );
});
MainLayout.displayName = 'MainLayout';
