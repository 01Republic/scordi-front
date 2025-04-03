import {OmitType} from '^types/utils/omit-type';
import {PartialType} from '^types/utils/partial-type';
import {CreateReviewCampaignRequestDto} from './CreateReviewCampaignRequest.dto';

export class UpdateReviewCampaignRequestDto extends OmitType(PartialType(CreateReviewCampaignRequestDto), [
    'teamMemberIds',
]) {
    // @ApiProperty({ description: '요청 제목' })
    // @IsString2()
    // title: string;
    //
    // @ApiProperty({ description: '요청 내용' })
    // @IsString2()
    // description: string;
    //
    // @ApiProperty({ description: '마감일시' })
    // @IsDate2()
    // finishAt: Date;
}
