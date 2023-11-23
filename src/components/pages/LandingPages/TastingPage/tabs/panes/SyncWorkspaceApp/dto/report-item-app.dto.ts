import {TypeCast} from '^types/utils/class-transformer';
import {ProductDto} from '^models/Product/type';

export class ReportItemAppDto {
    appName: string;

    @TypeCast(() => Date)
    lastAuthorizedTime: Date;

    @TypeCast(() => ProductDto)
    product?: ProductDto;

    get key() {
        return this.name;
    }

    get name() {
        return this.product ? this.product.name() : toRegularName(this.appName);
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