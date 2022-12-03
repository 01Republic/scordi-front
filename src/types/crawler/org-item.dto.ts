export class OrgItemDto {
    name!: string; // 서비스 내 조직 이름
    image!: string; // 이미지
    profileUrl?: string; // 조직 프로필 페이지 주소
    billingPageUrl?: string; // 조직 결제정보 페이지 주소
    membersPageUrl?: string; // 조직 멤버정보 페이지 주소
}
