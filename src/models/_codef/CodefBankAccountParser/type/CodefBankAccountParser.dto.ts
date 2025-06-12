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

    get query(): FindOperatorUnitDto {
        const q = this.queryObj.where?.computedAccountDesc;

        if (typeof q === 'string') {
            return {
                ops: FindOperatorType.Equal,
                fo: false,
                bo: false,
                value: q,
            };
        }

        if (typeof q === 'object') {
            switch (q.op) {
                case 'like':
                    return {
                        ops: FindOperatorType.Like,
                        fo: q.val.startsWith('%'),
                        bo: q.val.endsWith('%'),
                        value: q.val.replace(/%/g, ''),
                    };
                case 'in':
                    return {
                        ops: FindOperatorType.Regexp,
                        fo: false,
                        bo: false,
                        value: q.val.join(', '),
                    };
                default:
                    return {
                        ops: FindOperatorType.Regexp,
                        fo: false,
                        bo: false,
                        value: q.val,
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
