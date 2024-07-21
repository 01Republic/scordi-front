import {PartialType} from '^types/utils/partial-type';
import {CreateTeamInvoiceAccountDto} from '^models/TeamInvoiceAccount/type/create.team-invoice-account.dto';

export class UpdateTeamInvoiceAccountDto extends PartialType(CreateTeamInvoiceAccountDto) {}
