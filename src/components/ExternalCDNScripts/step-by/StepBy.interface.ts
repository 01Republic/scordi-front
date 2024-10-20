namespace StepBy {
    export interface UserInfo {
        // id : [필수] 고객별 고유 식별자 (maxLength : 512)
        id: string;

        // created_at : [옵션] 고객 생성일 (iso 8601 형식의 string)
        created_at?: string;
    }

    export interface StartGuideOption {
        // isOnce : true 일 경우 해당 가이드를 1회만 노출 (설정 안 할 시 default false)
        isOnce?: boolean;

        // version : 가이드의 특정 version 을 실행 (설정 안 할 시 default 최신버전)
        version?: string;

        // onCompleteGuide : 가이드가 종료된 이후 실행할 함수
        onCompleteGuide?: () => void;
    }
}

export interface StepBy {
    init: (key: string) => void;

    /**
     * 유저 설정 (옵션)
     * ---
     *
     * * 가이드 실행을 위한 유저정보를 설정합니다.
     * * 최상위 페이지에서 setUserProperties() 함수를 호출해 유저를 설정해주세요
     */
    setUserProperties: (userInfo: StepBy.UserInfo) => void;

    /**
     * 가이드 실행
     * ---
     * * 가이드에 할당된 GUIDE ID로 가이드를 시작할 수 있습니다.
     * * option 을 통해 가이드 실행에 옵션을 부여할 수 있습니다.
     */
    startGuide: (guideId: string, option?: StepBy.StartGuideOption) => void;
}
