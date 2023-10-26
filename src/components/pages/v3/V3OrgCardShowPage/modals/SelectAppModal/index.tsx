import React, {memo, useState} from 'react';
import {useModal} from '^components/pages/v3/share/modals/useModal';
import {ModalTopbar} from '^components/pages/v3/share/modals/ModalTopbar';
import {DefaultButton} from '^components/Button';
import {creditcardAtom, inputCardHoldingMemeberModal, selectAppModal} from '../atom';
import {useRecoilState} from 'recoil';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {creditCardApi} from '^api/credit-cards.api';
import {useRouter} from 'next/router';
import {V3OrgCardDetailPageRoute} from '^pages/v3/orgs/[orgId]/cards/[cardId]';
import {CardAppList} from './CardAppList';
import {ProductDto} from '^types/product.type';

export const SelectAppModal = memo(() => {
    const {Modal, close} = useModal(selectAppModal);
    const {close: closeInputCardHoldingMemberModal} = useModal(inputCardHoldingMemeberModal);
    const [creditCardData, setCreditCardData] = useRecoilState(creditcardAtom);
    const [selectedApps, setSelectedApps] = useState<ProductDto[]>([]);
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const router = useRouter();

    const submitCardNumber = () => {
        const productIds = selectedApps.map((app) => {
            return app.id;
        });
        setCreditCardData({...creditCardData, productIds: productIds});

        creditCardApi.create(orgId, creditCardData).then((res) => {
            router.push(V3OrgCardDetailPageRoute.path(orgId, res.data.id));
        });

        close();
        closeInputCardHoldingMemberModal();
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />

            <div className="px-5 flex flex-col justify-start gap-10">
                <div className="py-5 pt-20">
                    <p className="mb-4">새로운 카드 등록하기</p>
                    <h2 className="h1 leading-tight">
                        사용중인 서비스를
                        <br />
                        등록해주세요
                    </h2>
                </div>

                <CardAppList selectedApps={selectedApps} setSelectedApps={setSelectedApps} />

                <DefaultButton text="완료" type="button" onClick={submitCardNumber} />
            </div>
        </Modal>
    );
});
