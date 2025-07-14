export class UpdateGoogleWorkspaceMemberRequestDto {
    // 이메일
    email?: string;

    // 전화번호
    phone?: string;

    // 프로필사진 url
    imageUrl?: string;

    // 삭제유무
    isDeleted?: boolean;

    // 최고 관리자 유무
    isAdmin?: boolean;

    // 최고 관리자 또는 위임 받은 관리자 유무
    isOwner?: boolean;

    isPrimaryOwner?: boolean;

    // 보관처리 여부
    isRestricted?: boolean;

    // 이름
    name?: string;

    // 이름+성
    realName?: string;

    // 표시 이름
    displayName?: string;

    // 구독 수
    subscriptionCount?: number;
}
