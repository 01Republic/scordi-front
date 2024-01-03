import React, {memo} from 'react';
import {HeaderPanel} from './HeaderPanel';
import {BsPlus} from 'react-icons/bs';
import {CardList} from './CardList';
import {V3ModalLikeLayoutMobile} from '../layouts/V3ModalLikeLayout.mobile';
import {MobileSection} from '../share/sections/MobileSection';
import {useModal} from '../share/modals/useModal';
import {useRouter} from 'next/router';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {inputCardNumberModal} from '^v3/share/modals/NewCardModal/CardNumberModal/atom';
import {useRecoilValue} from 'recoil';
import {useOnResize2} from '^components/util/onResize2';
import {V3MainLayout, V3MainLayoutContainer} from '^v3/layouts/V3MainLayout';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {currentOrgAtom} from '^models/Organization/atom';
import {NewCardModalV2} from 'src/components/pages/v3/share/modals/NewCardModal/NewCardModalV2';

export const V3OrgCardListPage = memo(() => {
    const cardNumberModal = useModal(inputCardNumberModal);
    const currentOrg = useRecoilValue(currentOrgAtom);
    const {isDesktop} = useOnResize2();
    const router = useRouter();

    const backBtnOnclick = () => {
        if (!currentOrg) return;
        router.push(V3OrgHomePageRoute.path(currentOrg.id));
    };

    if (isDesktop) {
        return (
            <V3MainLayout activeTabIndex={LNBIndex.Cards}>
                <V3MainLayoutContainer>
                    <section className="mb-6">
                        <h1>결제 수단</h1>
                    </section>
                </V3MainLayoutContainer>
            </V3MainLayout>
        );
    } else {
        return (
            <V3ModalLikeLayoutMobile title="카드" backBtnOnClick={backBtnOnclick} modals={[NewCardModalV2]}>
                <MobileSection.List>
                    <HeaderPanel />

                    <MobileSection.Item>
                        <MobileSection.Padding>
                            <CardList />
                        </MobileSection.Padding>
                    </MobileSection.Item>

                    {!cardNumberModal.isShow && (
                        <button
                            onClick={() => cardNumberModal.open()}
                            className="btn btn-lg btn-scordi btn-circle btn-floating"
                        >
                            <BsPlus size={48} />
                        </button>
                    )}
                </MobileSection.List>
            </V3ModalLikeLayoutMobile>
        );
    }
});
