import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {TypeCast} from '^types/utils/class-transformer';

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
