export class CreateVendorManagerRequestDto {
    vendorCompanyId: number; // 파트너 벤더사 ID
    name: string; // 이름
    email?: string; // 이메일
    phone?: string; // 전화번호
    jobName?: string; // 직책
    profileImgUrl?: string; // 프로필이미지주소
}
