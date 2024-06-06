import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {VendorManagerDto} from '^models/VendorManager/type/VendorManager.dto';

export class FindAllVendorManagersQueryDto extends FindAllQueryDto<VendorManagerDto> {
    keyword?: string;
}
