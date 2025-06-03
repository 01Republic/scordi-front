export class UpdateAccountRequestDto {
    id?: string; // 아이디 | 아이디 방식일 경우 필수
    password?: string; // 패스워드 | 인증서 방식일 경우 인증서 패스워드, 아이디 방식일 경우 아이디 패스워드 입력
}
