import {useIdParam} from '^atoms/common';
import {OrgReviewUncategoriedDetailPageRoute} from '^pages/orgs/[id]/reviewUncategorized/[reviewUncategorizedId]';
import {Card} from '^public/components/ui/card';
import {ChevronRight} from 'lucide-react';
import {useRouter} from 'next/router';
import {memo} from 'react';

export const UncategorizedItemCard = memo(() => {
    const router = useRouter();
    const orgId = useIdParam('id');

    return (
        <Card
            className="flex justify-between items-center p-6 bg-white rounded-lg hover:shadow-lg transition-all duration-300 hover:cursor-pointer"
            onClick={() => {
                /* TODO: 타깃 미분류 id 값 변경 */
                router.push(OrgReviewUncategoriedDetailPageRoute.path(orgId, 1));
            }}
        >
            <div className="flex items-center gap-4">
                <img src="/logo/cards/samsungcard.png" alt="카드" width={28} height={28} className="rounded-full" />
                <span>
                    <b>3309 카드</b>에서 발견된 분류가 필요한 내역 <b>120개</b>
                </span>
            </div>
            <ChevronRight className="w-6 h-6" />
        </Card>
    );
});
