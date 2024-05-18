import {memo} from 'react';
import {StepLayout} from '../_common/StepLayout';
import {useCurrentConnectingProduct} from '../useCurrentConnectingProduct';

// 구독 등록 플로우 (수동) / 이용중인 멤버
export const TeamMemberStep = memo(function TeamMemberStep() {
    const {isLoading, currentConnectingProduct} = useCurrentConnectingProduct();

    return (
        <StepLayout
            title={`${currentConnectingProduct?.name()} 쓰고 있는 멤버들을 추가해주세요.`}
            desc="초대가 되지 않으니 안심하고 추가해요. 잘 모르겠다면 나중에 추가할 수 있으니 넘어가도 좋아요."
        >
            <div>
                - 셀렉트인풋 : 이용중인 멤버 선택
                {/*- CTA : 새로운 멤버 계정 추가하기*/}
            </div>
        </StepLayout>
    );
});
