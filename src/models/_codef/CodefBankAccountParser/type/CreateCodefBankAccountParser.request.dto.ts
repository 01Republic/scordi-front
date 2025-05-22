import {TypeCast} from '^types/utils/class-transformer';
import {
    FindOperatorUnitDto,
    GroupingMethod,
} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateCodefParserDto';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';

export class CreateCodefBankAccountParserRequestDto {
    title: string;
    productId: number;
    // queryObj: FindAllCodefBillingHistoryQueryDto;
    // queryObj: {
    //     where: {
    //         resMemberStoreName: FindOptionsWhere<CodefBillingHistoryDto>['resMemberStoreName'];
    //     };
    // };
    @TypeCast(() => FindOperatorUnitDto)
    resMemberStoreName: FindOperatorUnitDto;

    groupingMethod: GroupingMethod;
    fixedRecurringType: BillingCycleOptions | null;
    memo: string;
    isActive: boolean;
}
