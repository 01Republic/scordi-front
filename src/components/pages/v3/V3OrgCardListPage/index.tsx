import React, {memo, useEffect} from 'react';
import {HeaderPanel} from './HeaderPanel';
import {BsPlus} from 'react-icons/bs';
import {CardList} from './CardList';
import {V3ModalLikeLayoutMobile} from '../layouts/V3ModalLikeLayout.mobile';
import {MobileSection} from '../share/sections/MobileSection';
import {useModal} from '../share/modals/useModal';
import {
    inputCardNameModal,
    inputCardNumberModal,
    inputCardHoldingMemberModal,
    selectAppModal,
    selectCardCompanyModal,
} from './modals/atom';
import {useRouter} from 'next/router';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {CardFormModalGroup} from '^components/pages/v3/V3OrgCardListPage/modals/CardFormModalGroup';

export const V3OrgCardListPage = memo(() => {
    const {open: openInputCardNumberModal, isShow: isInputCardNumberModal} = useModal(inputCardNumberModal);
    const {isShow: isSelectCardCompanyModal} = useModal(selectCardCompanyModal);
    const {isShow: isInputCardNameModal} = useModal(inputCardNameModal);
    const cardHolderInputModal = useModal(inputCardHoldingMemberModal);
    const selectAppInputModal = useModal(selectAppModal);
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const router = useRouter();

    const backBtnOnclick = () => {
        router.push(V3OrgHomePageRoute.path(orgId));
    };

    return (
        <V3ModalLikeLayoutMobile title="카드" modals={[CardFormModalGroup]} backBtnOnClick={backBtnOnclick}>
            <MobileSection.List>
                <HeaderPanel />

                {/* 연동된 서비스 목록 */}

                <MobileSection.Item>
                    <MobileSection.Padding>
                        <CardList />
                    </MobileSection.Padding>
                </MobileSection.Item>

                {/*TODO: [to.진경님] 아래의 every 구문은 사실 "모든 모달이 닫혀있는가" 를 판별 하려는 것 같은데, 위에서 const backBtnOnclick 아래에 변수로 선언해서 값으로 가지고 있는게 어떨까 싶습니다! */}
                {/*TODO: [to.진경님] 그리고 잠깐, ㅋㅋㅋㅋ 오잉..ㅋㅋ 사실 이 페이지에서 플러스 버튼 노출조건이, 굳이 모든 모달이 닫혀있는 경우에만 노출될 이유가 있나요? 걍 어차피 다른 모달이 위에 덮이면 버튼도 같이 덮이지 않나요? */}
                {[
                    !isInputCardNumberModal,
                    !isSelectCardCompanyModal,
                    !isInputCardNameModal,

                    // TODO: [to.진경님] 항상 그런건 아닌데, 이 경우에는 이렇게 쓰는 편이 좀 더 예쁘긴 하네요.
                    //  1) 별도 const { isShow: ... } 로 선언하기에는 받은 변수명이 무엇을 직관적으로 표현하게 작명하기가 살짝 난해하고 (변수의 정체성을 제대로 표현하려면 변수명을 문장 수준으로 길게 만들어야 할 것 같음)
                    //  2) isShow 가 반복적으로 등장하고 있다는 점이 오히려 통일감이 있어 가독성이 높아지는 것 같아요
                    //  3) useModal 처럼, 오브젝트로 리턴값을 반환하는 경우에, 꼭 반드시 구조분해해서 받을 필요는 없다는 점도 겸사겸사 말씀 드릴 수 있을 것 같아요. (지금처럼 경우에 따라서는, 오히려 구조분해한 변수를 작명하는 과정에서 의도치 않게 코드를 왜곡하게 될 위험이 있어요.)
                    !cardHolderInputModal.isShow,
                    // !isInputCardHoldingMemberModal,
                    !selectAppInputModal.isShow,
                    // !isSelectAppModal,
                ].every((e) => e) && (
                    <button
                        onClick={openInputCardNumberModal}
                        className="btn btn-lg btn-scordi btn-circle btn-floating"
                    >
                        <BsPlus size={48} />
                    </button>
                )}
            </MobileSection.List>
        </V3ModalLikeLayoutMobile>
    );
});
