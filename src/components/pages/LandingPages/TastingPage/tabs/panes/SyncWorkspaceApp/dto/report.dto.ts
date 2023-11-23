import {TypeCast} from '^types/utils/class-transformer';
import {ReportItemDto} from './report-item.dto';
import {ReportRawMetadataDto} from './report-raw-metadata.dto';
import {plainToInstance} from 'class-transformer';
import {ReportGroupedByProductDto} from './view-types/group-by-product/report.grouped-by-product.dto';
import {ReportGroupedByProductItemDto} from './view-types/group-by-product/report.grouped-by-product-item.dto';
import {ReportGroupedByProductMemberDto} from './view-types/group-by-product/report.grouped-by-product-member.dto';

export class ReportDto {
    organizationId?: number;
    workspaceName: string;

    @TypeCast(() => ReportItemDto)
    items: ReportItemDto[];

    @TypeCast(() => ReportRawMetadataDto)
    rawMetadata: ReportRawMetadataDto;

    groupByProduct() {
        const {items, ...rest} = this;
        const dto = plainToInstance(ReportGroupedByProductDto, rest);

        const container: Record<string, ReportGroupedByProductItemDto> = {};
        items.forEach((item) => {
            item.apps.forEach((app) => {
                container[app.key] ||= plainToInstance(ReportGroupedByProductItemDto, {
                    key: app.key,
                    members: [],
                });
                container[app.key].appName ||= app.name;
                container[app.key].product ||= app.product;

                const member = plainToInstance(ReportGroupedByProductMemberDto, {
                    email: item.email,
                    lastAuthorizedTime: app.lastAuthorizedTime,
                });
                member.isPersisted = item.isPersisted;
                member.isEdited = item.isEdited;

                /**
                 * member 를 lastAuthorizedTime 기준 최신 상태의 오브젝트로 유지
                 */
                const already = container[app.key].members.find((m) => m.email === member.email);
                if (!already) container[app.key].members.push(member);
                if (already && already.lastAuthorizedTime.getTime() <= member.lastAuthorizedTime.getTime()) {
                    const index = container[app.key].members.indexOf(already);
                    container[app.key].members.splice(index, 1, member);
                }
            });
        });

        dto.items = Object.values(container);
        return dto;
    }
}
