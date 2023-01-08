import {ApplicationDto} from '^types/application.type';
import {OrganizationDto} from '^types/organization.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

// 쿼리가 가능한 엔티티. (dto 와 entity 의 형태 차이가 좀 있음)
export class BillingSchedule {
    organizationId!: number;
    applicationId!: number;
    prototypeId!: number;
    paymentPlanId!: number;
    billingCycleId!: number;
    isSuccess!: boolean;
    isOverdue!: boolean;
    billingDate!: string;
    billingAmount!: number;
    isFreeTier!: boolean;
    isPerUser!: boolean;
    unitPrice!: number;
    paidMemberCount!: number;
}

export type BillingScheduleShallowDto = {
    organizationId: number;
    applicationId: number;
    prototypeId: number;
    paymentPlanId: number;
    billingCycleId: number;
    orgName: string;
    serviceName: string;
    planName: string;
    cycleName: string;
    isSuccess: boolean;
    isOverdue: boolean;
    billingDate: string;
    billingAmount: number;
    isFreeTier: boolean;
    isPerUser: boolean;
    unitPrice: number;
    paidMemberCount: number;
};

export type BillingHistoryDto = {
    id: number;
    organizationId: number;
    applicationId: number;
    paidAt: string;
    paidAmount: number;
    isSuccess: boolean;
    invoiceUrl?: string;
    createdAt: string;
    updatedAt: string;
    organization: OrganizationDto;
    application: ApplicationDto;
};

export const t_paidAt = (dto: BillingHistoryDto) => new Date(dto.paidAt).toLocaleString();

export class CreateBillingHistoryRequestDto {
    paidAt!: Date; // 결제일시
    paidAmount!: number; // 결제금액
    isSuccess!: boolean; // 결제완료여부
    invoiceUrl?: string | null; // 인보이스(파일) 주소
}

interface Type<T = any> extends Function {
    new (...args: any[]): T;
}
// const PartialType = <T>(classRef: Type<T>): Partial<T> => classRef;
function PartialType<T>(classRef: Type<T>): Type<Partial<T>> {
    return classRef;
}
export class UpdateBillingHistoryRequestDto extends PartialType(CreateBillingHistoryRequestDto) {}

export class CreateBillingHistoryStandAloneRequestDto {
    billingCycleId!: number; // 결제주기 ID
    paidAt!: Date; // 결제일시
    paidAmount!: number; // 결제금액
    // isSuccess!: boolean; // 결제완료여부
    // invoiceUrl?: string | null; // 인보이스(파일) 주소
}

export type StartEndParams = {
    startDate?: string;
    endDate?: string;
};

export type GetBillingSchedulesParams = FindAllQueryDto<BillingSchedule> & StartEndParams;
export type GetBillingHistoriesParams = FindAllQueryDto<BillingHistoryDto> & StartEndParams;
