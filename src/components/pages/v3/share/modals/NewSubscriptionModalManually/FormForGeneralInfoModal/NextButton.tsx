import React, {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useModal} from '^v3/share/modals';
import {
    newFormForBillingInfoModalAtom,
    newFormForGeneralInfoModalAtom,
    newFormForUsingMemberInfoModalAtom,
    newSubscriptionManualFormData,
    subscriptionManualFormDataDefaultValue,
} from '../atom';
import {NextButtonUI} from '../NextButtonUI';

export const NextButton = memo(function NextButton() {
    const organizationId = useRecoilValue(orgIdParamState);
    const [formData, setFormData] = useRecoilState(newSubscriptionManualFormData);
    const {isShow} = useModal(newFormForGeneralInfoModalAtom);
    const {open: openBillingInfoStep} = useModal(newFormForBillingInfoModalAtom);
    const {open: openUsingMemberInfoModal} = useModal(newFormForUsingMemberInfoModalAtom);

    /**
     * 모달의 열림과 닫힘에 따른 로직 처리하기
     *
     * 구독 수동추가 모달그룹 에서는,
     * 이 CTA 버튼이 최초등장하는 모달의 버튼입니다.
     * 따라서, 이 CTA 버튼이 unmount 되었을 때를
     * 수동추가 모달그룹 전체가 종료된 것으로 보고,
     * 폼 데이터 초기화 로직을 이곳에 배치 합니다.
     * => 수정) 폼 데이터 초기화는 모달을 처음 열었을때 실행합니다.
     */
    useEffect(() => {
        if (isShow) setFormData(subscriptionManualFormDataDefaultValue);
    }, [isShow]);

    // 서비스를 선택하지 않은 상태에서는 버튼 UI 를 잠시 가려둡니다.
    if (!formData.productId) return <></>;

    const onNext = () => {
        // required check
        if (!formData.productId) {
            return;
        }

        /**
         * 이 CTA 버튼이 본 모달그룹 중에서 첫번째 모달의 버튼입니다.
         * 특정 인풋을 통해서는 설정하기 애매하지만 여전히 필수로 입력되어야 하는 값이 있습니다.
         * 그런 값들을 이 곳에서 마저 처리해줍니다.
         * (예를들어 조직아이디)
         * (본래 전통적인 html 에서는 <input type="hidden" /> 으로 처리되는 것)
         */
        setFormData((f) => ({...f, organizationId}));

        // 조건에 맞게 다음 스텝의 모달을 엽니다.
        formData.isFreeTier ? openUsingMemberInfoModal() : openBillingInfoStep();
    };

    return (
        <NextButtonUI
            isActive={
                // 서비스 선택은 필수
                !!formData.productId &&
                // 유/무료 선택은 필수
                typeof formData.isFreeTier !== 'undefined'
            }
            onClick={onNext}
        >
            다음
        </NextButtonUI>
    );
});
