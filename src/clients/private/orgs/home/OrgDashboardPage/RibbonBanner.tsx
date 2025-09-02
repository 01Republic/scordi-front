import {useIdParam} from '^atoms/common';
import {OrgReviewUncategoriedPageRoute} from '^pages/orgs/[id]/reviewUncategorized';
import {TriangleAlert, X} from 'lucide-react';
import Link from 'next/link';
import {memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';

export const RibbonBanner = memo(() => {
    const orgId = useIdParam('id');

    /* TODO: 띠배너 안뜨는 로직 추가 */
    if (false) return <></>;

    /* TODO: 클릭 시 미분류 페이지로 이동. 한개일때는 상세페이지로 여러개일때는 목록 페이지로 이동 */
    const linkToUncategorized = OrgReviewUncategoriedPageRoute.path(orgId);

    return (
        <div className="p-3 bg-yellowColor-100 text-center flex justify-between items-center gap-2">
            <div></div>
            <div className="flex items-center gap-2">
                <TriangleAlert className="w-5 h-5 fill-yellowColor-200 text-yellowColor-300" />
                <div className="text-yellowColor-400 text-14">분류가 필요한 내역이 있어요!</div>
                <LinkTo
                    href={linkToUncategorized}
                    className="text-blue-500 underline ml-2 text-14"
                    displayLoading={false}
                >
                    자세히 알아보기
                </LinkTo>
            </div>
            <X className="w-5 h-5 text-[#7D7C78]" />
        </div>
    );
});
