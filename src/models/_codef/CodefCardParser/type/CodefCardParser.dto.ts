import {TypeCast} from '^types/utils/class-transformer';
import {
    FindOperatorType,
    FindOperatorUnitDto,
    GroupingMethod,
} from '^clients/admin/factories/codef-parser-factories/CodefParserFactory/CreateCodefParserDto';
import {CodefBillingHistoryDto, FindAllCodefBillingHistoryQueryDto} from '^models/CodefBillingHistory/type';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {ProductDto} from '^models/Product/type';

export class CodefCardParserDto {
    id: number;
    title: string;
    productId: number;
    queryObj: FindAllCodefBillingHistoryQueryDto; // ref. FindAllQuery
    groupingMethod: GroupingMethod;
    fixedRecurringType: BillingCycleOptions | null;
    memo: string;
    isActive: boolean;

    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;

    @TypeCast(() => ProductDto) product?: ProductDto;
    @TypeCast(() => CodefBillingHistoryDto) codefBillingHistories?: CodefBillingHistoryDto[];

    get resMemberStoreName(): FindOperatorUnitDto {
        const resMemberStoreName = this.queryObj.where?.resMemberStoreName;

        if (typeof resMemberStoreName === 'string') {
            return {
                ops: FindOperatorType.Equal,
                fo: false,
                bo: false,
                value: resMemberStoreName,
            };
        }

        if (typeof resMemberStoreName === 'object') {
            const value = resMemberStoreName.val;
            if (resMemberStoreName.op === 'like') {
                return {
                    ops: FindOperatorType.Like,
                    fo: value.startsWith('%'),
                    bo: value.endsWith('%'),
                    value: value.replace(/%/g, ''),
                };
            } else {
                return {
                    ops: FindOperatorType.Regexp,
                    fo: false,
                    bo: false,
                    value,
                };
            }
        }

        // 초기화 값
        return {
            ops: FindOperatorType.Equal,
            fo: false,
            bo: false,
            value: '',
        };
    }
}
