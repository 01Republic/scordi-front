import {useIdParam} from '^atoms/common';
import {Breadcrumb} from '^clients/private/_layouts/_shared/Breadcrumb';
import {MainLayout} from '^clients/private/_layouts/MainLayout';
import {MainContainer} from '^clients/private/_layouts/MainLayout/MainContainer';
import {memo} from 'react';
import {UncategorizedItemCard} from './UncategorizedItemCard';

export const ReviewUncategoriedListPage = memo(() => {
    const orgId = useIdParam('id');

    return (
        <MainLayout>
            <MainContainer>
                <Breadcrumb paths={['업무', {text: '미분류', active: true}]} />

                <div className="text-2xl font-bold mt-4">미분류</div>

                <div className="mt-8 space-y-2">
                    {/* TODO: 데이터 받아오기 */}
                    {[...Array(5)].map((_, index) => (
                        /* TODO: 아이템 정보 전달 */
                        <UncategorizedItemCard key={index} />
                    ))}
                </div>
            </MainContainer>
        </MainLayout>
    );
});
