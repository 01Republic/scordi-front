import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {orgIdParamState} from '^atoms/common';
import {V3OrgConnectNewCardListPageRoute} from '^pages/v3/orgs/[orgId]/connects/card-accounts/[connectMethod]/cards/new';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {useNewCodefCards} from '^models/CodefCard/hook';

interface NewCodefCardFoundedBannerProps {
    codefAccount: CodefAccountDto;
}

export const NewCodefCardFoundedBanner = memo((props: NewCodefCardFoundedBannerProps) => {
    const {codefAccount} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const {result} = useNewCodefCards(codefAccount.id);
    const router = useRouter();

    const onClick = () => {
        return router.push(V3OrgConnectNewCardListPageRoute.path(orgId, codefAccount.id));
    };

    if (result.pagination.totalItemCount === 0) return <></>;

    return (
        <div className="px-8 py-2 bg-yellow-300 flex items-center justify-between">
            <div className="invisible">
                <button className="btn btn-sm btn-scordi" onClick={onClick}>
                    연동하러 가기
                </button>
            </div>
            <p className="flex-1 text-center text-14">새로운 카드가 있어요!</p>
            <div>
                <button className="btn btn-xs btn-scordi" onClick={onClick}>
                    연동하러 가기
                </button>
            </div>
        </div>
    );
});
NewCodefCardFoundedBanner.displayName = 'NewCodefCardFoundedBanner';
