import { ApplicationPrototypeDto } from '^types/applicationPrototype.type';
import { OrganizationDto } from '^types/organizationTypes';
import { FindAllQueryDto } from '^types/utils/findAll.query.dto';
import { ApplicationPaymentPlanDto } from '^types/applicationPaymentPlan.type';
import { ApplicationBillingCycleDto } from '^types/applicationBillingCycle.type';
import { InvoiceDataDto } from '^components/ApplicationConnectStage/dto/fetched.responses.dto';

// ConnectStatus 연동상태.
export enum ConnectStatus {
  applied = 'APPLIED',
  pending = 'PENDING',
  success = 'SUCCESS',
  failure = 'FAILURE',
}

export function t_ConnectStatus(status: ConnectStatus) {
  switch (status) {
    case ConnectStatus.applied:
      return '연동(준비중)';
    case ConnectStatus.pending:
      return '연동(처리중)';
    case ConnectStatus.success:
      return `연동 완료(자동)`;
    case ConnectStatus.failure:
      return '연동(오류)';
    default:
      return '';
  }
}

export type ApplicationDto = {
  id: number;
  connectStatus: ConnectStatus;
  organizationId: number;
  prototypeId: number;
  paymentPlanId: number;
  billingCycleId: number;
  isFreeTier: boolean;
  registeredAt: Date; // 사용 시작일
  accountCount: number;
  createdAt: Date;
  updatedAt: Date;
  paymentPlan: ApplicationPaymentPlanDto;
  billingCycle: ApplicationBillingCycleDto;
  prototype: ApplicationPrototypeDto;
  organization?: OrganizationDto;
  paymentHistories?: [];
  accounts?: [];
};

export type FindAllAppsQuery = FindAllQueryDto<ApplicationDto>;

export type CreateApplicationRequestDto = {
  sign: string | null; // 연동계정 Sign
  organizationId: number; // 조직 ID
  prototypeId: number; // 프로토타입 ID
  paymentPlanId: number; // 결제플랜 ID
  billingCycleId: number; // 결제주기 ID
  isFreeTier: boolean; // 프리티어 여부
  registeredAt: Date | string; // 사용시작일
  paidMemberCount: number; // 결제되는 사용자 수
  usedMemberCount?: number; // 사용중인 사용자 수
}

export type CreateApplicationByInvoicesRequestDto = {
  organizationId: number; // 조직 ID
  prototypeId: number; // 프로토타입 ID
  paymentPlanId: number; // 결제플랜 ID
  billingCycleId: number; // 결제주기 ID
  isFreeTier: boolean; // 프리티어 여부
  registeredAt: Date | string; // 사용시작일
  paidMemberCount: number; // 결제되는 사용자 수
  invoiceDataList: InvoiceDataDto[];
}

export type UpdateApplicationRequestDto = Omit<
  CreateApplicationRequestDto,
  'organizationId' | 'prototypeId'
>;

// export const applicationMockDataList: ApplicationDto[] = [
//   {
//     id: 1,
//     prototypeId: 1,
//     isFreeTier: false,
//     paymentPlan: 'business',
//     billingCycle: 'monthly',
//     registeredAt: new Date(),
//     accountCount: 4,
//     prototype: applicationPrototypeMockDataList.find(app => app.id === 1)!,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 2,
//     prototypeId: 2,
//     isFreeTier: true,
//     paymentPlan: 'free',
//     billingCycle: 'undef',
//     registeredAt: new Date(),
//     accountCount: 3,
//     prototype: applicationPrototypeMockDataList.find(app => app.id === 2)!,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];
