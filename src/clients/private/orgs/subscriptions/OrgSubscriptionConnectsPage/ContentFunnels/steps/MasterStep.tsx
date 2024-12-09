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
            title={`${nounToHangulObjectFormat(serviceName, '%w%s')} 관리하는 담당자를 선택해주세요.`}
            desc="구독 서비스를 주로 이용하는 팀의 리더나 비용 관리자를 주로 선택해요."
        >
            <MasterSelect />
        </StepLayout>
    );
});
