import {memo} from 'react';
import {StepLayout} from '../_common/StepLayout';
import {useCurrentConnectingProduct} from '../useCurrentConnectingProduct';

// [**구독 등록 플로우 (수동) /** 담당자](https://www.notion.so/cbc20160d7aa443e94fa778b9e52f011?pvs=21)
export const MasterStep = memo(function MasterStep() {
    const {isLoading, currentConnectingProduct} = useCurrentConnectingProduct();

    return (
        <StepLayout
            title={`${currentConnectingProduct?.name()} 관리중인 담당자를 추가해주세요.`}
            desc="초대가 되지 않으니 안심하고 추가해요. 잘 모르겠다면 나중에 추가할 수 있으니 넘어가도 좋아요."
        >
            <div>
                - 셀렉트인풋 : 담당자 선택
                {/*- CTA : 담당자 계정 추가하기*/}
            </div>
        </StepLayout>
    );
});
