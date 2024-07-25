import React, {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {Breadcrumb} from '^clients/private/_layouts/_shared/Breadcrumb';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {FormContainer} from '^clients/private/_components/containers';

export const OrgInvoiceAccountNewPage = memo(function OrgInvoiceAccountNewPage() {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (!router.isReady) return;
    }, [router.isReady]);

    return (
        <MainLayout>
            <MainContainer>
                <Breadcrumb paths={[]} />

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl mb-1">청구서 수신 메일 추가</h1>
                        <p className="text-14 text-gray-500">
                            결제수단을 스코디에 추가하기 위한 필수/선택 정보를 입력해주세요.
                        </p>
                    </div>
                </div>

                <FormContainer isLoading={isLoading}>
                    <div className="px-4 py-8 border-b">
                        <div className="max-w-md mx-auto flex flex-col gap-8 mb-16">
                            <h2 className="leading-none text-xl font-semibold">필수정보</h2>
                        </div>
                    </div>
                </FormContainer>
            </MainContainer>
        </MainLayout>
    );
});
