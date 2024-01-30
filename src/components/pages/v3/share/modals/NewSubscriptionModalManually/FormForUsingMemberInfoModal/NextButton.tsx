import {memo} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {useModal} from '^v3/share/modals';
import {subscriptionApi} from '^models/Subscription/api';
import {memoAtom, newFormForFinishModalAtom, newSubscriptionManualFormData, subscriptionIdAtom} from '../atom';
import {NextButtonUI} from '../../../NextButtonUI';
import {useSubscriptionMenuSummary, useSubscriptionTableListAtom} from '^models/Subscription/hook';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {PricingModelOptions} from '^models/Subscription/types/PricingModelOptions';
import {debounce} from 'lodash';

export const NextButton = memo(function NextButton() {
    const formData = useRecoilValue(newSubscriptionManualFormData);
    const {open: finishModalOpen} = useModal(newFormForFinishModalAtom);
    const setSubscriptionId = useSetRecoilState(subscriptionIdAtom);
    const setDesc = useSetRecoilState(memoAtom);
    const {reload: reloadSummary} = useSubscriptionMenuSummary(); // 구독리스트 > 요약패널 갱신용
    const {reload: reloadTableData} = useSubscriptionTableListAtom(); // 구독리스트 > 테이블 갱신용

    const refreshPageData = () => {
        reloadSummary(); // 구독리스트 > 요약패널 갱신
        reloadTableData(); // 구독리스트 > 테이블 갱신
    };

    const onNext = debounce(() => {
        const req = subscriptionApi.create({
            ...formData,
            // 결제주기: 무료인 구독은 강제로 "무관" 값으로 정정하여 제출
            billingCycleType: formData.isFreeTier ? BillingCycleOptions.None : formData.billingCycleType,
            // 과금방식: 무료인 구독은 강제로 "무관" 값으로 정정하여 제출
            pricingModel: formData.isFreeTier ? PricingModelOptions.NONE : formData.pricingModel,
        });

        // 생성 진행 중인 상태 처리
        // 성공 완료 처리
        req.then((res) => {
            setDesc('');
            setSubscriptionId(res.data.id);
            refreshPageData();
            finishModalOpen();
        });

        // 실패시 처리
        req.catch((e) => console.log(e));
    }, 500);

    return (
        <NextButtonUI isActive={true} onClick={onNext}>
            등록하기
        </NextButtonUI>
    );
});
