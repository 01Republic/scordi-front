import { ApplicationConnectApi } from '^api/applicationConnect.api';

export interface FetcherProps<T, D> {
  api: ApplicationConnectApi;
  orgName: string;
  params: T;
  onComplete: (data: D) => void;
}
