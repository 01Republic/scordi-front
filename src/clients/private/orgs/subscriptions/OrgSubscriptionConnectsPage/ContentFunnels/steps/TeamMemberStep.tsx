import {memo} from 'react';
import {StepLayout} from '../_common/StepLayout';
import {useCurrentConnectingProduct} from '../useCurrentConnectingProduct';
import {nounToHangulObjectFormat} from '^utils/hangul';
import {TeamMemberSelect} from '../inputs/TeamMemberSelect';

// 구독 등록 플로우 (수동) / 이용중인 멤버
export const TeamMemberStep = memo(function TeamMemberStep() {
    const {currentConnectingProduct} = useCurrentConnectingProduct();
    const serviceName = currentConnectingProduct?.name() || '';

    return (
        <StepLayout
            title={`${nounToHangulObjectFormat(serviceName, '%w%s')} 이용중인 멤버들을 추가해주세요.`}
            desc="초대가 되지 않으니 안심하고 추가해요. 잘 모르겠다면 나중에 추가할 수 있으니 넘어가도 좋아요."
        >
            <TeamMemberSelect />
        </StepLayout>
    );
});
