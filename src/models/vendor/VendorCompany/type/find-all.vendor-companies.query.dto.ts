import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {VendorCompanyDto} from './VendorCompany.dto';

export class FindAllVendorCompaniesQueryDto extends FindAllQueryDto<VendorCompanyDto> {
    keyword?: string;
}
