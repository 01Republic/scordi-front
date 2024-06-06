import {PartialType} from '^types/utils/partial-type';
import {CreateVendorCompanyRequestDto} from './create.vendor-company.request.dto';

export class UpdateVendorCompanyRequestDto extends PartialType(CreateVendorCompanyRequestDto) {}
