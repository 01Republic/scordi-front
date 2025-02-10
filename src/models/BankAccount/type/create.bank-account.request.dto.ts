import {BankAccountKind} from './BankAccountKind.enum';
import {BankAccountUsingStatus} from './BankAccountUsingStatus.enum';

export class CreateBankAccountRequestDto {
    isPersonal: boolean; // 법인 여부
    bank: string; // 은행
    kind: BankAccountKind; // 계좌 종류
    number: string; // 계좌번호
    displayNumber?: string; // 계좌번호(표시용)
    name: string; // 계좌명(종류)
    alias?: string; // 계좌별칭
    usingStatus?: BankAccountUsingStatus; // 사용상태
    isOverDraft?: boolean; // 마이너스 통장 여부
    memo?: string; // 메모
    holdingMemberId?: number; // 담당자 ID
}
