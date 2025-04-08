import {pagedResourceAtom} from '^hooks/usePagedResource';
import {ReviewResponseDto} from '../type/ReviewResponse.dto';
import {FindAllReviewResponsesQueryDto} from '../type/FindAllReviewResponsesQuery.dto';

export const reviewResponsesAtom = pagedResourceAtom<ReviewResponseDto, FindAllReviewResponsesQueryDto>({
    key: 'reviewResponsesAtom',
});
