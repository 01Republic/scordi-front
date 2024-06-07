import {memo} from 'react';
import {StepLayout} from '../_common/StepLayout';
import {useCurrentConnectingProduct} from '../useCurrentConnectingProduct';
import {MasterSelect} from '../inputs/MasterSelect';
import {nounToHangulObjectFormat} from '^utils/hangul';

// [**구독 등록 플로우 (수동) /** 담당자](https://www.notion.so/cbc20160d7aa443e94fa778b9e52f011?pvs=21)
export const MasterStep = memo(function MasterStep() {
    const {currentConnectingProduct} = useCurrentConnectingProduct();
    const serviceName = currentConnectingProduct?.name() || '';

    return (
        <StepLayout
            title={`${nounToHangulObjectFormat(serviceName, '%w%s')} 관리중인 주 담당자를 할당해주세요.`}
            desc="초대가 되지 않으니 안심하고 추가해요. 잘 모르겠다면 나중에 추가할 수 있으니 넘어가도 좋아요."
        >
            <MasterSelect />
        </StepLayout>
    );
});
