import {ApplicationDto} from '^types/application.type';
import {OrganizationDto} from '^types/organization.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

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

export class CreateBillingHistoryRequestDto {
    paidAt!: Date; // 결제일시
    paidAmount!: number; // 결제금액
    isSuccess!: boolean; // 결제완료여부
    invoiceUrl?: string | null; // 인보이스(파일) 주소
}

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

export type GetBillingHistoriesParams = FindAllQueryDto<BillingHistoryDto> & StartEndParams;
