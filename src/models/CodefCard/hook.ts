import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {CodefCardDto} from './type/CodefCard.dto';
import {FindAllCardQueryDto} from './type/find-all.card.query.dto';
import {codefCardApi} from '^models/CodefCard/api';
import {newCodefCardsAtom} from '^models/CodefCard/atom';

/** 구독 불러오기 (연동페이지) 에서, 연결된 카드사의 카드 리스트를 보여줄 때 사용 */
export const useNewCodefCards = (codefAccountId: number) => useCodefCardsV3(codefAccountId, newCodefCardsAtom);

const useCodefCardsV3 = (
    codefAccountId: number,
    atoms: PagedResourceAtoms<CodefCardDto, FindAllCardQueryDto>,
    mergeMode = false,
) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => codefCardApi.index(orgId, codefAccountId, params),
        getId: 'id',
        mergeMode,
    });
};
