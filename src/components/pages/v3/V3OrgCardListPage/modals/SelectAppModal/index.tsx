import React, {memo, useCallback, useEffect, useRef} from 'react';
import {useRouter} from 'next/router';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {useToast} from '^hooks/useToast';
import {useModal} from '^components/pages/v3/share/modals/useModal';
import {ModalTopbar} from '^components/pages/v3/share/modals/ModalTopbar';
import {ModalLikeBottomBar} from '^components/pages/v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {SkipButton} from '^components/pages/v3/V3OrgCardListPage/modals/SkipButton';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {V3OrgCardDetailPageRoute} from '^pages/v3/orgs/[orgId]/cards/[cardId]';
import {CardAppList} from './CardAppList';
import {creditCardApi} from '^models/CreditCard/api';
import {orgIdParamState} from '^atoms/common';
import {createCreditCardDtoAtom} from '../atom';
import {productIdsAtom, selectAppModal, selectedAppsAtom, subscriptionsAtom} from './atom';
import {useAlert} from '^hooks/useAlert';
import {cardIdParamState} from '^models/CreditCard/atom';
import {useCardModal} from '^v3/V3OrgCardListPage/modals/CardFormModalGroup';
import {useOnResize2} from '^components/util/onResize2';

export const SelectAppModal = memo(() => {
    const {Modal, close, isShow} = useModal(selectAppModal);
    const [createCreditCardDto, setCreateCreditCardDto] = useRecoilState(createCreditCardDtoAtom);
    const [selectedApps, setSelectedApps] = useRecoilState(selectedAppsAtom);
    const [subscriptions, setSubscriptions] = useRecoilState(subscriptionsAtom);
    const [productIds, setProductIds] = useRecoilState(productIdsAtom);
    const productIdsReset = useResetRecoilState(productIdsAtom);
    const selectedAppsReset = useResetRecoilState(selectedAppsAtom);
    const orgId = useRecoilValue(orgIdParamState);
    const cardId = useRecoilValue(cardIdParamState);
    const {closeCardModals} = useCardModal();
    const {isDesktop} = useOnResize2();
    const router = useRouter();
    const {toast} = useToast();
    const {alert} = useAlert();

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;

        selectedAppsReset();
        productIdsReset();

        if (!cardId || isNaN(cardId)) return;

        // cardId가 있으면 카드 수정하는 상태
        subscriptions.map((subscription) => {
            setSelectedApps((prev) => [...prev, subscription.product]);
            setProductIds((prev) => [...prev, subscription.product.id]);
        });
    }, [orgId, cardId, isShow]);

    // 카드 연동 앱 등록 함수
    const onSubmit = useCallback(async () => {
        const submitData = {...createCreditCardDto, productIds: productIds};

        const res = await creditCardApi.create(orgId, submitData);

        if (res) {
            alert.success({title: '카드 추가가 완료되었습니다.'});
            const cardId = res.data.id;
            closeCardModals();
            !isDesktop &&
                setTimeout(() => {
                    router.push(V3OrgCardDetailPageRoute.path(orgId, cardId));
                }, 1500);
        }
    }, [orgId, cardId, createCreditCardDto, productIds]);

    // 카드 연동 앱 수정 함수
    const onUpdate = async () => {
        if (!selectedApps || !cardId || isNaN(cardId)) return;

        const res = await creditCardApi.update(orgId, cardId, {productIds: productIds});

        if (res) {
            setSubscriptions(res.data.subscriptions ?? []);
            close();
            toast.success('변경되었습니다.');
        }
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar
                backBtnOnClick={() => close()}
                topbarPosition="sticky"
                rightButtons={[
                    () => <SkipButton submitCardNumber={onSubmit} currentModal="selectAppModal" isModify={!!cardId} />,
                ]}
            />
            <MobileSection.Padding>
                <p className="mb-4 pt-10">{cardId ? '카드 수정하기' : '새로운 카드 등록하기'}</p>
                <h2 className="h1 leading-tight mb-10">
                    사용중인 서비스를
                    <br />
                    등록해주세요
                </h2>

                <CardAppList />
            </MobileSection.Padding>
            <ModalLikeBottomBar>
                {cardId ? (
                    <button onClick={onUpdate} className="btn-modal">
                        확인
                    </button>
                ) : (
                    <button onClick={onSubmit} className="btn-modal">
                        다음
                    </button>
                )}
            </ModalLikeBottomBar>
        </Modal>
    );
});
