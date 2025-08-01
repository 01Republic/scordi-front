import {codefCertificateApi} from '^models/CodefCeftificate/api';
import {delay, waitFor} from '^components/util/delay';
import {CertFileDto} from '../cert-file.dto';
import codefcert from '../codefcert';
import {PFX_ERROR_CODE_DEFINE} from './errors';

class CodefCertificate {
    private CODEF_TOKEN: string;
    private certInfo: Record<string, any> = {}; // 선택한 인증서 정보
    private certValidRetryCnt = 5; // 비밀번호 오류 체크 Cnt
    private certCount = 0; // 비밀번호 오류 카운트
    private errorCounter: Record<string, number> = {};
    engineCheckFailMessage = '라이센스 확인이 진행되지 않았습니다.\n라이센스 체크를 진행해주세요.';
    private espiderInstaller: string;

    codefcert: typeof codefcert;

    setupConfig() {
        // window 의존적인 코드를 constructor 에서 setupConfig 으로 이동
        const userAgent = window.navigator.userAgent.toLowerCase();
        this.espiderInstaller =
            userAgent.indexOf('win') > -1
                ? '/codef/installers/codefCertInstaller.exe'
                : userAgent.indexOf('mac') > -1
                ? '/codef/installers/codefCertMac.dmg'
                : '';

        codefcert.options.opt1 = true; // 암호화 사용 여부(true/false)
        codefcert.options.opt2 = '6162636465666768696A6B6C6D6E6F7071727374'; // 랜덤한 HEX 문자열 - 반드시 아스키코드로 표현 가능한 문자열 사용해야함
        codefcert.options.opt3 = 3; // 해시 알고리즘(1:SHA1, 3:SHA256, 4:SHA384, 5:SHA512)
        codefcert.options.opt4 = 10; // 암호화 알고리즘(10:SEED, 11:AES128, 12:AES256)
        codefcert.options.opt5 = '0106000704040404080807010403030303030303'; // salt 문자열
        codefcert.options.opt6 = 512; // 반복횟수[정수형]
        codefcert.options.opt7 = '4D6F62696C655472616E734B65793130'; // iv 문자열
        codefcert.options.opt8 = true; // PKCS5Padding 사용 여부 (true/false)
        codefcert.options.opt9 = 1; // 인코딩 타입 (0:BASE64, 1:HEX string)
        this.codefcert = codefcert;
    }

    setToken(token: string) {
        this.CODEF_TOKEN = token;
        this.codefcert.options.codefToken = token;
    }

    /**
     * 코드에프 인증서 중계 서버에서 토큰 발급 받기
     */
    async fetchEncryptToken() {
        try {
            const {token} = await codefCertificateApi.token();
            this.setToken(token);
            return token;
        } catch (error) {
            console.error('Error fetching the encrypt token:', error);
        }
    }

    /**
     * 엔진 초기화 - 설치여부, 버전, 포트 체크
     * @returns Promise 성공시 resolve, 실패시 reject
     */
    async fn_EnginInitialize() {
        const token = await this.fetchEncryptToken();
        if (!token) return false;

        // 초기화 시도 - 실패 시 예외를 throw함
        return this.codefcert.initialization();
    }

    /**
     * 엔진 초기화
     */
    async initialize(): Promise<void> {
        this.setupConfig();
        return this.fn_EnginInitialize().then(async (isSuccess) => {
            // 임의의 이유 일 때. (실제로 발생해서는 아니지만, 예상해서 만들어둠)
            if (!isSuccess) throw new Error('엔진 초기화 실패');

            await waitFor(() => this.codefcert._connected && this.codefcert._checkLicense, 500, 20);
            this._checkValidLicense();
        });
    }

    /**
     * 엔진 종료
     */
    async close(): Promise<void> {
        return new Promise((resolve, reject) => {
            codefcert.finalization(() => {
                waitFor(() => !codefcert._connected, 500, 20).then((result) => {
                    codefcert._log('Engine close success');

                    this.errorCounter = {};
                    result ? resolve() : reject();
                });
            });
        });
    }

    fetchDeviceInfo(driveLetter: string) {
        codefcert._log('fetchDeviceInfo driveLetter :: ' + driveLetter);
        return new Promise((resolve, reject) => {
            codefcert.engineGetDevice(driveLetter, (deviceInfo: unknown) => {
                codefcert._log('engineGetDevice :: ' + JSON.stringify(deviceInfo));
                deviceInfo ? resolve(deviceInfo) : reject(deviceInfo);
            });
        });
    }

    /**
     * 드라이브 인증서 리스트 listener
     * @param driveLetter string : 저장 공간
     * @returns
     */
    fn_OnLoadCertification(driveLetter: string): Promise<any[]> {
        // e-spider certificate list
        codefcert._log('fn_OnLoadCertification driveLetter :: ' + driveLetter);
        return new Promise((resolve, reject) => {
            codefcert.engineGetCertification(driveLetter, (certList: unknown) => {
                codefcert._log(JSON.stringify(certList));

                Array.isArray(certList) ? resolve(CertFileDto.plainToInstance(certList)) : reject(certList);
                // ecertDialog.displayCert(certList);
            });
        });
    }

    /**
     * External 드라이브 리스트 listener
     */
    fn_OnLoadExtraDrive(): Promise<string[]> {
        this._checkValidLicense();
        return new Promise((resolve, reject) => {
            codefcert.engineGetExternalDrive((driveList: unknown) => {
                codefcert._log(JSON.stringify(driveList));

                Array.isArray(driveList) ? resolve(driveList as string[]) : reject(driveList);
            });
        });
    }

    /**
     *  인증서 PFX 변환
     * @param cert
     * @param password
     */
    fn_ConvertPFX(cert: CertFileDto, password: string): Promise<string> {
        const data = {
            certPassword: password,
            certPath: cert.der.path,
            keyPath: cert.key.path,
        };

        return new Promise((resolve, reject) => {
            codefcert.engineGetExportCertificationB64(data, (retData: any) => {
                codefcert._log(JSON.stringify(retData));
                if (retData.SUCCESS) {
                    const pfxInfo = retData.CONVERT;
                    resolve(pfxInfo as string);
                } else {
                    const code = retData.REASON as keyof typeof PFX_ERROR_CODE_DEFINE;
                    let msg = '연결이 만료되었습니다.';

                    if (String(code) === '-9997') {
                        const path = cert.der.path;
                        const newCount = (this.errorCounter[path] || 0) + 1;
                        this.errorCounter[path] = newCount;

                        if (newCount >= this.certValidRetryCnt) {
                            this.errorCounter[path] = 0;
                        }

                        return reject({code, path, count: newCount});
                    }

                    if (code) {
                        msg = PFX_ERROR_CODE_DEFINE[code];
                        console.log('[' + code + '] ' + msg);
                    }
                    reject(new Error(msg));
                }
            });
        });
    }

    private _checkValidLicense() {
        if (!codefcert._checkLicense) {
            throw new Error(this.engineCheckFailMessage);
        }
    }
}

export const codefCertificate = new CodefCertificate();

export * from './errors';
