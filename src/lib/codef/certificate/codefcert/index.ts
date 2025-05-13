/**
 * espider Web browser interface
 *
 * v1.3.0
 *
 * + v1.3.0 [20170614 djlee]
 * 		- add show_log configuration.
 * 		- add _log() function for show_log configuration.
 * 		- deprecate _logger (use _log() instead)
 * 		- print caller on log.
 *
 *
 * Support email : heenam.dev@gmail.com
 *
 * Copyright (c) Heenam Co.,Ltd All Rights Reserved
 *
 **/

import {InstallCheckErrorCode} from '^lib/codef/certificate/main/errors';
import {jsonp, JsonpError} from '../utils/jsonp';

// 브라우저 환경인지 확인하는 헬퍼 함수
const isBrowser = typeof window !== 'undefined';

// 연결 타입 정의
enum ConnectionType {
    UNSUPPORTED = 0,
    SOCKET_IO = 1,
    WEBSOCKET = 2,
}

// 타입 정의
interface ListenerMap {
    [key: string]: Function | Function[];
}

interface Options {
    [key: string]: any;
    codefToken?: string;
}

interface DeviceInfoData {
    info: string;
}

type CallbackFunction = (...args: any[]) => void;

class CodefCert {
    private readonly _connectedType: ConnectionType;
    _port: number;
    _connected: boolean;
    public _checkLicense: boolean;
    private _checkLicenseCode: string;
    private _logger: {
        log: (...args: any[]) => void;
    };
    private _socket: WebSocket | null;
    private _iframe: HTMLIFrameElement | null;
    private script_version: string;
    private readonly engine_version: string;
    private security: boolean;
    private _maxSendSize: number;
    private _timerInter: number | null;
    private _jobRunning: boolean;
    private _jobInfo: Record<string, any>;
    private readonly _show_log: boolean;
    private readonly _print_caller: boolean;
    private _disablePort: number[];
    private readonly _listener: ListenerMap;
    public options: Options;

    constructor() {
        this._connectedType = isBrowser
            ? typeof WebSocket !== 'undefined'
                ? ConnectionType.WEBSOCKET
                : typeof (window as any).espiderIO == 'function'
                ? ConnectionType.SOCKET_IO
                : ConnectionType.UNSUPPORTED
            : ConnectionType.UNSUPPORTED;
        this._port = 49152;
        this._connected = false;
        this._checkLicense = false;
        this._checkLicenseCode = '';
        this._logger =
            typeof console == 'object'
                ? console
                : {
                      log: () => {
                          /* nothing */
                      },
                  };
        this._socket = null;
        this._iframe = null;
        this.script_version = '1.3.0';
        this.engine_version = '1.0.1';
        this.security = false;
        this._maxSendSize = 50000;
        this._timerInter = null;
        this._jobRunning = false;
        this._jobInfo = {};
        this._show_log = true;
        this._print_caller = true;
        this._disablePort = [];
        this._listener = {};
        this.options = {};
    }

    /**
     * 로그 출력 함수
     */
    public _log(message: string | object): void {
        if (typeof console != 'object' || !this._show_log) {
            return;
        }

        const msg = typeof message == 'object' ? JSON.stringify(message) : message;
        if (!this._print_caller) {
            console.log(msg);
        } else {
            try {
                throw Error('');
            } catch (err) {
                try {
                    const error = err as Error;
                    const callerLine = error.stack!.split('\n')[2];
                    const caller = callerLine.slice(callerLine.lastIndexOf('/') + 1, callerLine.length);
                    console.log('[' + caller + '] ' + msg);
                } catch (err2) {
                    console.log(msg);
                }
            }
        }
    }

    /**
     * 버전 정보 가져오기
     */
    private async _checkVersion(): Promise<void> {
        const url = this.security
            ? 'https://local.espider.co.kr:24646/getVersion.esm'
            : 'http://local.espider.co.kr:24645/getVersion.esm';

        return jsonp({url, callbackParam: 'codefcert_call', timeout: 5000})
            .then((data) => {
                if (!data || data.version < this.engine_version) {
                    throw new JsonpError('Version update required', InstallCheckErrorCode.VersionOver);
                }
            })
            .catch(() => {
                throw new JsonpError('JSONP request failed', InstallCheckErrorCode.NotInstalled);
            });
    }

    /**
     * 포트 정보 가져오기
     */
    private async _setPort() {
        const url = this.security
            ? 'https://local.espider.co.kr:24646/getPort.esm'
            : 'http://local.espider.co.kr:24645/getPort.esm';

        return jsonp({url, callbackParam: 'codefcert_call', timeout: 5000})
            .then((data) => {
                if (data && data.success) {
                    this._log('port :: ' + data.port);
                    this._port = data.port; // available port

                    this._log('this._connected :: ' + this._connected);
                    if (this._connected) return true;

                    // execute espiderWin
                    return this._connect();
                } else {
                    throw new JsonpError('Port retrieval failed', InstallCheckErrorCode.NotInstalled);
                }
            })
            .catch(() => {
                throw new JsonpError('Port request failed', InstallCheckErrorCode.Unknown);
            });
    }

    /**
     * 연결 함수
     */
    private _connect(): boolean {
        if (!isBrowser) return false;

        const address = this.security ? 'wss://local.espider.co.kr' : 'ws://local.espider.co.kr';

        if (this._connected) return true;

        switch (this._connectedType) {
            case ConnectionType.SOCKET_IO:
                // not support
                return false;
            case ConnectionType.WEBSOCKET:
                this._socket = new WebSocket(address + ':' + this._port);
                this._socket.onopen = this._Engine_onopen.bind(this._socket);
                this._socket.onmessage = this._Engine_onmessage.bind(this);
                this._socket.onclose = this._Engine_onclose.bind(this);
                this._socket.onerror = this._Engine_onerror.bind(this);
                break;
            default:
                return false;
        }

        return true;
    }

    /**
     * 연결 종료 함수
     */
    private _disconnect(): void {
        this._log('_disconnect');

        switch (this._connectedType) {
            case ConnectionType.SOCKET_IO:
                if (!this._connected) return;
                (this._socket as any).close();
                break;
            case ConnectionType.WEBSOCKET:
                if (!this._connected) return;
                this._socket!.close();
                break;
            default:
                return;
        }
    }

    /**
     * 리스너 추가 함수
     */
    public addListener(name: string, fcall_back: CallbackFunction): void {
        if (name && fcall_back && typeof name === 'string' && typeof fcall_back === 'function') {
            this._listener[name] = fcall_back;
        }
    }

    /**
     * 명령 전송 함수
     */
    private _sendcommand(cmd: string, data: any): boolean {
        if (!this._connected) return false;

        switch (this._connectedType) {
            case ConnectionType.SOCKET_IO:
                this._log('not support socket.io');
                return false;
            case ConnectionType.WEBSOCKET:
                const sockData = [];
                sockData.push(cmd);
                sockData.push(data && typeof data === 'object' ? data : '');
                this._socket!.send(JSON.stringify(sockData));
                break;
            default:
                return false;
        }

        return true;
    }

    /**
     * 엔진 연결 오픈 핸들러
     */
    private _Engine_onopen(this: WebSocket): void {
        if (!isBrowser) return;

        const self = window.codefcert;
        self._log('onopen');
        self._connected = true;

        self._socket = this;
        self._sendcommand('codefcert_setOptions', self.options);

        self.engineCheckLicense((result) => {
            if (result == null || typeof result === 'undefined') {
                self._log('codefcert license check fail');
            } else {
                self._log(JSON.stringify(result));
            }
        });
    }

    /**
     * 엔진 연결 종료 핸들러
     */
    private _Engine_onclose(): void {
        this._log('onclose');
        this._connected = false;
    }

    /**
     * 엔진 메세지 핸들러
     */
    private _Engine_onmessage(back_data: MessageEvent): void {
        if (!back_data) return;

        try {
            switch (this._connectedType) {
                case ConnectionType.WEBSOCKET:
                    const data = back_data.data;

                    if (data && typeof data === 'string') {
                        const retData = JSON.parse(data);
                        if (retData[0] === 'codefcert' && retData.length == 2) {
                            const datas = retData[1];
                            if (typeof datas.call_back == 'string') {
                                // checklicense
                                if (datas.call_back == 'codefcert_checkLicense') {
                                    if (datas.data) {
                                        if (datas.data.code == 'CF-00000') {
                                            this._checkLicense = true;
                                        }
                                        this._checkLicenseCode = datas.data.code;
                                    }
                                }

                                const fn = this._listener[datas.call_back];

                                if (fn && typeof fn === 'function') {
                                    fn(datas.data);
                                } else if (typeof fn === 'object') {
                                    // array
                                    const callback = (fn as Function[])[0];
                                    if (callback && typeof callback === 'function') {
                                        callback(datas.data);
                                        (fn as Function[]).shift();
                                    }
                                }
                            }
                        }
                    }
                    break;
                case ConnectionType.SOCKET_IO:
                    if (typeof back_data == 'object') {
                        const backDataObj = back_data as any;
                        const fn = this._listener[backDataObj.call_back];
                        if (fn && typeof fn === 'function') {
                            fn(backDataObj.data);
                        } else if (typeof fn === 'object') {
                            // array
                            const callback = (fn as Function[])[0];
                            if (callback && typeof callback === 'function') {
                                callback(backDataObj.data);
                                (fn as Function[]).shift();
                            }
                        }
                    }
                    break;
                default:
                    return;
            }
        } catch (e) {
            this._log('onmessage err :: ' + e);
        }
    }

    /**
     * 엔진 에러 핸들러
     */
    private _Engine_onerror(evt: Event): void {
        this._log(evt.toString());
    }

    /**
     * 종료 명령 전송
     */
    private _terminate(): void {
        this._sendcommand('codefcert_terminate', '');
    }

    /**
     * 초기화 함수
     */
    public async initialization() {
        if (!isBrowser) return false;

        // Check Protocol
        const url = window.location.href;
        const protocol = url.split(':')[0];

        this._log('url :: ' + url);
        this._log('protocol :: ' + protocol);
        this._log('this.security :: ' + this.security);

        if (protocol == 'https') {
            this.security = true;
        }

        this.security = true;

        if (this._connected) return true;

        return this._checkVersion().then(() => this._setPort());
    }

    /**
     * 종료 함수
     */
    public finalization(callback?: CallbackFunction): void {
        if (this._connected) {
            this._terminate();
            this._disconnect();
        }

        if (callback && typeof callback === 'function') {
            callback();
        }
    }

    /**
     * 엔진 버전 확인
     */
    public engineVersion(callback: CallbackFunction): void {
        if (!this._connected) {
            if (callback && typeof callback === 'function') {
                callback({SUCCESS: false});
            }
            return;
        }

        if (!this._checkLicense) {
            if (callback && typeof callback === 'function') {
                callback({SUCCESS: false, ERROR_CODE: this._checkLicenseCode});
                return;
            }
        }

        if (callback && typeof callback === 'function') {
            if (!this._listener['codefcert_getVersion']) {
                this._listener['codefcert_getVersion'] = [];
            }

            const listeners = this._listener['codefcert_getVersion'] as Function[];
            listeners.push(callback);
        }

        this._sendcommand('codefcert_getVersion', null);
    }

    /**
     * 인증서 정보 가져오기
     */
    engineGetCertification(drive: string, callback?: CallbackFunction) {
        if (!this._connected) return this._log({SUCCESS: false, ERROR_CODE: 'NOT_CONNECTED'});
        if (!this._checkLicense) return this._log({SUCCESS: false, ERROR_CODE: this._checkLicenseCode});

        if (callback && typeof callback === 'function') {
            this._listener['codefcert_getCertification'] ||= [] as Function[];
            (this._listener['codefcert_getCertification'] as Function[]).push(callback);
        }

        const external = drive || '';
        this._sendcommand('codefcert_getCertification', external ? {external} : '');
    }

    /**
     * 외부 드라이브 정보 가져오기
     */
    public engineGetExternalDrive(callback: CallbackFunction): void {
        if (!this._connected) {
            if (callback && typeof callback === 'function') {
                callback({SUCCESS: false});
                return;
            }
        }

        if (!this._checkLicense) {
            if (callback && typeof callback === 'function') {
                callback({SUCCESS: false, ERROR_CODE: this._checkLicenseCode});
                return;
            }
        }

        if (callback && typeof callback === 'function') {
            if (!this._listener['codefcert_getExternalDrive']) {
                this._listener['codefcert_getExternalDrive'] = [];
            }

            const listeners = this._listener['codefcert_getExternalDrive'] as Function[];
            listeners.push(callback);
        }

        this._sendcommand('codefcert_getExternalDrive', '');
    }

    /**
     * 디바이스 정보 가져오기
     */
    public engineGetDevice(infoKey: string, callback: CallbackFunction): void {
        if (!this._connected) {
            if (callback && typeof callback === 'function') {
                callback({SUCCESS: false});
                return;
            }
        }

        if (!this._checkLicense) {
            if (callback && typeof callback === 'function') {
                callback({SUCCESS: false, ERROR_CODE: this._checkLicenseCode});
                return;
            }
        }

        if (infoKey) {
            const data: DeviceInfoData = {info: infoKey};

            if (callback && typeof callback == 'function') {
                if (!this._listener['codefcert_getDeviceInfo']) {
                    this._listener['codefcert_getDeviceInfo'] = [];
                }

                const listeners = this._listener['codefcert_getDeviceInfo'] as Function[];
                listeners.push(callback);
            }

            this._sendcommand('codefcert_getDeviceInfo', data);
        }
    }

    /**
     * 인증서 내보내기 (Base64 형식)
     */
    public engineGetExportCertificationB64(data: any, callback: CallbackFunction): void {
        if (!this._connected || !data) {
            if (callback && typeof callback === 'function') {
                callback({SUCCESS: false});
                return;
            }
        }

        if (!this._checkLicense) {
            if (callback && typeof callback === 'function') {
                callback({SUCCESS: false, ERROR_CODE: this._checkLicenseCode});
                return;
            }
        }

        if (callback && typeof callback == 'function') {
            if (!this._listener['codefcert_getExportCertificationB64']) {
                this._listener['codefcert_getExportCertificationB64'] = [];
            }

            const listeners = this._listener['codefcert_getExportCertificationB64'] as Function[];
            listeners.push(callback);
        }

        this._sendcommand('codefcert_getExportCertificationB64', data);
    }

    /**
     * 인증서 가져오기 (Base64 형식)
     */
    public engineImportCertificationB64(data: any, callback: CallbackFunction): void {
        if (!this._connected || !data) {
            if (callback && typeof callback === 'function') {
                callback({SUCCESS: false});
                return;
            }
        }

        if (!this._checkLicense) {
            if (callback && typeof callback === 'function') {
                callback({SUCCESS: false, ERROR_CODE: this._checkLicenseCode});
                return;
            }
        }

        if (callback && typeof callback == 'function') {
            if (!this._listener['codefcert_ImportCertificationB64']) {
                this._listener['codefcert_ImportCertificationB64'] = [];
            }

            const listeners = this._listener['codefcert_ImportCertificationB64'] as Function[];
            listeners.push(callback);
        }

        this._sendcommand('codefcert_ImportCertificationB64', data);
    }

    /**
     * 라이센스 체크
     */
    public engineCheckLicense(callback: CallbackFunction): void {
        if (!this._connected) {
            if (callback && typeof callback === 'function') {
                callback({SUCCESS: false});
            }
            return;
        }

        if (callback && typeof callback === 'function') {
            if (!this._listener['codefcert_checkLicense']) {
                this._listener['codefcert_checkLicense'] = [];
            }

            const listeners = this._listener['codefcert_checkLicense'] as Function[];
            listeners.push(callback);
        }

        this._sendcommand('codefcert_checkLicense', this.options);
    }
}

// 글로벌 인스턴스 생성
const codefcert = new CodefCert();

// TypeScript 를 위한 글로벌 변수 선언
declare global {
    interface Window {
        codefcert: CodefCert;
    }
}

// 글로벌 객체에 할당 (브라우저 환경일 때만)
if (isBrowser) {
    window.codefcert = codefcert;
}

export default codefcert;
