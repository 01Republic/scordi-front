import {
    FindOperatorUnitDto,
    GroupingMethod,
} from '^clients/admin/factories/codef-parser-factories/CodefParserFactory/CreateCodefParserDto';
import {CodefBillingHistoryDto, FindAllCodefBillingHistoryQueryDto} from '^models/CodefBillingHistory/type';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {TypeCast} from '^types/utils/class-transformer';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {FindOptionsWhere} from '^types/utils/find-options';

export class CreateCodefCardParserRequestDto {
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
