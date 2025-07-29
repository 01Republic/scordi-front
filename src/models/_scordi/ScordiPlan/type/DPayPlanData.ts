export class DPayPlanData {
    // => to-be: DPayProject
    title?: string;
    subtitle?: string;
    hasCoverPage?: boolean;
    coverImgUrl?: string;
    hasMoveButton?: boolean; // 최종 CTA 버튼 사용여부
    moveButtonText?: string; // 최종 CTA 버튼 텍스트
    moveButtonUrl?: string; // 최종 CTA 버튼 클릭시 주소
    moveButtonMethod?: '_self' | '_blank' | '_parent' | '_top'; // 최종 CTA 클릭시 링크 동작
    etcRequired?: boolean; // 추가입력 사용여부
    etcLabel?: string; // 추가입력 필드명
    onCompleteMessage?: string; // 최종 CTA 클릭시 얼럿 메세지
}
