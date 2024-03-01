import {TypeCast} from '^types/utils/class-transformer';
import {CodefApiResponseResultDto} from './CodefApiResponseResultDto';

export class CodefResponse<T = any> {
    @TypeCast(() => CodefApiResponseResultDto)
    result: CodefApiResponseResultDto;

    data: T;
}
