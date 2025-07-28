import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {GmailItemDto} from './GmailItem.dto';

export class FindAllGmailItemQueryDto extends FindAllQueryDto<GmailItemDto> {
    filterQuery?: string;
}
