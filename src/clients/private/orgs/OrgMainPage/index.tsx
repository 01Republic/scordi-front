import {memo, useState} from 'react';
import {MainLayout} from '^clients/private/_layouts/MainLayout';
import {LogoImg} from './LogoImg';
import {MainInputBox} from './MainInputBox';
import {AppUnitList} from './AppUnitList';
import {ServiceModal} from '^components/modal/ServiceModal';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';

export const OrgMainPage = memo(function OrgMainPage() {
    const [isOpened, setIsOpened] = useState(false);

    return (
        <MainLayout>
            <div className="container-fluid" />

            <section className="container px-4 pt-20" onClick={() => setIsOpened(true)}>
                <LogoImg />
                <MainInputBox />
            </section>

            <section className="container px-4">
                <AppUnitList />
            </section>

            {/*<ServiceModal open={isOpened} onClose={() => setIsOpened(false)} />*/}
            <AnimatedModal open={isOpened} onClose={() => setIsOpened(false)}>
                <div>hi</div>
            </AnimatedModal>
        </MainLayout>
    );
});
