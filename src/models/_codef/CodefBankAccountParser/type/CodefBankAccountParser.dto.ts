import {CodefBillingHistoryDto, FindAllCodefBillingHistoryQueryDto} from '^models/CodefBillingHistory/type';
import {
    FindOperatorType,
    FindOperatorUnitDto,
    GroupingMethod,
} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateCodefParserDto';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {TypeCast} from '^types/utils/class-transformer';
import {ProductDto} from '^models/Product/type';

export class CodefBankAccountParserDto {
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
            switch (resMemberStoreName.op) {
                case 'like':
                    return {
                        ops: FindOperatorType.Like,
                        fo: resMemberStoreName.val.startsWith('%'),
                        bo: resMemberStoreName.val.endsWith('%'),
                        value: resMemberStoreName.val.replace(/%/g, ''),
                    };
                case 'in':
                    return {
                        ops: FindOperatorType.Regexp,
                        fo: false,
                        bo: false,
                        value: resMemberStoreName.val.join(', '),
                    };
                default:
                    return {
                        ops: FindOperatorType.Regexp,
                        fo: false,
                        bo: false,
                        value: resMemberStoreName.val,
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

export type CodefBankAccountParserDtoInFactory = CodefBankAccountParserDto & {product: ProductDto};
