import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {IntegrationGoogleWorkspaceMemberDto} from './IntegrationGoogleWorkspaceMember.dto';

export class FindAllIntegrationGoogleWorkspaceMemberQueryDto extends FindAllQueryDto<IntegrationGoogleWorkspaceMemberDto> {
    keyword?: string;
}
