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
    billingDate: string;
    billingAmount: number;
    isFreeTier: boolean;
    isPerUser: boolean;
    unitPrice: number;
    paidMemberCount: number;
}

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
    organization: any;
    application: any;
}

export type StartEndParams = {
    startDate: string;
    endDate: string;
}