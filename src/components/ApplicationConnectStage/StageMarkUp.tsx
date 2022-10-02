import { ApplicationConnectApi } from '^api/applicationConnect.api';

export interface StageMarkUp {
  title: ((name?: string) => string);
  description: string;
  StageForm?: (props: StageFormProps<any>) => JSX.Element;
}

export interface StageFormProps<T> {
  title?: string;
  description?: string;
  api: ApplicationConnectApi;
  next: <T>(data?: T) => void;
  prev: () => void;
  data: T;
}
