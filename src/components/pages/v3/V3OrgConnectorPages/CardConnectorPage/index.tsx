import {memo} from 'react';
import {useRecoilState} from 'recoil';
import {V3MainLayout} from '^v3/layouts/V3MainLayout';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {currentCodefAccountAtom} from './atom';
import {CardBeforeConnectPage} from './CardBeforeConnectPage';
import {CardListPage} from './CardListPage';

export const CardConnectorPage = memo(() => {
    const [currentCodefAccount, setCurrentCodefAccount] = useRecoilState(currentCodefAccountAtom);

    return (
        <V3MainLayout activeTabIndex={LNBIndex.Connects}>
            {currentCodefAccount ? <CardListPage /> : <CardBeforeConnectPage />}
        </V3MainLayout>
    );
});
