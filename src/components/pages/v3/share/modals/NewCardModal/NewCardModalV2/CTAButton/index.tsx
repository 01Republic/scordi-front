import React, {memo} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {cardIdParamState, creditCardSignAtom, currentCreditCardAtom} from '^models/CreditCard/atom';
import {plainToInstance} from 'class-transformer';
import {UnSignedCreditCardFormData} from '^models/CreditCard/type';
import {creditCardApi} from '^models/CreditCard/api';
import {V3OrgCardDetailPageRoute} from '^pages/v3/orgs/[orgId]/cards/[cardId]';
import {useAlert} from '^hooks/useAlert';
import {useRouter} from 'next/router';
import {useOnResize2} from '^components/util/onResize2';
import {orgIdParamState} from '^atoms/common';
import {useToast} from '^hooks/useToast';
import {useModal} from '^v3/share/modals';
import {newCardModalState} from '^v3/share/modals/NewCardModal/NewCardModalV2/atom';
import {useCreditCards} from '^models/CreditCard/hook';
import {createCreditCardDtoAtom} from '^v3/share/modals/NewCardModal/atom';
import {NextButtonUI} from '^v3/share/NextButtonUI';
import {debounce} from 'lodash';

export const CTAButton = memo(() => {
    const {close} = useModal(newCardModalState);
    const orgId = useRecoilValue(orgIdParamState);
    const cardId = useRecoilValue(cardIdParamState);
    const setCardSignInfo = useSetRecoilState(creditCardSignAtom);
    const setCurrentCreditCard = useSetRecoilState(currentCreditCardAtom);
    const {reload} = useCreditCards();
    const createCreditCardDto = useRecoilValue(createCreditCardDtoAtom);

    const {alert} = useAlert();
    const {toast} = useToast();
    const router = useRouter();
    const {isDesktop} = useOnResize2();

    const formData = plainToInstance(UnSignedCreditCardFormData, createCreditCardDto);

    // 카드 번호 등록 함수
    const onSubmit = debounce(() => {
        if (!orgId) return;

        if (!formData.number1 || !formData.number2 || !formData.number3 || !formData.number4) {
            toast.error('카드 번호를 입력해주세요');
            return;
        }

        if (!formData.name) {
            toast.error('카드 별칭을 입력해주세요');
            return;
        }

        const req = creditCardApi.create(orgId, formData.toCreateDto());
        req.then((res) => {
            alert.success({title: '카드 추가가 완료되었습니다.'}).then(() => {
                const cardId = res.data.id;
                !isDesktop && router.push(V3OrgCardDetailPageRoute.path(orgId, cardId));
            });
            close();
            reload();
        });

        req.catch((e) => console.log(e));
    }, 500);

    //카드 번호 수정 함수
    const onUpdate = debounce(() => {
        if (!orgId || !cardId) return;

        const req = creditCardApi.update(orgId, cardId, formData.toUpdateDto());

        req.then((res) => {
            setCardSignInfo(res.data.secretInfo);
            setCurrentCreditCard(res.data);
            close();
            toast.success('변경되었습니다.');
        });

        req.catch((e) => console.log(e));
    }, 500);

    const isActive =
        !!formData.number1 && !!formData.number2 && !!formData.number3 && !!formData.number4 && !!formData.name;

    return (
        <NextButtonUI isActive={isActive} onClick={cardId ? onUpdate : onSubmit}>
            {cardId ? '확인' : '다음'}
        </NextButtonUI>
    );
});
