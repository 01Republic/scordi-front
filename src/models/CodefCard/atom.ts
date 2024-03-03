import {pagedResourceAtom} from '^hooks/usePagedResource';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {FindAllCardQueryDto} from '^models/CodefCard/type/find-all.card.query.dto';

/** 구독 불러오기 (연동페이지) 에서, 연결된 카드사의 카드 리스트를 보여줄 때 사용 */
export const newCodefCardsAtom = pagedResourceAtom<CodefCardDto, FindAllCardQueryDto>({
    key: 'newCodefCardsAtom',
});
