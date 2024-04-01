import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {TypeCast} from '^types/utils/class-transformer';
import {PartialType} from '^types/utils/partial-type';

export class FindInputOperatorDto {
    operator: string;
    value: string;
}

export enum FindOperatorType {
    Like = 'like',
    Equal = 'equal',
    Regexp = 'regexp',
}

export enum GroupingMethod {
    byDate = 'by-date',
    byCard = 'by-card',
    byMessage = 'by-message',
}

export class FindOperatorUnitDto {
    ops: FindOperatorType;
    fo?: boolean;
    bo?: boolean;
    value: string;

    queryValue?(value: string, fo?: boolean, bo?: boolean) {
        return `${fo ? '%' : ''}${value}${bo ? '%' : ''}`;
    }

    // API 에 Form 요청을 하기 위한 마지막 전처리
    asApiValues?() {
        return {
            [FindOperatorType.Like]: {
                ops: this.ops,
                value: this.queryValue && this.queryValue(this.value, this.fo, this.bo),
            },
            [FindOperatorType.Equal]: {ops: this.ops, value: this.value},
            [FindOperatorType.Regexp]: {ops: this.ops, value: this.value},
        }[this.ops] as FindOperatorUnitDto;
    }

    // API 에서 불러온 데이터를 FormValue 로 입력하기 위한 전처리
    parseQuery?() {
        const dto = new FindOperatorUnitDto();
        switch (this.ops) {
            case FindOperatorType.Equal:
                dto.ops = FindOperatorType.Equal;
                dto.fo = false;
                dto.bo = false;
                dto.value = this.value;
                return dto;
            case FindOperatorType.Like:
                dto.ops = FindOperatorType.Like;
                dto.fo = this.value.startsWith('%');
                dto.bo = this.value.endsWith('%');
                dto.value = this.value.replace(/^%/, '').replace(/%$/, '');
                return dto;
            case FindOperatorType.Regexp:
                dto.ops = FindOperatorType.Regexp;
                dto.fo = false;
                dto.bo = false;
                dto.value = this.value;
                return dto;
            default:
                return this;
        }
    }
}

export class CreateCodefParserDto {
    serviceName: string;

    @TypeCast(() => FindOperatorUnitDto)
    searchText: FindOperatorUnitDto;

    @TypeCast(() => FindOperatorUnitDto)
    resMemberStoreName: FindOperatorUnitDto;

    groupingMethod: GroupingMethod;
    fixedRecurringType?: BillingCycleOptions;
}

export class CodefParserDataDto extends CreateCodefParserDto {}

export class UpdateCodefParserDto extends PartialType(CreateCodefParserDto) {
    serviceName: string;
}
