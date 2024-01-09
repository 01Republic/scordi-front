import {atom} from 'recoil';

export enum WorkspaceStatus {
    GeneralInfo = '기본 정보',
    Billing = '결제',
    Master = '관리자',
    Setting = '설정',
}

export enum BillingStatus {
    Plan = '구독중인 플랜',
    Info = '결제 정보',
    History = '결제 이력',
}

export enum MemberStatus {
    Member = '멤버 관리',
}

export enum ConnectStatus {
    Workspace = '워크스페이스 ',
    InvoiceEmail = '결제 내용 수신 이메일',
}

export const SelectedSettingsItem = atom<WorkspaceStatus | BillingStatus | MemberStatus | ConnectStatus>({
    key: 'SettingSelectAtom',
    default: WorkspaceStatus.GeneralInfo,
});
