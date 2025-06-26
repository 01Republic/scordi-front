/* 이메일주소 검증 */
export const validateEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/* 사업자등록번호 검증 */
export const validBizNoRegex = /^(\d{3})-?(\d{2})-?(\d{5})$/;
/* 비밀번호 검증 */
export const validPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/;
