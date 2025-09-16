import {FindAllCardHistoryQueryDto} from './find-all.card-history.query.dto';

export class PatchFinalCodefCardsHistoriesDto extends FindAllCardHistoryQueryDto {
    completeCodefCardIds?: number[];
    patchCodefCardIds?: number[];
}
