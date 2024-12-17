import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {VendorManagerDto} from '^models/vendor/VendorManager/type/VendorManager.dto';

export class FindAllVendorManagersQueryDto extends FindAllQueryDto<VendorManagerDto> {
    keyword?: string;
}
