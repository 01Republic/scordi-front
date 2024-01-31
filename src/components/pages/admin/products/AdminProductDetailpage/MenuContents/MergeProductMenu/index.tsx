import React, {memo, useState} from 'react';
import {TextInput} from '^components/TextInput';
import {ContentForm, ContentPanel, ContentPanelInput, ContentPanelList} from '^layouts/ContentLayout';
import {productApi} from '^models/Product/api';
import {adminProductDetail} from '^admin/products/AdminProductDetailpage';
import {useRecoilValue} from 'recoil';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import {AdminProductsPageRoute} from '^pages/admin/products';
import {MergedProductNameList} from '^admin/products/AdminProductDetailpage/MenuContents/MergeProductMenu/MergedProductNameList';

export const MergeProductMenu = memo(() => {
    const currentProduct = useRecoilValue(adminProductDetail);
    const [targetId, setTargetId] = useState<number>();
    const router = useRouter();

    if (!currentProduct) return <></>;

    const onSubmit = () => {
        if (!targetId) return;

        const request = productApi.merge(currentProduct.id, targetId);
        request.then((res) => {
            if (res.status === 200) {
                toast.success('변경 저장 완료');
                router.replace(AdminProductsPageRoute.path());
            }
        });

        request.catch((err) => {
            const message = err.response?.data?.message;
            toast.error(message);
        });
    };

    return (
        <div>
            <ContentForm
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <ContentPanel title="병합">
                    <ContentPanelList>
                        <ContentPanelInput title="병합될 서비스 ID" text="합쳐질 대상 서비스 ID를 입력해주세요">
                            <TextInput onChange={(e) => setTargetId(Number(e.target.value))} />
                        </ContentPanelInput>
                    </ContentPanelList>
                </ContentPanel>

                <MergedProductNameList product={currentProduct} />
            </ContentForm>
        </div>
    );
});
