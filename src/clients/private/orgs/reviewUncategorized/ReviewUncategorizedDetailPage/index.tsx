import {useIdParam} from '^atoms/common';
import {ListTable} from '^clients/private/_components/table/ListTable';
import {Breadcrumb} from '^clients/private/_layouts/_shared/Breadcrumb';
import {MainLayout} from '^clients/private/_layouts/MainLayout';
import {MainContainer} from '^clients/private/_layouts/MainLayout/MainContainer';
import {OrgReviewUncategoriedPageRoute} from '^pages/orgs/[id]/reviewUncategorized';
import {memo, useState} from 'react';
import {toast} from 'react-toastify';
import {ConfirmSubscriptionDialog} from './ConfirmSubscriptionDialog';
import {ConnectedSubscriptionCard} from './ConnectedSubscriptionCard';
import {UncategorizedDetailModal} from './UncategorizedDetailModal';
import {UncategorizedTableHeader} from './UncategorizedTableHeader';
import {UncategorizedTableRow} from './UncategorizedTableRow';

/* TODO: 데이터 연결 후 삭제 */
const sampleData = [
    {date: '2025-01-01', status: '결제됨', content: 'Netflix 구독료', amount: '₩ 53,900', subscription: '구독 없음'},
    {date: '2025-01-02', status: '실패', content: 'Spotify 구독료', amount: '₩ 12,900', subscription: '구독 없음'},
    {date: '2025-01-03', status: '결제됨', content: 'Figma 구독료', amount: '₩ 45,000', subscription: '구독 없음'},
    {date: '2025-01-04', status: '결제됨', content: 'Notion 구독료', amount: '₩ 8,900', subscription: '구독 없음'},
    {date: '2025-01-05', status: '실패', content: 'Slack 구독료', amount: '₩ 15,000', subscription: '구독 없음'},
    {date: '2025-01-06', status: '결제됨', content: 'Zoom 구독료', amount: '₩ 19,900', subscription: '구독 없음'},
    {date: '2025-01-07', status: '결제됨', content: 'Adobe 구독료', amount: '₩ 32,900', subscription: '구독 없음'},
    {date: '2025-01-08', status: '실패', content: 'Dropbox 구독료', amount: '₩ 11,900', subscription: '구독 없음'},
    {date: '2025-01-09', status: '결제됨', content: 'Canva 구독료', amount: '₩ 14,900', subscription: '구독 없음'},
    {date: '2025-01-10', status: '결제됨', content: 'Grammarly 구독료', amount: '₩ 29,900', subscription: '구독 없음'},
];

/* TODO: 데이터 연결 후 삭제 */
const sampleConnectedSubscription = [
    {
        name: 'Github',
        price: '53,900원 / 월',
        imageUrl: 'https://github.githubassets.com/favicons/favicon.svg',
        data: sampleData[1],
    },
    {
        name: 'Notion',
        price: '8,900원 / 월',
        imageUrl: 'https://www.notion.so/front-static/favicon.ico',
        data: sampleData[3],
    },
    {
        name: 'Figma',
        price: '45,000원 / 월',
        imageUrl: 'https://static.figma.com/app/icon/1/favicon.ico',
        data: sampleData[2],
    },
];

export const ReviewUncategorizedDetailPage = memo(() => {
    const orgId = useIdParam('id');
    const [selectedItem, setSelectedItem] = useState<any>(null);

    /* 연결된 구독 ON/OFF */
    const hasConnectedSubscription = true;

    const onConfirm = () => {
        /* TODO: 구독 연결 */
        toast.success('구독 연결이 반영되었어요.');
    };

    return (
        <MainLayout>
            <MainContainer>
                <Breadcrumb
                    paths={[
                        '업무',
                        {
                            text: '미분류',
                            href: OrgReviewUncategoriedPageRoute.path(orgId),
                        },
                        {text: '미분류 상세', active: true},
                    ]}
                />

                <div className="text-2xl font-bold mt-4">
                    <span className="border-b-2 border-black">신한은행(334)</span> 이체내역의 구독을 연결해주세요.
                </div>
                <div className="text-gray-500 mt-3">
                    일정 주기로 결제되는 내역을 하나의 구독으로 묶어서 정리할 수 있어요.
                </div>

                <div className="flex gap-8">
                    {hasConnectedSubscription && (
                        <div className="mt-8">
                            연결된 구독 <span className="text-scordi font-bold">3</span>
                            <div className="py-4 space-y-3">
                                {sampleConnectedSubscription.map((item, index) => (
                                    <ConnectedSubscriptionCard
                                        key={index}
                                        item={item}
                                        onClick={() => {
                                            setSelectedItem(item.data);
                                        }}
                                    />
                                ))}
                            </div>
                            <ConfirmSubscriptionDialog onConfirm={onConfirm} />
                        </div>
                    )}

                    <div className="mt-8 w-full">
                        미분류 내역 <span className="text-scordi font-bold">120</span>
                        <div className="mt-4">
                            <ListTable
                                items={sampleData}
                                Header={() => <UncategorizedTableHeader />}
                                Row={({item}) => (
                                    <UncategorizedTableRow item={item} onClick={() => setSelectedItem(item)} />
                                )}
                            />
                        </div>
                    </div>
                </div>

                {/* 미분류 상세 모달 */}
                <UncategorizedDetailModal
                    isOpen={!!selectedItem}
                    onClose={() => setSelectedItem(null)}
                    item={selectedItem}
                />
            </MainContainer>
        </MainLayout>
    );
});
