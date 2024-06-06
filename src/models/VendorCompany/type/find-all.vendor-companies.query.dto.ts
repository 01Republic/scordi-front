import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {VendorCompanyDto} from '^models/VendorCompany/type/VendorCompany.dto';

export class FindAllVendorCompaniesQueryDto extends FindAllQueryDto<VendorCompanyDto> {
    keyword?: string;
}
