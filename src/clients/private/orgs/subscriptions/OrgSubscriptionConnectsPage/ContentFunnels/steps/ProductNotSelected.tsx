import {memo} from 'react';
import {StepLayout} from '../_common/StepLayout';
import {useCurrentConnectingProduct} from '../useCurrentConnectingProduct';

export const ProductNotSelected = memo(function ProductNotSelected() {
    const {selectedProducts, setCurrentConnectingProduct} = useCurrentConnectingProduct();

    return (
        <StepLayout title="구독 등록을 시작합니다" desc="왼쪽 패널에서 앱을 선택해주세요">
            <button
                className="btn btn-scordi min-w-[140px]"
                onClick={() => {
                    setCurrentConnectingProduct(selectedProducts[0]);
                }}
            >
                첫 번째 앱부터 시작하기
            </button>
        </StepLayout>
    );
});
