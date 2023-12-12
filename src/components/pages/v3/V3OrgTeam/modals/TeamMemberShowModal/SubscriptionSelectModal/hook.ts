import {useRecoilState, useRecoilValue} from 'recoil';
import {useModal} from '^v3/share/modals';
import {SubscriptionDto} from '^models/Subscription/types';
import {orgIdParamState} from '^atoms/common';
import {noSelectableIdsAtom, pagesResultAtom, subscriptionSelectModalAtom} from './atom';
import {AxiosResponse} from 'axios';
import {Paginated} from '^types/utils/paginated.dto';

export const useSubscriptionSelectModal = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const {open, close, ...specs} = useModal(subscriptionSelectModalAtom);
    const [result, setResult] = useRecoilState(pagesResultAtom);
    const [noSelectableIds, setNoSelectableIds] = useRecoilState(noSelectableIdsAtom);

    const show = async (noSelectableIds?: number[]) => {
        noSelectableIds && setNoSelectableIds(noSelectableIds);
        open();
    };

    const hide = async () => {
        close();
    };

    const searchForm = {
        result,
        noSelectableIds,
        selectableItems() {
            return this.result.items.filter((item) => !this.noSelectableIds.includes(item.id));
        },

        // 필요한 사용 장소에 따라, 필요한 API 를 끼워 사용할 수 있습니다.
        // Paginated<SubscriptionDto> 를 응답으로 반환하는 API 라면 모두 동작합니다.
        async search(request: Promise<AxiosResponse<Paginated<SubscriptionDto>>>) {
            return request.then((res) => setResult(res.data));
        },
    };

    return {...specs, show, hide, searchForm};
};
