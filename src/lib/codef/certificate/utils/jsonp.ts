/**
 * JSONP 요청을 처리하는 유틸리티 모듈
 */

import {InstallCheckErrorCode} from '^lib/codef/certificate/main/errors';

/**
 * JSONP 요청 옵션 인터페이스
 */
export interface JsonpOptions {
    url: string; // 요청 URL
    callbackParam?: string; // 콜백 파라미터 이름 (기본값: 'callback')
    timeout?: number; // 타임아웃 시간 (밀리초, 기본값: 5000)
    data?: Record<string, any>; // 추가 데이터 파라미터
}

/**
 * JSONP 요청을 수행하는 함수
 * @param options JSONP 요청 옵션
 * @returns Promise<T> 응답 데이터를 포함하는 Promise
 */
export function jsonp<T = any>(options: JsonpOptions): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const {url, callbackParam = 'callback', timeout = 5000, data = {}} = options;

        // 고유한 콜백 함수 이름 생성
        const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());

        // 스크립트 태그 생성
        const script = document.createElement('script');

        // URL 파라미터 생성
        const params = Object.entries(data)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
            .join('&');

        // 콜백 파라미터 추가
        const urlWithParams = `${url}${url.includes('?') ? '&' : '?'}${callbackParam}=${callbackName}${
            params ? `&${params}` : ''
        }`;

        script.src = urlWithParams;

        // 타임아웃 설정
        const timeoutId = setTimeout(() => {
            cleanup();
            reject(new JsonpError('JSONP request timed out', InstallCheckErrorCode.RequestTimeout));
        }, timeout);

        // 정리 함수
        const cleanup = () => {
            document.body.removeChild(script);
            delete (window as any)[callbackName];
            clearTimeout(timeoutId);
        };

        // 콜백 함수 등록
        (window as any)[callbackName] = (data: T) => {
            cleanup();
            resolve(data);
        };

        // 스크립트 로드 에러 처리
        script.onerror = () => {
            cleanup();
            reject(new JsonpError('JSONP request failed', InstallCheckErrorCode.NotInstalled));
        };

        // 문서에 스크립트 추가하여 요청 시작
        document.body.appendChild(script);
    });
}

/**
 * JSONP 요청 에러 클래스
 */
export class JsonpError extends Error {
    constructor(message: string, public errorCode: InstallCheckErrorCode) {
        super(message);
        this.name = 'JsonpError';
    }
}
