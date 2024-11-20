import {memo} from 'react';
import {useRouter} from 'next/router';
import {ProductDto} from '^models/Product/type';
import {ContentPanelItem, ContentPanelItemText, ContentPanelItemTitle} from '^layouts/ContentLayout';

interface TransferProductProps {
    product: ProductDto;
}

export const TransferProduct = memo((props: TransferProductProps) => {
    const router = useRouter();
    const {product} = props;

    const onClick = () => {
        //
    };

    return (
        <ContentPanelItem>
            <div className="flex-1">
                <ContentPanelItemTitle className="font-semibold mb-1.5" text="이 앱을 지우고 다른 앱으로 이관합니다." />
                <ContentPanelItemText
                    text={`
                        <ul>
                          <li><b>앱과 연결된 모든 사용자 데이터</b>가 영향을 받게 됩니다.</li>
                          <li><b>이 작업은 돌이킬 수 없습니다.</b> 신중하게 검토 후 삭제하세요!</li>
                        </ul>
                    `}
                />
            </div>
            <div className="flex-1 text-end">
                <button type="button" className="btn btn-scordi" onClick={onClick}>
                    관리자 권한으로 이 앱 이관하기
                </button>
            </div>
        </ContentPanelItem>
    );
});
TransferProduct.displayName = 'TransferProduct';
