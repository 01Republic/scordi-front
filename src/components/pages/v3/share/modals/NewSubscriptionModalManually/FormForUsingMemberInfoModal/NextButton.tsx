import {memo} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {useModal} from '^v3/share/modals';
import {subscriptionApi} from '^models/Subscription/api';
import {newFormForFinishModalAtom, newSubscriptionManualFormData, subscriptionIdAtom} from '../atom';
import {NextButtonUI} from '../NextButtonUI';

export const NextButton = memo(function NextButton() {
    const formData = useRecoilValue(newSubscriptionManualFormData);
    const {open: finishModalOpen} = useModal(newFormForFinishModalAtom);
    const setSubscriptionId = useSetRecoilState(subscriptionIdAtom);

    const onNext = () => {
        const req = subscriptionApi.create(formData);

        // 생성 진행 중인 상태 처리
        // 성공 완료 처리
        req.then((res) => {
            finishModalOpen();
            setSubscriptionId(res.data.id);
        });

        // 실패시 처리
        req.catch((e) => console.log(e));
    };

    return (
        <NextButtonUI isActive={true} onClick={onNext}>
            등록하기
        </NextButtonUI>
    );
});
