import {TypeCast} from '^types/utils/class-transformer';
import {CodefAccountDto} from './CodefAccountDto';
import {CodefApiAccountItemDto} from './CodefApiAccountItemDto';

export class AccountCreatedResponseDto {
    connectedId?: string;

    @TypeCast(() => CodefAccountDto)
    accessList: CodefAccountDto[];

    @TypeCast(() => CodefApiAccountItemDto)
    errorList?: CodefApiAccountItemDto[];
}
