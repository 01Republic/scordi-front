import {ApplicationDto} from '^types/application.type';
import {OrganizationDto} from '^types/organizationTypes';

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

export type StartEndParams = {
    startDate: string;
    endDate: string;
};
