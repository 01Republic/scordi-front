import { api } from '^api/api';
import { LoginDto } from '^components/ApplicationConnectStage/dto/login.dto';
import { OrgResponseDataDto } from '^components/ApplicationConnectStage/dto/OrgResponseData.dto';
import { ErrorResponseDto } from '^components/ApplicationConnectStage/dto/error.response.dto';
import {
  FetchedOrgBillingHistoryDto,
  FetchedOrgMemberDto, FetchedOrgPlanAndCycleDto, FetchedProfileDto,
} from '^components/ApplicationConnectStage/dto/fetched.responses.dto';
import { AxiosResponse } from 'axios';

const NAMESPACE = 'apps/code';

// 크롤러 API 가 지원되는 앱들의 목록 (서버측 엔드포인트 목록)
export type AppCode = 'github' | 'google' | 'notion';

/**
 * 1. 조직목록 조회
 * 2. 조직목록 조회 (인증코드 포함)
 *
 * 조회할 정보 구분
 *  - 3-1. 기본 정보
 *  - 3-2. 플랜, 결제주기
 *  - 3-3. 결제내역
 *  - 3-4. 구성원
 */
export class ApplicationConnectApi {
  public code: AppCode;
  protected path: string;
  protected queue: {
    getOrgProfile: Promise<AxiosResponse<FetchedProfileDto>>[];
    getOrgPlanAndCycle: Promise<AxiosResponse<FetchedOrgPlanAndCycleDto>>[];
    getOrgBillingHistories: Promise<AxiosResponse<FetchedOrgBillingHistoryDto[]>>[];
    getOrgMembers: Promise<AxiosResponse<FetchedOrgMemberDto[]>>[];
  };

  constructor(appCode: AppCode) {
    this.code = appCode;
    this.path = `/${NAMESPACE}/${this.code}`;
    this.queue = {
      getOrgProfile: [],
      getOrgPlanAndCycle: [],
      getOrgBillingHistories: [],
      getOrgMembers: [],
    }
  }

  async getOrganizations(params: LoginDto) {
    return api.get<OrgResponseDataDto[] | ErrorResponseDto>(`${this.path}/organizations`, { params });
  }

  async deviseVerification(params: Required<LoginDto>) {
    return api.get<OrgResponseDataDto[] | ErrorResponseDto>(`${this.path}/deviseVerification`, { params })
  }

  // 기본 정보
  async getOrgProfile(orgName: string, params: LoginDto) {
    return this.cacheRequest(this.queue.getOrgProfile, () => {
      const url = `${this.path}/organizations/${orgName}`;
      return api.get<FetchedProfileDto>(url, { params });
    });
  }

  // 플랜, 결제주기
  async getOrgPlanAndCycle(orgName: string, params: LoginDto) {
    return this.cacheRequest(this.queue.getOrgPlanAndCycle, () => {
      const url = `${this.path}/organizations/${orgName}/billing`;
      return api.get<FetchedOrgPlanAndCycleDto>(url, { params });
    });
  }

  // 결제내역
  async getOrgBillingHistories(orgName: string, params: LoginDto) {
    return this.cacheRequest(this.queue.getOrgBillingHistories, () => {
      const url = `${this.path}/organizations/${orgName}/billing/histories`;
      return api.get<FetchedOrgBillingHistoryDto[]>(url, { params })
    });
  }

  // 구성원
  async getOrgMembers(orgName: string, params: LoginDto) {
    return this.cacheRequest(this.queue.getOrgMembers, () => {
      const url = `${this.path}/organizations/${orgName}/members`;
      return api.get<FetchedOrgMemberDto[]>(url, { params })
    });
  }

  /**
   * ## 요청 캐싱.
   * * 이 API 의 요청들은 크롤러를 실행시키므로,
   *   개별 요청을 서버가 수행하는데 부하가 많이 필요합니다.
   *   따라서 중복랜더링 문제로 인해 불필요한 반복요청을 실행하지 않도록 자체적으로 막아줍니다.
   * * 단, 구현의 특성상, 랜더링이 중복된 각 컴포넌트는 이후 데이터를 받아 로직을 이어가야 하기 때문에
   *   실패처리 하지 않고, 최초 요청에 대한 응답을 컴포넌트에서 받아갈 수 있도록 하였습니다.
   * * 즉 응답은 걱정하지 않아도 괜찮으니 중복랜더링 최적화 이슈는 각 컴포넌트의 재량에 따라 처리하면 됩니다.
   *
   * @param cacheQueue
   * @param request
   * @private
   */
  private async cacheRequest<T>(cacheQueue: Promise<T>[], request: () => Promise<T>): Promise<T> {
    if (cacheQueue.length === 0) {
      cacheQueue.push(request());
    }
    return cacheQueue[0];
  }
}
