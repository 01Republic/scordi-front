import {memo} from 'react';
import {MainLayout} from '^clients/private/_layouts/MainLayout';
import {AppUnitList} from './AppUnitList';

export const OrgMainPage = memo(function OrgMainPage() {
    return (
        <MainLayout>
            <div className="container-fluid">OrgMainPage</div>

            <div className="container">
                <AppUnitList />
            </div>
        </MainLayout>
    );
});
