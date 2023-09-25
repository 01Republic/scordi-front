import {OrganizationDto} from '^types/organization.type';
import {ProductDto} from '^types/product.type';
import {WorkspaceDto} from '^types/workspace.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {TypeCast} from '^types/utils/class-transformer';
import {crawlerSign} from '^config/environments';
import CryptoJS from 'crypto-js';
import {TeamMemberDto} from '^types/team-member.type';

export enum ConnectSession {
    IN_VERIFICATION = 'IN_VERIFICATION',
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
}

export class LoginQueryDto {
    email: string; // 이메일
    password: string; // 비밀번호
}

export class AccountDto {
    id: number; // 아이디
    sign: string; // 계정 sign
    productId: number; // 프로덕트 ID
    organizationId: number; // 조직 ID
    connectSession: ConnectSession; // 연동 상태
    loginPageUrl?: string | null; // 로그인 페이지 URL // [optional] 로그인 페이지 링크
    loginMethod?: string | null; // 로그인 구분 // [optional] 구분 (로그인방법 (dynamic tag 방식))
    memo?: string | null;
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시
    @TypeCast(() => ProductDto) product: ProductDto; // 프로덕트
    @TypeCast(() => WorkspaceDto) workspaces: WorkspaceDto[]; // 워크스페이스 목록
    @TypeCast(() => OrganizationDto) organization: OrganizationDto; // 조직
    @TypeCast(() => TeamMemberDto) permittedMembers: TeamMemberDto[]; // 허용된 멤버 // [optional] 사용자 (member multi-select)

    decryptSign() {
        const bytes = CryptoJS.AES.decrypt(this.sign, crawlerSign);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as LoginQueryDto;
    }
}

export type FindAllAccountsQueryDto = FindAllQueryDto<AccountDto> & {
    subscriptionId?: number;
};

export class UnSignedAccountFormData {
    productId: number;
    email: string;
    password: string;
    loginPageUrl?: string | null;
    loginMethod?: string | null;
    memo?: string | null;

    get sign(): string {
        const json = JSON.stringify({email: this.email, password: this.password});
        return CryptoJS.AES.encrypt(json, crawlerSign).toString();
    }

    toCreateDto(): CreateAccountDto {
        return {
            sign: this.sign,
            productId: this.productId,
            loginPageUrl: this.loginPageUrl,
            loginMethod: this.loginMethod,
            memo: this.memo,
        };
    }

    toUpdateDto(): UpdateAccountDto {
        return {
            sign: this.sign,
            loginPageUrl: this.loginPageUrl,
            loginMethod: this.loginMethod,
            memo: this.memo,
        };
    }
}

export type CreateAccountDto = {
    sign: string;
    productId: number;
    loginPageUrl?: string | null;
    loginMethod?: string | null;
    memo?: string | null;
};

export type UpdateAccountDto = {
    sign?: string;
    connectSession?: ConnectSession;
    loginPageUrl?: string | null;
    loginMethod?: string | null;
    memo?: string | null;
};
