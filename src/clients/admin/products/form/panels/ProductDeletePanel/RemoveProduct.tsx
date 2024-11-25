import {memo} from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {productApi} from '^models/Product/api';
import {ProductDto} from '^models/Product/type';
import {ContentPanelItem, ContentPanelItemText, ContentPanelItemTitle} from '^layouts/ContentLayout';
import {AdminProductsPageRoute} from '^pages/admin/products';

interface RemoveProductProps {
    product: ProductDto;
}

export const RemoveProduct = memo((props: RemoveProductProps) => {
    const router = useRouter();
    const {product} = props;

    const onClick = () => {
        if (confirm('데이터를 복구할 수 없게 됩니다.\n진짜 실행할까요?')) {
            productApi
                .destroy(product.id)
                .then(() => toast.success('삭제 완료'))
                .then(() => router.replace(AdminProductsPageRoute.path()))
                .catch(errorToast);
        }
    };

    return (
        <ContentPanelItem>
            <div className="flex-1">
                <ContentPanelItemTitle className="font-semibold mb-1.5" text="이 앱을 스코디 전체에서 제거합니다." />
                <ContentPanelItemText
                    text={`
                        <ul>
                          <li>앱을 삭제하면 스코디를 사용하는 <b>모든 조직의 구독이 삭제됩니다.</b></li>
                          <li><b>이 작업은 돌이킬 수 없습니다.</b> 신중하게 검토 후 삭제하세요!</li>
                        </ul>
                    `}
                />
            </div>
            <div className="flex-1 text-end">
                <button type="button" className="btn btn-error text-white" onClick={onClick}>
                    관리자 권한으로 이 앱 삭제하기
                </button>
            </div>
        </ContentPanelItem>
    );
});
RemoveProduct.displayName = 'RemoveProduct';
