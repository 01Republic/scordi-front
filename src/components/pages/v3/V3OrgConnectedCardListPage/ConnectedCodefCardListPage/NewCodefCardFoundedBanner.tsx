import {memo} from 'react';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {useSetRecoilState} from 'recoil';
import {CardListPageMode, cardListPageModeAtom} from '^v3/V3OrgConnectedCardListPage/atom';
import {useNewCodefCards} from '^models/CodefCard/hook';

interface NewCodefCardFoundedBannerProps {
    codefAccount: CodefAccountDto;
}

export const NewCodefCardFoundedBanner = memo((props: NewCodefCardFoundedBannerProps) => {
    const {codefAccount} = props;
    const setCardListPageMode = useSetRecoilState(cardListPageModeAtom);
    const {result} = useNewCodefCards(codefAccount.id);

    const onClick = () => {
        setCardListPageMode(CardListPageMode.NewCards);
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
