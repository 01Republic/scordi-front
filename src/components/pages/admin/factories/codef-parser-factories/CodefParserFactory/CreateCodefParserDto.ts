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

    asApiValues?() {
        return {
            [FindOperatorType.Like]: {
                ops: this.ops,
                value: this.queryValue && this.queryValue(this.value, this.fo, this.bo),
            },
            [FindOperatorType.Equal]: {ops: this.ops, value: this.value},
        }[this.ops] as FindOperatorUnitDto;
    }

    parseQuery?() {
        const dto = new FindOperatorUnitDto();
        if (this.ops === FindOperatorType.Like) {
            dto.ops = FindOperatorType.Like;
            dto.fo = this.value.startsWith('%');
            dto.bo = this.value.endsWith('%');
            dto.value = this.value.replace(/^%/, '').replace(/%$/, '');
            return dto;
        }
        if (this.ops === FindOperatorType.Equal) {
            dto.ops = FindOperatorType.Equal;
            dto.fo = false;
            dto.bo = false;
            dto.value = this.value;
            return dto;
        }
        return this;
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
