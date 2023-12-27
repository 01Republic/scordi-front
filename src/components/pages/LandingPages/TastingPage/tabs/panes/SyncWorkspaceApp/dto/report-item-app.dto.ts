import {TypeCast} from '^types/utils/class-transformer';
import {ProductDto} from '^models/Product/type';
import {
    RecurringType,
    ReportItemFormDataDto,
} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/dto/report-item-form.dto';
import {CurrencyCode} from '^types/money.type';

export class ReportItemAppDto {
    appName: string;

    @TypeCast(() => Date)
    lastAuthorizedTime?: Date;

    @TypeCast(() => ProductDto)
    product?: ProductDto;

    isPersisted = true;
    isEdited = false;
    isNew = false;

    formData: ReportItemFormDataDto = {
        isFree: true,
        recurringType: RecurringType.Monthly,
        isPerUser: false,
        payAmount: 0,
        currencyType: CurrencyCode.KRW,
    };

    get key() {
        return this.name;
    }

    get name() {
        return toRegularName(this.product ? this.product.name() : this.appName);
    }
}

function toRegularName(name: string) {
    return (
        {
            'scordi with google admin': '스코디',
            'scordi with admin api': '스코디',
            'typed finance': '파운더스',
            'freepik company': 'Freepik',
            핫자: 'Hotjar',
        }[name.toLowerCase()] || name
    );
}
